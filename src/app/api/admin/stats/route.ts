import { NextResponse } from "next/server";
import { eventStore } from "@/lib/store";
import { verifyAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await eventStore.getStats();
    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
