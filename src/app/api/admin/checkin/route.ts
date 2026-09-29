import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";
import { EVENT_CONFIG } from "@/lib/config";

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const code = body.code || body.identifier;

    if (!code) {
      return NextResponse.json({ error: "QR code or Registration ID is required" }, { status: 400 });
    }

    const registration = await prisma.registration.findFirst({
      where: {
        OR: [
          { qrCode: code },
          { registrationId: code }
        ]
      },
      include: {
        members: true
      }
    });

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    if (registration.status !== "CONFIRMED") {
      return NextResponse.json({ error: `Registration status is ${registration.status}` }, { status: 400 });
    }

    if (registration.checkedIn) {
      return NextResponse.json({ 
        error: `Already checked in at ${new Date(registration.checkedInAt || '').toLocaleTimeString()}`, 
        alreadyCheckedIn: true, 
        registration 
      }, { status: 400 });
    }

    const updated = await prisma.registration.update({
      where: { id: registration.id },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
        paymentStatus: "PAID",
      },
      include: {
        members: true
      }
    });

    return NextResponse.json({ success: true, registration: updated });
  } catch (error) {
    console.error("Check-in error:", error);
    return NextResponse.json({ error: "Failed to process check-in" }, { status: 500 });
  }
}
