"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Users, ShieldCheck, LogOut, ArrowLeft } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/config";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (pathname !== "/admin") {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        document.cookie = "adminSession=; path=/; max-age=0;";
        router.push("/admin");
        return;
      }

      // Verify token authenticity against backend
      fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("adminToken");
            document.cookie = "adminSession=; path=/; max-age=0;";
            router.push("/admin");
          }
        })
        .catch(() => {
          // allow offline grace, will be blocked on mutating actions
        });
    }
  }, [pathname, router]);

  if (!isMounted) return null;

  if (pathname === "/admin") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    document.cookie = "adminSession=; path=/; max-age=0;";
    router.push("/admin");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Registrations", href: "/admin/registrations", icon: <Users className="w-5 h-5" /> },
    { name: "Pass Verification", href: "/admin/checkin", icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0d040f] text-amber-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#160616] border-r border-[#d4a017]/20 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
            <img 
              src="/images/logo.svg" 
              alt="Logo" 
              className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(245,189,78,0.5)]" 
            />
            <div>
              <h2 className="text-base font-serif font-bold text-[#fcf4e5] leading-tight">Organizer Desk</h2>
              <span className="text-[10px] font-mono text-[#f5bd4e] uppercase tracking-wider">{EVENT_CONFIG.city}</span>
            </div>
          </div>
          
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#f5bd4e]/20 text-[#f5bd4e] border border-[#f5bd4e]/40 shadow-[0_0_15px_rgba(245,189,78,0.15)]"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors font-mono"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#0F0A1A]">
        <div className="p-6 sm:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
