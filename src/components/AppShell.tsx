"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import Link from "next/link";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="min-h-screen bg-gray-950 text-gray-100">{children}</main>;
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="announcement">
        <span className="spark">✦</span>{" "}
        <span className="hidden sm:inline">Madhubani&apos;s most colourful night is calling</span>
        <span className="sm:hidden font-semibold">Madhubani Dandiya Night</span>{" "}
        <Link href="/register">
          Reserve your place <span>→</span>
        </Link>
      </div>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
