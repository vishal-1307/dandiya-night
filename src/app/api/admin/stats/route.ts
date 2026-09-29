import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { EVENT_CONFIG } from "@/lib/config";
import { verifyAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const totalRegistrations = await prisma.registration.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysRegistrations = await prisma.registration.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const byTypeRaw = await prisma.registration.groupBy({
      by: ["type"],
      _count: {
        id: true,
      },
    });

    const byStatusRaw = await prisma.registration.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    });

    const totalCheckedIn = await prisma.registration.count({
      where: { checkedIn: true },
    });

    const byType = byTypeRaw.reduce((acc, curr) => {
      acc[curr.type] = curr._count.id;
      return acc;
    }, {} as Record<string, number>);

    const byStatus = byStatusRaw.reduce((acc, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {} as Record<string, number>);

    const totalConfirmed = byStatus["CONFIRMED"] || 0;

    return NextResponse.json({
      stats: {
        totalRegistrations,
        todaysRegistrations,
        byType,
        byStatus,
        totalCheckedIn,
        capacity: {
          total: EVENT_CONFIG.capacity,
          filled: totalConfirmed,
          remaining: Math.max(0, EVENT_CONFIG.capacity - totalConfirmed),
        },
      },
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
