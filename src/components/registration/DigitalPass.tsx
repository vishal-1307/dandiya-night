'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { DigitalPassData } from '@/lib/types';
import { eventConfig } from '@/lib/config';

interface DigitalPassProps {
  data: DigitalPassData;
}

export default function DigitalPass({ data }: DigitalPassProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (data.registrationId) {
      QRCode.toDataURL(data.registrationId, {
        width: 160,
        margin: 1,
        color: {
          dark: '#3f0919',
          light: '#ffffff',
        },
      })
        .then((url: string) => setQrCodeUrl(url))
        .catch((err: unknown) => console.error('QR code generation failed:', err));
    }
  }, [data.registrationId]);

  return (
    <div id="digital-event-pass" className="max-w-sm mx-auto bg-gradient-to-br from-[#8b1a3f] via-[#6d1a36] to-[#1A0E2E] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d4a017]/40 text-[#FFF8F0] relative flex flex-col transition-all hover:shadow-[0_0_30px_rgba(212,160,23,0.3)]">
      {/* Decorative Traditional Motif Top Banner */}
      <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="#d4a017" strokeWidth="2" fill="none" strokeDasharray="4 2" />
          <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="#d4a017" strokeWidth="1" />
          <circle cx="50" cy="50" r="15" fill="#d4a017" />
        </svg>
      </div>
      
      {/* Header */}
      <div className="p-6 text-center border-b border-[#d4a017]/25 relative z-10 bg-black/25">
        <img 
          src="/images/logo.svg" 
          alt="Mithila Dandiya Emblem" 
          className="w-12 h-12 mx-auto mb-2 object-contain drop-shadow-[0_0_10px_rgba(212,160,23,0.5)]" 
        />
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4a017] font-semibold mb-1">
          {eventConfig.subtitle || "Dandiya & Garba Night"}
        </p>
        <h2 className="text-2xl font-serif font-bold text-gradient-gold tracking-wider uppercase">
          {eventConfig.name}
        </h2>
        <div className="mt-2 text-xs tracking-widest text-[#d4a017] font-semibold bg-[#d4a017]/15 inline-block px-3 py-1 rounded-full border border-[#d4a017]/30">
          OFFICIAL ENTRY PASS
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 flex-grow flex flex-col items-center justify-center space-y-5 relative z-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-rose-200/80 mb-1">Attendee Name</p>
          <h3 className="text-2xl font-serif font-bold text-[#FFF8F0] tracking-wide">{data.name}</h3>
        </div>

        {/* Pass ID and Category Grid */}
        <div className="w-full bg-black/30 rounded-xl p-3.5 border border-[#d4a017]/20 flex justify-between items-center backdrop-blur-sm">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-rose-200/70">Registration ID</p>
            <p className="font-mono font-bold text-lg text-[#d4a017] tracking-wider">{data.registrationId}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-rose-200/70">Category</p>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-900/60 text-amber-200 border border-amber-400/20">
              {data.type}
            </span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="w-36 h-36 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg border-2 border-[#d4a017]/40 relative">
          {qrCodeUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrCodeUrl} alt={`QR Code for ${data.registrationId}`} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full border border-dashed border-gray-300 flex items-center justify-center text-gray-800 font-mono text-xs">
              Generating QR...
            </div>
          )}
        </div>
        <p className="text-[11px] text-amber-200/70 font-mono">Scan at venue check-in gate</p>
      </div>

      {/* Footer Info */}
      <div className="bg-black/40 p-4 text-xs text-center border-t border-[#d4a017]/20 relative z-10 space-y-1.5">
        <div className="flex justify-between items-center text-rose-100/90 font-medium">
          <span className="flex items-center gap-1">
            <span>📅</span> {data.date}
          </span>
          <span className="truncate ml-2 text-right text-amber-200">
            📍 {data.venue}
          </span>
        </div>
        <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
          <span>Non-transferable</span>
          <span className="text-[#d4a017]">Madhubani, Bihar</span>
        </div>
      </div>
    </div>
  );
}
