import { NextResponse } from "next/server";
import { eventStore } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic validation: Full Name, Phone, and Registration Type are mandatory
    if (!data.fullName || !data.phone || !data.type) {
      return NextResponse.json(
        { error: "Missing required fields (Full Name, Phone number, and Registration Type)" },
        { status: 400 }
      );
    }

    // Default email if not provided (e.g. for Dandiya registrations where email was removed)
    if (!data.email || !data.email.trim()) {
      data.email = `${data.phone}@fest.in`;
    }

    // Store address in city or address field
    if (data.address && !data.fullAddress) {
      data.fullAddress = data.address;
    }
    if (!data.city || !data.city.trim() || data.city === "Jhanjharpur") {
      data.city = data.fullAddress || data.address || data.city || "Jhanjharpur";
    }

    // Map Jhijhiya specific fields into existing Prisma columns
    if (!data.emergencyName && data.fatherName) {
      data.emergencyName = data.fatherName;
    }
    if (!data.emergencyPhone && data.parentPhone) {
      data.emergencyPhone = data.parentPhone;
    }
    if (!data.costumeTheme && data.classCourse) {
      data.costumeTheme = data.classCourse;
    }
    if (!data.groupName && data.schoolCollegeName) {
      data.groupName = data.schoolCollegeName;
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
          { error: "A registration with this phone number already exists. Use 'Find My Pass' to retrieve your pass." },
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
