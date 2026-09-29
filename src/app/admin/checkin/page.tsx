"use client";

import { useState, useRef, useEffect } from "react";

export default function CheckInPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [recent, setRecent] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCheckIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code.trim()) return;

    setStatus("loading");
    
    try {
      const res = await fetch("/api/admin/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(`Successfully checked in: ${data.registration.fullName}`);
        setRecent((prev) => [data.registration, ...prev].slice(0, 5));
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to check in");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An error occurred during check-in");
    } finally {
      setCode("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Fast Check-in</h1>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl mb-8">
        <form onSubmit={handleCheckIn} className="flex flex-col gap-4">
          <input
            ref={inputRef}
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Scan QR or Enter Registration ID (e.g. DN-ABCD)"
            className="w-full text-center text-2xl bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-6 py-4 focus:outline-none focus:border-rose-500 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading" || !code.trim()}
            className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xl py-4 rounded-xl transition-colors"
          >
            {status === "loading" ? "Processing..." : "Check In"}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-6 bg-green-900/30 border border-green-500/50 text-green-400 p-6 rounded-xl flex items-center justify-center gap-4 animate-in fade-in zoom-in duration-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span className="text-xl font-bold">{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 bg-red-900/30 border border-red-500/50 text-red-400 p-6 rounded-xl flex items-center justify-center gap-4 animate-in fade-in zoom-in duration-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            <span className="text-xl font-bold">{message}</span>
          </div>
        )}
      </div>

      {recent.length > 0 && (
        <div>
          <h3 className="text-gray-400 font-medium mb-4 uppercase text-sm tracking-wider">Recent Check-ins</h3>
          <div className="space-y-3">
            {recent.map((reg, idx) => (
              <div key={`${reg.id}-${idx}`} className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">{reg.fullName}</div>
                  <div className="text-sm text-gray-500">{reg.registrationId} &bull; {reg.type}</div>
                </div>
                <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                  {new Date(reg.checkedInAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
