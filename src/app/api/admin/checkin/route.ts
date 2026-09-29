import { NextResponse } from "next/server";
import { eventStore } from "@/lib/store";
import { verifyAdmin } from "@/lib/auth";

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

    const result = await eventStore.checkInRegistration(code);

    if (result.error) {
      return NextResponse.json(
        { error: result.error, alreadyCheckedIn: result.alreadyCheckedIn, registration: result.registration },
        { status: result.status || 400 }
      );
    }

    return NextResponse.json({ success: true, registration: result.registration });
  } catch (error) {
    console.error("Check-in error:", error);
    return NextResponse.json({ error: "Failed to process check-in" }, { status: 500 });
  }
}
