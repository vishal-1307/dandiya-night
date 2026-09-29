"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, TrendingUp, CheckCircle2, Ticket, ShieldCheck, Download, Sparkles } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const data = await res.json();
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-[#f5bd4e] font-mono text-sm">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span>Loading festival analytics...</span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
        Failed to load stats. Please ensure you are authenticated.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Event Overview
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mt-1">
            Organizer Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/checkin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] text-[#38112f] font-bold text-sm shadow-[0_4px_15px_rgba(245,189,78,0.25)] hover:brightness-110 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Pass Verification</span>
          </Link>
          <a
            href="/api/admin/export"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#230c21] border border-zinc-700 text-zinc-200 hover:text-white hover:border-[#f5bd4e]/50 font-medium text-sm transition-all"
          >
            <Download className="w-4 h-4 text-[#f5bd4e]" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          icon={<Users className="w-6 h-6 text-[#f5bd4e]" />}
          title="Total Registrations" 
          value={stats.totalRegistrations} 
          subtitle="All confirmed & pending"
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6 text-emerald-400" />}
          title="Today's Bookings" 
          value={stats.todaysRegistrations} 
          subtitle="New passes today"
        />
        <StatCard 
          icon={<CheckCircle2 className="w-6 h-6 text-rose-400" />}
          title="Gate Checked-In" 
          value={stats.totalCheckedIn} 
          subtitle={`${Math.round((stats.totalCheckedIn / (stats.totalRegistrations || 1)) * 100)}% attendance rate`}
        />
        <StatCard 
          icon={<Ticket className="w-6 h-6 text-amber-300" />}
          title="Venue Capacity" 
          value={`${stats.capacity.filled} / ${stats.capacity.total}`} 
          subtitle={`${stats.capacity.remaining} remaining spots`}
        />
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#180816]/90 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-serif font-bold text-amber-100 mb-5 flex items-center justify-between">
            <span>Pass Breakdown by Type</span>
            <span className="text-xs font-mono text-zinc-400 font-normal">Active categories</span>
          </h2>
          <div className="space-y-3.5">
            {Object.entries(stats.byType || {}).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-zinc-800">
                <span className="text-zinc-300 capitalize text-sm font-medium">{type} Pass</span>
                <span className="text-[#f5bd4e] font-mono font-bold text-sm bg-[#f5bd4e]/10 px-3 py-1 rounded-full border border-[#f5bd4e]/20">
                  {count as number}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#180816]/90 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-serif font-bold text-amber-100 mb-5 flex items-center justify-between">
            <span>Registration Status</span>
            <span className="text-xs font-mono text-zinc-400 font-normal">System tally</span>
          </h2>
          <div className="space-y-3.5">
            {Object.entries(stats.byStatus || {}).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-zinc-800">
                <span className="text-zinc-300 capitalize text-sm font-medium">{status}</span>
                <span className={`font-mono font-bold text-sm px-3 py-1 rounded-full border ${
                  status === 'CONFIRMED' 
                    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' 
                    : status === 'WAITLISTED'
                    ? 'text-amber-400 bg-amber-950/60 border-amber-500/30'
                    : 'text-zinc-400 bg-zinc-800 border-zinc-700'
                }`}>
                  {count as number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  title, 
  value, 
  subtitle 
}: { 
  icon: React.ReactNode;
  title: string; 
  value: string | number; 
  subtitle?: string;
}) {
  return (
    <div className="bg-[#180816]/90 border border-[#d4a017]/25 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-[#f5bd4e]/40 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-black/30 border border-zinc-800 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-serif font-bold text-[#fcf4e5] mb-1">{value}</div>
      {subtitle && <div className="text-zinc-400 text-xs font-mono">{subtitle}</div>}
    </div>
  );
}
