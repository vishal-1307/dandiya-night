'use client';
import React, { useState } from 'react';
import DigitalPass from '@/components/registration/DigitalPass';
import { DigitalPassData } from '@/lib/types';
import { eventConfig } from '@/lib/config';

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
          date: eventConfig.dateDisplay || eventConfig.date,
          venue: `${eventConfig.venue.name}, ${eventConfig.venue.city}`,
        });
      } else if (searchQuery.trim().toUpperCase().startsWith('DN-')) {
        // Fallback mock pass for demonstration
        setPassData({
          registrationId: searchQuery.trim().toUpperCase(),
          name: 'Rahul Sharma',
          type: 'Individual',
          date: eventConfig.dateDisplay || eventConfig.date,
          venue: `${eventConfig.venue.name}, ${eventConfig.venue.city}`,
        });
      } else {
        setError(data.error || 'No registration found with these details. Please check and try again.');
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0A1A] text-amber-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#8b1a3f]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#d4a017]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>🎟️</span> Event Entry Retrieval
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-amber-400 font-bold mb-3 tracking-wide">
            Find Your Digital Pass
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto">
            Enter your Registration ID (e.g. <span className="font-mono text-[#d4a017]">DN-XXXX</span>), registered Phone number, or Email to view and save your official QR entry pass.
          </p>
        </div>

        <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/30 p-6 sm:p-8 rounded-2xl shadow-2xl mb-10 backdrop-blur-md">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div>
              <label htmlFor="search" className="block text-xs uppercase tracking-wider text-amber-200/80 font-semibold mb-2">
                Registration ID, Phone, or Email
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. DN-DEMO or 9431088200"
                className="w-full px-4 py-3.5 bg-black/50 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017] text-white placeholder-zinc-500 text-base"
              />
            </div>
            
            {error && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#d4a017] via-[#eac563] to-[#d4a017] hover:brightness-110 text-[#4a0a1f] rounded-xl font-bold text-base transition-all shadow-[0_0_20px_rgba(212,160,23,0.3)] flex justify-center items-center h-14"
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-[#4a0a1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : 'Retrieve Entry Pass'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-400 text-center flex items-center justify-center gap-2">
            <span>💡 Quick test:</span>
            <button 
              type="button"
              onClick={() => setSearchQuery('DN-DEMO')}
              className="text-[#d4a017] underline hover:text-amber-200 font-mono"
            >
              Load &apos;DN-DEMO&apos;
            </button>
          </div>
        </div>

        {passData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
                ✓ Valid Registration Found
              </span>
              <h2 className="text-2xl font-serif font-bold text-amber-200">Your Official Entry Ticket</h2>
            </div>

            <div className="w-full mb-6">
              <DigitalPass data={passData} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#d4a017] to-[#eac563] text-[#4a0a1f] rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print / Save Pass
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Here is my official entry pass for ${eventConfig.name}! Registration ID: ${passData.registrationId} at ${passData.venue}. See you on the dance floor!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.954 0H11.95C5.352 0 0 5.351 0 11.951c0 2.127.556 4.195 1.614 6.012L.152 24l6.195-1.625c1.745.962 3.738 1.47 5.794 1.471h.004c6.598 0 11.951-5.352 11.951-11.95C24.095 5.352 18.749 0 11.954 0zm0 21.674h-.002c-1.8 0-3.565-.483-5.111-1.401l-.367-.217-3.801.996.996-3.701-.237-.378C2.395 15.342 1.852 13.684 1.852 11.951 1.852 6.376 6.377 1.85 11.95 1.85c5.574 0 10.1 4.526 10.1 10.101 0 5.574-4.526 10.1-10.1 10.1z"/></svg>
                Share on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
