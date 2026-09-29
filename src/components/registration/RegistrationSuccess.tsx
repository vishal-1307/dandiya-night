'use client';

import React from 'react';
import Link from 'next/link';
import DigitalPass from './DigitalPass';
import { DigitalPassData } from '@/lib/types';
import { EVENT_CONFIG } from '@/lib/config';
import { CheckCircle2, Printer, Share2, ArrowLeft } from 'lucide-react';

interface RegistrationSuccessProps {
  registrationId: string;
  name: string;
  type: string;
}

export default function RegistrationSuccess({ registrationId, name, type }: RegistrationSuccessProps) {
  const passData: DigitalPassData = {
    registrationId,
    name,
    type,
    date: EVENT_CONFIG.dateDisplay || EVENT_CONFIG.date,
    venue: `${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.city}`,
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto py-6 px-4 animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
        <CheckCircle2 className="w-9 h-9 text-emerald-400" />
      </div>
      
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-2 text-center tracking-wide">
        Pass Reserved Successfully!
      </h2>
      <p className="text-zinc-300 mb-6 text-center max-w-md text-sm sm:text-base leading-relaxed">
        Your spot for {EVENT_CONFIG.name} is confirmed. Please screenshot or save your digital pass below.
      </p>

      <div className="w-full mb-8">
        <DigitalPass data={passData} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          type="button" 
          onClick={() => window.print()}
          className="px-6 py-3.5 bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] text-[#38112f] rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Pass</span>
        </button>
        <a 
          href={`https://wa.me/?text=${encodeURIComponent(`I just registered for ${EVENT_CONFIG.name}! My entry pass ID is ${registrationId}. See you on ${EVENT_CONFIG.dateDisplay} at ${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.city}!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          <span>Share on WhatsApp</span>
        </a>
      </div>
      
      <Link 
        href="/" 
        className="mt-8 text-[#f5bd4e] hover:text-white transition-colors flex items-center gap-1.5 text-sm font-semibold font-mono"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Event Home</span>
      </Link>
    </div>
  );
}
