import { NextResponse } from "next/server";
import { eventStore } from "@/lib/store";
import { verifyAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const registrations = await eventStore.getAllForExport();

    // Create CSV content
    const headers = [
      "ID", "Registration ID", "Type", "Status", "Payment Status", "Checked In",
      "Full Name", "Email", "Phone", "City", "Total Members", "Created At"
    ].join(",");

    const rows = registrations.map((reg: any) => {
      const createdDate = reg.createdAt instanceof Date ? reg.createdAt.toISOString() : new Date(reg.createdAt).toISOString();
      return [
        reg.id,
        reg.registrationId,
        reg.type,
        reg.status,
        reg.paymentStatus,
        reg.checkedIn ? "Yes" : "No",
        `"${(reg.fullName || "").replace(/"/g, '""')}"`,
        `"${reg.email || ""}"`,
        `"${reg.phone || ""}"`,
        `"${(reg.city || "").replace(/"/g, '""')}"`,
        reg.totalMembers || 1,
        createdDate
      ].join(",");
    });

    const csvContent = [headers, ...rows].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="registrations_export_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
