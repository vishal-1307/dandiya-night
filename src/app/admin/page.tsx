"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/config";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch {
      setError("An error occurred connecting to the admin service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0A1A] px-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#8b1a3f]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#d4a017]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#180816]/95 border border-[#d4a017]/35 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.85)] relative z-10 backdrop-blur-xl">
        <div className="text-center mb-8">
          <img 
            src="/images/logo.svg" 
            alt="Mithila Dandiya Emblem" 
            className="w-16 h-16 mx-auto mb-3 object-contain drop-shadow-[0_0_12px_rgba(245,189,78,0.5)]" 
          />
          <span className="text-[10px] uppercase tracking-widest text-[#f5bd4e] font-mono font-bold block mb-1">
            {EVENT_CONFIG.name}
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#fcf4e5] mb-1">Organizer Portal</h1>
          <p className="text-zinc-400 text-xs">Sign in to manage registrations, view live stats &amp; scan entry passes</p>
        </div>

        {error && (
          <div className="bg-rose-500/15 border border-rose-500/40 text-rose-300 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="admin_username" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">
              Username
            </label>
            <div className="relative">
              <input
                id="admin_username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="manish"
                className="w-full pl-4 pr-10 py-3.5 bg-[#1d071b] border-2 border-[#f5bd4e]/40 rounded-xl text-white font-semibold placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all"
              />
              <User className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="admin_password" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="admin_password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-10 py-3.5 bg-[#1d071b] border-2 border-[#f5bd4e]/40 rounded-xl text-white font-semibold placeholder:text-zinc-400 focus:outline-none focus:border-[#f5bd4e] focus:ring-2 focus:ring-[#f5bd4e]/50 focus:bg-[#270c24] caret-[#f5bd4e] transition-all"
              />
              <Lock className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] hover:brightness-110 text-[#38112f] font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(245,189,78,0.3)] flex justify-center items-center gap-2 transform hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[#38112f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Authenticating...
              </span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
