'use client';
import { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '@/lib/config';

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (e.g., 500px)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 bg-gradient-to-r from-[#8b1a3f] to-[#630f2c] transform transition-transform duration-300 ease-in-out shadow-[0_-4px_20px_rgba(0,0,0,0.5)] mithila-border-top">
      <div className="flex justify-center items-center">
        <a 
          href={EVENT_CONFIG.registration.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full text-center bg-[#d4a017] text-[#0F0A1A] font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
        >
          Register Now
        </a>
      </div>
    </div>
  );
}
