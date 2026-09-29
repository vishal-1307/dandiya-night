import { NextResponse } from "next/server";
import { eventStore } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.fullName || !data.email || !data.phone || !data.type) {
      return NextResponse.json(
        { error: "Missing required fields (Full Name, Email, Phone, and Registration Type)" },
        { status: 400 }
      );
    }

    try {
      const result = await eventStore.createRegistration(data);
      return NextResponse.json({
        success: true,
        registration: result.registration,
        isWaitlisted: result.isWaitlisted,
      });
    } catch (storeError: any) {
      if (storeError.message === "ALREADY_EXISTS") {
        return NextResponse.json(
          { error: "A registration with this email and phone already exists. Use 'Find My Pass' to retrieve your pass." },
          { status: 409 }
        );
      }
      throw storeError;
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process registration. Please check your details and try again." },
      { status: 500 }
    );
  }
}
