"use client";

import { useEffect, useState } from "react";
import { 
  Search, Download, Users, CheckCircle2, Clock, Sparkles, 
  MessageSquare, Phone, MapPin, School, HeartHandshake, Eye, X, ShieldCheck, Trash2 
} from "lucide-react";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedReg, setSelectedReg] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

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
      a.download = `jhanjharpur_dandiya_registrations_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  const handleQuickCheckIn = async (passId: string) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ code: passId }),
      });
      const data = await res.json();
      if (res.ok && data.registration) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === data.registration.id ? data.registration : r))
        );
        if (selectedReg && selectedReg.id === data.registration.id) {
          setSelectedReg(data.registration);
        }
      } else {
        alert(data.error || "Check-in failed");
      }
    } catch (err) {
      console.error("Check-in error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRegistration = async (id: string, name: string, passId: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete registration for "${name}" (Pass: ${passId})? This cannot be undone.`)) {
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id && r.registrationId !== passId));
        if (selectedReg && (selectedReg.id === id || selectedReg.registrationId === passId)) {
          setSelectedReg(null);
        }
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete registration");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error while deleting registration");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Attendee Database &amp; Pass Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mt-1">Registrations</h1>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] hover:brightness-110 text-[#38112f] font-bold text-sm shadow-[0_4px_15px_rgba(245,189,78,0.25)] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Excel / CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search name, phone, pass ID, school, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-[#1d071b] border-2 border-[#f5bd4e]/40 rounded-xl text-white font-semibold placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 caret-[#f5bd4e] transition-all"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-1.5 bg-[#180816]/90 p-1 rounded-xl border border-zinc-800 overflow-x-auto">
          {["ALL", "JHIJHIYA", "COUPLE", "SINGLE"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase font-semibold transition-all whitespace-nowrap ${
                filterType === type
                  ? "bg-[#f5bd4e] text-[#38112f] shadow font-bold"
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
                <th className="px-5 py-4">Pass ID</th>
                <th className="px-5 py-4">Attendee</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Address / School</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Fee / Status</th>
                <th className="px-5 py-4">Gate</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-zinc-400">
                    <div className="flex items-center justify-center gap-2 text-[#f5bd4e] font-mono text-sm">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Loading registrations...
                    </div>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-zinc-500 font-mono text-sm">
                    No registrations found matching criteria
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => {
                  const isJhijhiya = reg.type?.includes("Jhijhiya") || reg.type?.includes("108");
                  const partner = reg.members && reg.members.length > 0 ? reg.members[0] : null;
                  const displayAddress = reg.city || reg.address || reg.fullAddress || "Jhanjharpur";
                  const displayOrg = reg.groupName || reg.schoolCollegeName;

                  return (
                    <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-[#f5bd4e]">
                        {reg.registrationId}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-[#fcf4e5]">{reg.fullName}</div>
                        {partner && (
                          <div className="text-[11px] text-rose-300/90 flex items-center gap-1 font-mono">
                            <HeartHandshake className="w-3 h-3" /> {partner.fullName}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs font-mono text-zinc-300">
                        <div className="flex items-center gap-1.5 font-bold text-white">
                          <Phone className="w-3 h-3 text-[#f5bd4e]" />
                          <span>{reg.phone}</span>
                        </div>
                        {reg.email && !reg.email.endsWith("@fest.in") && (
                          <div className="text-[11px] text-zinc-400 truncate max-w-[150px]">{reg.email}</div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-zinc-300 max-w-[200px]">
                        <div className="truncate font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#f5bd4e] flex-shrink-0" />
                          <span className="truncate">{displayAddress}</span>
                        </div>
                        {displayOrg && (
                          <div className="text-[11px] text-[#f5bd4e]/90 truncate flex items-center gap-1 mt-0.5">
                            <School className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{displayOrg}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${
                          isJhijhiya
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : reg.type?.includes("Couple")
                            ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                        }`}>
                          {isJhijhiya ? '108 Jhijhiya' : reg.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs font-mono">
                        <div className="font-bold text-white">₹{reg.paymentAmount || 0}</div>
                        <span className={`inline-block px-2 py-0.5 mt-0.5 rounded text-[10px] font-bold uppercase ${
                          reg.paymentStatus === 'PAID' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        }`}>
                          {reg.paymentStatus || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
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
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/91${reg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`नमस्ते ${reg.fullName} जी! Jhanjharpur Jhijhiya & Dandiya Fest 2026 की आयोजन समिति से आपके Pass ID: ${reg.registrationId} के सम्बंध में सम्पर्क किया जा रहा है।`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => setSelectedReg(reg)}
                            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[#f5bd4e] transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRegistration(reg.id, reg.fullName, reg.registrationId)}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 transition-colors"
                            title="Delete Registration"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL DRAWER */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#180816] border-2 border-[#f5bd4e]/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReg(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full bg-[#f5bd4e]/20 text-[#f5bd4e] font-bold border border-[#f5bd4e]/30">
                  {selectedReg.registrationId}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {new Date(selectedReg.createdAt).toLocaleString()}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{selectedReg.fullName}</h2>
              <p className="text-sm text-[#f5bd4e] font-mono mt-0.5">{selectedReg.type}</p>
            </div>

            {/* Contact & Location Block */}
            <div className="bg-black/40 rounded-2xl p-4 border border-zinc-800 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-400">Mobile Phone:</span>
                <div className="flex items-center gap-2">
                  <a href={`tel:${selectedReg.phone}`} className="font-mono font-bold text-white hover:underline">
                    {selectedReg.phone}
                  </a>
                  <a
                    href={`https://wa.me/91${selectedReg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`नमस्ते ${selectedReg.fullName} जी! Jhanjharpur Jhijhiya & Dandiya Fest 2026 की आयोजन समिति से आपके Pass ID: ${selectedReg.registrationId} के सम्बंध में सम्पर्क किया जा रहा है।`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#25D366] text-black font-bold text-xs hover:brightness-110"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {selectedReg.email && !selectedReg.email.endsWith("@fest.in") && (
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Email:</span>
                  <span className="font-mono text-white">{selectedReg.email}</span>
                </div>
              )}

              <div className="flex justify-between items-start pb-2 border-b border-zinc-800">
                <span className="text-zinc-400">Address / City:</span>
                <span className="font-medium text-white text-right max-w-xs">
                  {selectedReg.city || selectedReg.address || selectedReg.fullAddress || "Jhanjharpur, Madhubani"}
                </span>
              </div>

              {/* Jhijhiya specific fields */}
              {(selectedReg.emergencyName || selectedReg.fatherName) && (
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Father&apos;s Name:</span>
                  <span className="font-semibold text-white">{selectedReg.emergencyName || selectedReg.fatherName}</span>
                </div>
              )}

              {(selectedReg.groupName || selectedReg.schoolCollegeName) && (
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">School / College:</span>
                  <span className="font-semibold text-[#f5bd4e]">{selectedReg.groupName || selectedReg.schoolCollegeName}</span>
                </div>
              )}

              {(selectedReg.costumeTheme || selectedReg.classCourse) && (
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Class / Course:</span>
                  <span className="font-semibold text-white">{selectedReg.costumeTheme || selectedReg.classCourse}</span>
                </div>
              )}

              {(selectedReg.emergencyPhone || selectedReg.parentPhone) && (
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Parent Mobile:</span>
                  <a href={`tel:${selectedReg.emergencyPhone || selectedReg.parentPhone}`} className="font-mono font-bold text-[#f5bd4e] hover:underline">
                    {selectedReg.emergencyPhone || selectedReg.parentPhone}
                  </a>
                </div>
              )}

              {/* Couple specific fields */}
              {selectedReg.members && selectedReg.members.length > 0 && (
                <div className="pt-1">
                  <span className="text-zinc-400 block mb-1">Couple Partner:</span>
                  <div className="bg-[#240c21] p-2.5 rounded-xl border border-rose-500/30 flex justify-between items-center">
                    <span className="font-bold text-rose-200">{selectedReg.members[0].fullName}</span>
                    {selectedReg.members[0].phone && (
                      <a href={`tel:${selectedReg.members[0].phone}`} className="font-mono text-xs text-white hover:underline">
                        {selectedReg.members[0].phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Payment & Gate Status Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 p-3.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-xs text-zinc-400 block mb-1 font-mono uppercase">Fee Amount</span>
                <span className="text-2xl font-mono font-bold text-emerald-400">₹{selectedReg.paymentAmount || 0}</span>
                <span className="text-[10px] block text-zinc-500 uppercase mt-0.5">{selectedReg.paymentStatus || 'PENDING'}</span>
              </div>

              <div className="bg-black/30 p-3.5 rounded-xl border border-zinc-800 text-center">
                <span className="text-xs text-zinc-400 block mb-1 font-mono uppercase">Gate Status</span>
                <span className={`text-base font-bold font-mono ${selectedReg.checkedIn ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  {selectedReg.checkedIn ? 'Checked In' : 'Pending Entry'}
                </span>
                {selectedReg.checkedIn && selectedReg.checkedInAt && (
                  <span className="text-[10px] block text-zinc-500 font-mono mt-0.5">
                    {new Date(selectedReg.checkedInAt).toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {!selectedReg.checkedIn ? (
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleQuickCheckIn(selectedReg.registrationId)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{actionLoading ? "Updating..." : "Authorize Gate Check-In"}</span>
                </button>
              ) : (
                <div className="flex-1 py-3 px-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Attendee Already Inside Ground</span>
                </div>
              )}

              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleDeleteRegistration(selectedReg.id, selectedReg.fullName, selectedReg.registrationId)}
                className="py-3 px-4 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-bold text-sm transition-all flex items-center justify-center gap-1.5"
                title="Permanently Delete Registration"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Delete</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReg(null)}
                className="py-3 px-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
