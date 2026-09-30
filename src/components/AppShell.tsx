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
        <span className="hidden sm:inline">18 October 2026 • Jhanjharpur, Madhubani • Official Registrations Open</span>
        <span className="sm:hidden font-semibold">Fest 2026 • Registrations Open</span>
        <Link href="/register" className="ml-1.5">
          Reserve Pass <span>→</span>
        </Link>
      </div>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
