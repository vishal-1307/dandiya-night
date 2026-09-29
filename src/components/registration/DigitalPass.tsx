'use client';

import React, { useState } from 'react';
import { DigitalPassData } from '@/lib/types';
import { EVENT_CONFIG } from '@/lib/config';
import { Sparkles, Calendar, MapPin, Copy, Check, ShieldCheck, Ticket } from 'lucide-react';

interface DigitalPassProps {
  data: DigitalPassData;
}

export default function DigitalPass({ data }: DigitalPassProps) {
  const [copied, setCopied] = useState(false);

  const copyPassId = () => {
    if (data.registrationId) {
      navigator.clipboard.writeText(data.registrationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formatPassType = (type: string) => {
    const t = String(type || '').toUpperCase();
    if (t.includes('JHIJHIYA') || t.includes('108')) return '108 Girls Jhijhiya Performance';
    if (t.includes('COUPLE')) return 'Dandiya Night: Couple Pass';
    if (t.includes('SINGLE') || t.includes('INDIVIDUAL')) return 'Dandiya Night: Single Pass';
    return `${type} Entry Pass`;
  };

  return (
    <div 
      id="digital-event-pass" 
      className="max-w-md mx-auto w-full bg-gradient-to-b from-[#250920] via-[#350d2e] to-[#180415] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)] border-2 border-[#f5bd4e]/60 text-[#FFF8F0] relative flex flex-col transition-all"
    >
      {/* Golden Corner Accents */}
      <div className="absolute top-2 left-2 text-[#f5bd4e]/40 text-xs font-mono select-none">✦</div>
      <div className="absolute top-2 right-2 text-[#f5bd4e]/40 text-xs font-mono select-none">✦</div>
      <div className="absolute bottom-2 left-2 text-[#f5bd4e]/40 text-xs font-mono select-none">✦</div>
      <div className="absolute bottom-2 right-2 text-[#f5bd4e]/40 text-xs font-mono select-none">✦</div>

      {/* Decorative Traditional Motif Top Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#f5bd4e]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Official Academy Gold Crest Emblem */}
      <div className="pt-8 pb-5 px-6 text-center border-b border-[#f5bd4e]/25 relative z-10 bg-black/35">
        <div className="relative inline-block mb-3">
          <img 
            src="/images/jhanjharpur-logo.jpg" 
            alt="Jhanjharpur Jhijhiya & Dandiya Fest Emblem" 
            className="w-16 h-16 mx-auto object-cover rounded-full border-2 border-[#f5bd4e]/70 shadow-[0_0_20px_rgba(245,189,78,0.5)]" 
          />
          <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
        </div>

        <p className="text-[11px] uppercase tracking-[0.25em] text-[#f5bd4e] font-mono font-semibold mb-1">
          ✦ JHANJHARPUR • FEST 2026 ✦
        </p>

        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#fcf4e5] tracking-wide uppercase">
          {EVENT_CONFIG.name}
        </h2>
        <p className="text-[11px] text-zinc-400 font-hindi mt-0.5">
          {EVENT_CONFIG.tagline}
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#f5bd4e]/15 border border-[#f5bd4e]/40 text-[#f5bd4e] text-xs font-mono font-bold tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Entry Pass</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 flex-grow flex flex-col items-center justify-center space-y-6 relative z-10">
        {/* Attendee Name */}
        <div className="text-center w-full">
          <span className="text-xs uppercase tracking-widest text-[#f5bd4e]/80 font-mono block mb-1">
            Passholder Name
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            {data.name}
          </h3>
        </div>

        {/* Category Circular Seal */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f5bd4e]/20 border-2 border-[#f5bd4e]/60 text-[#f5bd4e] shadow-lg text-center">
          <Ticket className="w-4 h-4 flex-shrink-0" />
          <span className="font-serif font-bold text-xs sm:text-sm tracking-wider uppercase">
            {formatPassType(data.type)}
          </span>
        </div>

        {/* Royal Gold Pass ID Master Plaque (Direct ID lookup, no QR code) */}
        <div className="w-full relative group">
          <div className="w-full bg-gradient-to-b from-[#fae29c] via-[#f5bd4e] to-[#c78b14] rounded-2xl p-5 sm:p-6 text-center shadow-[0_6px_30px_rgba(245,189,78,0.35)] border-2 border-[#fff2b8] transform transition-transform group-hover:scale-[1.01]">
            <p className="text-[11px] uppercase tracking-[0.2em] font-mono font-extrabold text-[#3b0b2b] mb-1">
              Official Entry Pass ID
            </p>
            <div className="text-3xl sm:text-4xl font-mono font-black text-[#26061c] tracking-widest my-1 drop-shadow-sm select-all">
              {data.registrationId}
            </div>
            <p className="text-[11px] font-sans font-semibold text-[#4e133a]">
              Present this ID at the Entry Gate &amp; Registration Desk
            </p>

            {/* Quick Tap to Copy Button */}
            <button
              type="button"
              onClick={copyPassId}
              className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#27081e] text-[#f5bd4e] text-xs font-mono font-bold hover:bg-[#3d0e30] transition-colors shadow-sm"
              title="Copy Pass ID"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Tap to Copy Pass ID</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Event Schedule & Venue Information */}
        <div className="w-full bg-black/40 rounded-2xl p-4 border border-[#f5bd4e]/20 space-y-2.5 backdrop-blur-sm text-xs font-mono">
          <div className="flex items-center justify-between text-zinc-300">
            <span className="flex items-center gap-1.5 text-[#f5bd4e]">
              <Calendar className="w-3.5 h-3.5" /> Date &amp; Time
            </span>
            <span className="font-bold text-white text-right">
              {data.date || EVENT_CONFIG.dateDisplay} • 5:00 PM Onwards
            </span>
          </div>

          <div className="flex items-center justify-between text-zinc-300 pt-2 border-t border-zinc-800">
            <span className="flex items-center gap-1.5 text-[#f5bd4e]">
              <MapPin className="w-3.5 h-3.5" /> Venue
            </span>
            <span className="font-bold text-white text-right truncate max-w-[200px]">
              {data.venue || `${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.city}`}
            </span>
          </div>
        </div>

        {/* Verification Instruction Note */}
        <div className="flex items-center gap-2 text-center text-xs text-amber-200/90">
          <Sparkles className="w-3.5 h-3.5 text-[#f5bd4e] flex-shrink-0" />
          <span>Keep this pass on screen or screenshot for fast entry verification</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-black/60 py-3.5 px-6 text-center border-t border-[#f5bd4e]/25 relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified Pass
        </span>
        <span className="text-[#f5bd4e] font-semibold">
          {EVENT_CONFIG.venue.name} • {EVENT_CONFIG.venue.city}
        </span>
      </div>
    </div>
  );
}
