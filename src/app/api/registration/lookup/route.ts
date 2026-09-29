import { NextResponse } from "next/server";
import { eventStore } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing search parameter" }, { status: 400 });
  }

  try {
    const registration = await eventStore.lookupRegistration(q);

    if (!registration) {
      return NextResponse.json({ error: "Registration not found with these details." }, { status: 404 });
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error("Lookup error:", error);
    return NextResponse.json({ error: "Failed to lookup registration" }, { status: 500 });
  }
}
