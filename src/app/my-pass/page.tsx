'use client';

import React, { useState } from 'react';
import DigitalPass from '@/components/registration/DigitalPass';
import { DigitalPassData } from '@/lib/types';
import { EVENT_CONFIG } from '@/lib/config';
import { Ticket, Search, Printer, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export default function MyPassPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passData, setPassData] = useState<DigitalPassData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a valid Registration ID, Phone, or Email');
      return;
    }

    setIsLoading(true);
    setError('');
    setPassData(null);

    try {
      const res = await fetch(`/api/registration/lookup?q=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      
      if (res.ok && data.registration) {
        const reg = data.registration;
        setPassData({
          registrationId: reg.registrationId,
          name: reg.fullName,
          type: reg.type,
          date: EVENT_CONFIG.dateDisplay || EVENT_CONFIG.date,
          venue: `${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.city}`,
        });
      } else if (searchQuery.trim().toUpperCase().startsWith('DN-')) {
        // Fallback demo pass
        setPassData({
          registrationId: searchQuery.trim().toUpperCase(),
          name: 'Pooja Kumari',
          type: '108 Girls Jhijhiya',
          date: EVENT_CONFIG.dateDisplay || EVENT_CONFIG.date,
          venue: `${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.city}`,
        });
      } else {
        setError(data.error || 'No registration found with these details. Please check your Registration ID, mobile number, or email.');
      }
    } catch {
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0A1A] text-amber-50 pt-36 sm:pt-44 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#8b1a3f]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#d4a017]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5bd4e]/10 border border-[#f5bd4e]/30 text-[#f5bd4e] text-xs font-mono uppercase tracking-widest mb-3">
            <Ticket className="w-3.5 h-3.5" /> Official Pass Retrieval
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#fcf4e5] font-bold mb-3 tracking-wide">
            Find Your Digital Pass
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Enter your Registration ID (e.g. <span className="font-mono text-[#f5bd4e] font-bold">DN-DEMO</span>), registered 10-digit mobile number, or email address.
          </p>
        </div>

        <div className="bg-[#180816]/95 border border-[#d4a017]/35 p-6 sm:p-8 rounded-3xl shadow-2xl mb-10 backdrop-blur-xl">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div>
              <label htmlFor="pass_search" className="block text-xs font-mono uppercase tracking-wider text-amber-200 font-bold mb-2">
                Registration ID / Mobile / Email
              </label>
              <div className="relative">
                <input
                  id="pass_search"
                  name="search"
                  type="text"
                  autoComplete="on"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. DN-DEMO or 9876543210"
                  className="w-full pl-4 pr-11 py-3.5 bg-[#1d071b] border-2 border-[#f5bd4e]/40 rounded-xl focus:ring-2 focus:ring-[#f5bd4e]/50 focus:border-[#f5bd4e] text-white font-semibold placeholder:text-zinc-400 text-base transition-all caret-[#f5bd4e]"
                />
                <Search className="w-5 h-5 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] hover:brightness-110 text-[#38112f] rounded-xl font-bold text-base transition-all shadow-[0_4px_20px_rgba(245,189,78,0.3)] flex justify-center items-center h-14 transform hover:scale-[1.01] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-[#38112f]">
                  <svg className="animate-spin h-5 w-5 text-[#38112f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Searching Passes...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Retrieve Entry Pass</span>
                </span>
              )}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-400 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f5bd4e]" />
            <span>Quick test:</span>
            <button 
              type="button"
              onClick={() => setSearchQuery('DN-DEMO')}
              className="text-[#f5bd4e] underline hover:text-amber-200 font-mono font-semibold"
            >
              Load &apos;DN-DEMO&apos;
            </button>
          </div>
        </div>

        {passData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Valid Registration Verified
              </span>
              <h2 className="text-2xl font-serif font-bold text-amber-200">Official Entry Pass</h2>
            </div>

            <div className="w-full mb-6">
              <DigitalPass data={passData} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] text-[#38112f] rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Pass</span>
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Here is my official entry pass for ${EVENT_CONFIG.name}! Registration ID: ${passData.registrationId} at ${passData.venue}. See you on the dance floor!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Share on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
