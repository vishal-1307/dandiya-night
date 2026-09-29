import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { EVENT_CONFIG } from "@/lib/config";
import { v4 as uuidv4 } from "uuid";

function generateRegistrationId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DN-${result}`;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.fullName || !data.email || !data.phone || !data.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check capacity
    const totalConfirmed = await prisma.registration.count({
      where: { status: "CONFIRMED" },
    });

    let status = "CONFIRMED";
    if (totalConfirmed >= EVENT_CONFIG.capacity) {
      status = "WAITLISTED";
    }

    // Check for duplicate
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        email: data.email,
        phone: data.phone,
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "Registration with this email and phone already exists." },
        { status: 409 }
      );
    }

    const registrationId = generateRegistrationId();
    const qrCode = `DNQR-${uuidv4()}`;

    const registration = await prisma.registration.create({
      data: {
        registrationId,
        type: data.type,
        status,
        qrCode,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city || "",
        gender: data.gender,
        age: data.age ? parseInt(data.age) : null,
        instagramHandle: data.instagramHandle,
        groupName: data.groupName,
        totalMembers: data.totalMembers || 1,
        members: {
          create: data.members?.map((m: any) => ({
            fullName: m.fullName,
            age: m.age ? parseInt(m.age) : null,
            gender: m.gender,
            phone: m.phone,
          })) || [],
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json({
      success: true,
      registration,
      isWaitlisted: status === "WAITLISTED",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
