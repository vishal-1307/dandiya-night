"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle2, AlertCircle, Clock, User, Sparkles, ShieldCheck, Ticket } from "lucide-react";

export default function CheckInPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [activeReg, setActiveReg] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCheckIn = async (e?: React.FormEvent, customCode?: string) => {
    if (e) e.preventDefault();
    const targetCode = (customCode || code).trim();
    if (!targetCode) return;

    setStatus("loading");
    setMessage("");
    setActiveReg(null);
    
    try {
      const res = await fetch("/api/admin/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ code: targetCode }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(`Entry Verified! Welcome, ${data.registration.fullName}`);
        setActiveReg(data.registration);
        setRecent((prev) => [data.registration, ...prev.filter(r => r.id !== data.registration.id)].slice(0, 5));
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to check in pass");
        if (data.registration) {
          setActiveReg(data.registration);
        }
      }
    } catch {
      setStatus("error");
      setMessage("An error occurred during gate verification");
    } finally {
      setCode("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5bd4e]/10 border border-[#f5bd4e]/30 text-[#f5bd4e] text-xs font-mono uppercase tracking-widest mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> Entry Gate Terminal
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-2">Pass ID Verification</h1>
        <p className="text-zinc-400 text-sm">Enter Attendee Pass ID to verify registration status and allow gate entry</p>
      </div>

      <div className="bg-[#180816]/95 border border-[#d4a017]/35 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        <form onSubmit={handleCheckIn} className="flex flex-col gap-4">
          <div>
            <label htmlFor="gate_code" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2 text-center">
              Enter Attendee Pass ID
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="gate_code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. DN-DEMO or DN-8842"
                className="w-full text-center font-mono text-2xl uppercase tracking-wider bg-[#1d071b] border-2 border-[#f5bd4e]/50 text-[#f5bd4e] font-bold rounded-2xl px-6 py-4 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 transition-colors placeholder:text-zinc-500 placeholder:text-base placeholder:tracking-normal"
              />
              <Ticket className="w-6 h-6 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || !code.trim()}
            className="w-full bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] hover:brightness-110 disabled:opacity-50 text-[#38112f] font-bold text-lg py-4 rounded-xl shadow-[0_4px_20px_rgba(245,189,78,0.3)] transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01]"
          >
            {status === "loading" ? "Verifying Pass..." : "Verify & Check In Attendee"}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-400 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#f5bd4e]" />
          <span>Quick test:</span>
          <button 
            type="button"
            onClick={() => handleCheckIn(undefined, 'DN-DEMO')}
            className="text-[#f5bd4e] underline hover:text-amber-200 font-mono"
          >
            Check-in &apos;DN-DEMO&apos;
          </button>
        </div>

        {/* Verification Result Feedback */}
        {status === "success" && (
          <div className="mt-6 bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 p-6 rounded-2xl flex flex-col items-center text-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.2)] animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-1" />
            <span className="text-xl font-serif font-bold text-white">{message}</span>
            {activeReg && (
              <div className="mt-2 text-xs font-mono text-emerald-200/90 bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                Pass: {activeReg.registrationId} • {activeReg.type} • {activeReg.totalMembers || 1} Person(s) • Gate Entry Granted
              </div>
            )}
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 bg-rose-950/70 border border-rose-500/50 text-rose-300 p-6 rounded-2xl flex flex-col items-center text-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.2)] animate-in fade-in zoom-in duration-300">
            <AlertCircle className="w-12 h-12 text-rose-400 mb-1" />
            <span className="text-lg font-serif font-bold text-white">{message}</span>
            {activeReg && (
              <div className="mt-2 text-xs font-mono text-rose-200 bg-rose-900/40 px-3 py-1.5 rounded-lg border border-rose-500/30">
                Registered To: {activeReg.fullName} ({activeReg.registrationId})
              </div>
            )}
          </div>
        )}
      </div>

      {recent.length > 0 && (
        <div className="bg-[#180816]/90 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#f5bd4e] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Recent Gate Check-ins</span>
          </h3>
          <div className="space-y-3">
            {recent.map((reg, idx) => (
              <div key={`${reg.id}-${idx}`} className="bg-black/30 border border-zinc-800/80 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-100 text-sm">{reg.fullName}</div>
                    <div className="text-xs text-zinc-400 font-mono">{reg.registrationId} &bull; {reg.type}</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  Checked in
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
