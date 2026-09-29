import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
      include: { members: true },
    });

    if (!registration) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ registration });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    
    // Only allow updating certain fields
    const { status, paymentStatus, checkedIn } = body;
    const dataToUpdate: any = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (paymentStatus !== undefined) dataToUpdate.paymentStatus = paymentStatus;
    if (checkedIn !== undefined) {
      dataToUpdate.checkedIn = checkedIn;
      if (checkedIn) dataToUpdate.checkedInAt = new Date();
      else dataToUpdate.checkedInAt = null;
    }

    const updated = await prisma.registration.update({
      where: { id: params.id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, registration: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const updated = await prisma.registration.update({
      where: { id: params.id },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ success: true, registration: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to cancel" }, { status: 500 });
  }
}
