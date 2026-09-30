import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    // 1. Check default admin credentials: user: manish, pass: manish13
    const configuredAdminUser = process.env.ADMIN_USERNAME || "manish";
    const configuredAdminPass = process.env.ADMIN_PASSWORD || "manish13";

    if (
      (username === configuredAdminUser && password === configuredAdminPass) ||
      (username === "manish" && password === "manish13")
    ) {
      const token = generateToken("admin-master-id", "ADMIN");
      const res = NextResponse.json({ success: true, token });
      res.cookies.set("adminSession", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return res;
    }

    // 2. Try checking database AdminUser table
    try {
      const user = await prisma.adminUser.findUnique({
        where: { username }
      });

      if (user) {
        const isValid = await comparePassword(password, user.passwordHash);
        if (isValid) {
          const token = generateToken(user.id, user.role);
          const res = NextResponse.json({ success: true, token });
          res.cookies.set("adminSession", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
          });
          return res;
        }
      }
    } catch (dbErr) {
      console.warn("Database lookup failed in admin login; checked env credentials:", dbErr);
    }

    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
