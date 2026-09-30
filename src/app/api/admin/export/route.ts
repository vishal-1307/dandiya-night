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
      "Registration ID",
      "Category",
      "Attendee Name",
      "Phone",
      "Address",
      "Email",
      "Father Name (Jhijhiya)",
      "Parent Phone (Jhijhiya)",
      "School or College (Jhijhiya)",
      "Class or Course (Jhijhiya)",
      "Partner Name (Couple)",
      "Partner Phone (Couple)",
      "Fee (INR)",
      "Payment Status",
      "Gate Check-In",
      "Registered Date"
    ].join(",");

    const rows = registrations.map((reg: any) => {
      const partner = reg.members && reg.members.length > 0 ? reg.members[0] : null;
      const createdDate = reg.createdAt instanceof Date ? reg.createdAt.toISOString() : new Date(reg.createdAt).toISOString();
      const emailDisplay = (reg.email || "").endsWith("@fest.in") ? "" : reg.email;
      return [
        reg.registrationId,
        `"${(reg.type || "").replace(/"/g, '""')}"`,
        `"${(reg.fullName || "").replace(/"/g, '""')}"`,
        `"${reg.phone || ""}"`,
        `"${(reg.city || reg.address || "").replace(/"/g, '""')}"`,
        `"${emailDisplay}"`,
        `"${(reg.emergencyName || reg.fatherName || "").replace(/"/g, '""')}"`,
        `"${reg.emergencyPhone || reg.parentPhone || ""}"`,
        `"${(reg.groupName || reg.schoolCollegeName || "").replace(/"/g, '""')}"`,
        `"${(reg.costumeTheme || reg.classCourse || "").replace(/"/g, '""')}"`,
        `"${(partner?.fullName || reg.partnerName || "").replace(/"/g, '""')}"`,
        `"${partner?.phone || reg.partnerPhone || ""}"`,
        reg.paymentAmount || 0,
        reg.paymentStatus || "PENDING",
        reg.checkedIn ? "Yes" : "No",
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
