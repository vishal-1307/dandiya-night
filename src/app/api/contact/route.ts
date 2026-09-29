import { NextResponse } from "next/server";
import { eventStore } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields (Name, Email, Message)" },
        { status: 400 }
      );
    }

    await eventStore.addContactSubmission({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    return NextResponse.json({ success: true, message: "Thank you! Your message has been received." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
