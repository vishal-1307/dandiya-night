'use client';

import React, { useState } from 'react';
import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationSuccess from '@/components/registration/RegistrationSuccess';
import { EVENT_CONFIG } from '@/lib/config';

export default function RegisterPage() {
  const [successData, setSuccessData] = useState<{ id: string; name: string; type: string; fullData?: any } | null>(null);

  const handleSuccess = (id: string, name: string, type: string, fullData?: any) => {
    setSuccessData({ id, name, type, fullData });
  };

  return (
    <main className="min-h-screen bg-[#0F0A1A] text-amber-50 pt-36 sm:pt-44 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#8b1a3f]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#d4a017]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono font-bold block mb-2">
            🌸 {EVENT_CONFIG.name} 🌸
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fcf4e5] mb-4">
            Event Registration &amp; Digital Pass
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto">
            Register for the historic 108 Girls Jhijhiya folk performance (₹149) or reserve your Dandiya Night Single (₹249) &amp; Couple (₹399) passes in Jhanjharpur, Madhubani.
          </p>
        </div>

        {successData ? (
          <RegistrationSuccess 
            registrationId={successData.id} 
            name={successData.name} 
            type={successData.type} 
            fullData={successData.fullData}
          />
        ) : (
          <RegistrationForm onSuccess={handleSuccess} />
        )}
      </div>
    </main>
  );
}
