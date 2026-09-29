"use client";

import { useEffect, useState } from "react";
import { Search, Download, Users, CheckCircle2, Clock, Sparkles } from "lucide-react";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const typeParam = filterType !== "ALL" ? `&type=${filterType}` : "";
      const res = await fetch(`/api/admin/registrations?search=${encodeURIComponent(search)}${typeParam}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      if (data.registrations) {
        setRegistrations(data.registrations);
      }
    } catch (error) {
      console.error("Failed to fetch registrations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/export", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Attendee Database
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mt-1">Registrations</h1>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] hover:brightness-110 text-[#38112f] font-bold text-sm shadow-[0_4px_15px_rgba(245,189,78,0.25)] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, phone, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-[#1d071b] border-2 border-[#f5bd4e]/40 rounded-xl text-white font-semibold placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 caret-[#f5bd4e] transition-all"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-1.5 bg-[#180816]/90 p-1 rounded-xl border border-zinc-800 overflow-x-auto">
          {["ALL", "INDIVIDUAL", "COUPLE", "GROUP"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase font-semibold transition-all ${
                filterType === type
                  ? "bg-[#f5bd4e] text-[#38112f] shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[#180816]/90 border border-zinc-800/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-black/40 text-zinc-400 font-mono text-xs uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Pass ID</th>
                <th className="px-6 py-4">Lead Attendee</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Check-in</th>
                <th className="px-6 py-4">Booked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-400">
                    <div className="flex items-center justify-center gap-2 text-[#f5bd4e] font-mono text-sm">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Loading registrations...
                    </div>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500 font-mono text-sm">
                    No registrations found matching criteria
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#f5bd4e]">{reg.registrationId}</td>
                    <td className="px-6 py-4 font-medium text-[#fcf4e5]">{reg.fullName}</td>
                    <td className="px-6 py-4 text-xs font-mono text-zinc-400">
                      <div>{reg.phone}</div>
                      <div className="text-[11px] text-zinc-500">{reg.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-zinc-800/80 text-zinc-300 border border-zinc-700">
                        {reg.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                        reg.status === 'CONFIRMED' 
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' :
                        reg.status === 'WAITLISTED' 
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/30' :
                          'bg-rose-950/60 text-rose-300 border-rose-500/30'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {reg.checkedIn ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-xs font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Gate In
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-zinc-500 font-mono text-xs">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-zinc-400">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
