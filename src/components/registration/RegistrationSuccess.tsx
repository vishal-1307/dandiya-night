'use client';
import React from 'react';
import Link from 'next/link';
import DigitalPass from './DigitalPass';
import { DigitalPassData } from '@/lib/types';
import { eventConfig } from '@/lib/config';

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
    date: eventConfig.dateDisplay || eventConfig.date,
    venue: `${eventConfig.venue.name}, ${eventConfig.venue.city}`,
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
        <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 mb-2 text-center tracking-wide">
        Registration Confirmed!
      </h2>
      <p className="text-zinc-300 mb-8 text-center max-w-md text-sm sm:text-base">
        Your entry for {eventConfig.name} is confirmed. Please save or take a screenshot of your digital pass below.
      </p>

      <div className="w-full mb-8">
        <DigitalPass data={passData} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          onClick={() => window.print()}
          className="px-6 py-3.5 bg-gradient-to-r from-[#d4a017] to-[#eac563] text-[#4a0a1f] rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Print / Save Pass
        </button>
        <a 
          href={`https://wa.me/?text=${encodeURIComponent(`I just registered for ${eventConfig.name}! My pass ID is ${registrationId}. See you at ${eventConfig.venue.name}, Madhubani!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.954 0H11.95C5.352 0 0 5.351 0 11.951c0 2.127.556 4.195 1.614 6.012L.152 24l6.195-1.625c1.745.962 3.738 1.47 5.794 1.471h.004c6.598 0 11.951-5.352 11.951-11.95C24.095 5.352 18.749 0 11.954 0zm0 21.674h-.002c-1.8 0-3.565-.483-5.111-1.401l-.367-.217-3.801.996.996-3.701-.237-.378C2.395 15.342 1.852 13.684 1.852 11.951 1.852 6.376 6.377 1.85 11.95 1.85c5.574 0 10.1 4.526 10.1 10.101 0 5.574-4.526 10.1-10.1 10.1zm5.556-7.574c-.305-.153-1.802-.89-2.083-.992-.281-.102-.485-.153-.69.153-.204.305-.788.992-.967 1.196-.179.204-.358.229-.663.076-1.554-.775-2.73-1.644-3.791-3.447-.18-.305.18-.284.478-.881.089-.178.045-.333-.031-.486-.076-.153-.69-1.666-.946-2.28-.249-.602-.503-.52-.69-.529-.178-.009-.382-.012-.587-.012-.204 0-.535.076-.815.382-.281.305-1.07 1.045-1.07 2.545s1.096 2.954 1.249 3.158c.153.204 2.155 3.287 5.222 4.611 2.052.888 2.871.958 3.993.803 1.258-.174 3.792-1.549 4.328-3.045.535-1.496.535-2.778.375-3.045-.153-.268-.56-.426-.865-.58z"/></svg>
          Share on WhatsApp
        </a>
      </div>
      
      <Link href="/" className="mt-8 text-amber-400 hover:text-amber-200 underline underline-offset-4 text-sm font-medium">
        ← Back to Event Home
      </Link>
    </div>
  );
}
