import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing search parameter" }, { status: 400 });
  }

  try {
    const registration = await prisma.registration.findFirst({
      where: {
        OR: [
          { registrationId: q },
          { email: q },
          { phone: q }
        ]
      },
      select: {
        registrationId: true,
        type: true,
        status: true,
        paymentStatus: true,
        checkedIn: true,
        fullName: true,
        email: true,
        phone: true,
        totalMembers: true,
        groupName: true,
        qrCode: true,
        members: {
          select: {
            fullName: true
          }
        }
      }
    });

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error("Lookup error:", error);
    return NextResponse.json({ error: "Failed to lookup registration" }, { status: 500 });
  }
}
