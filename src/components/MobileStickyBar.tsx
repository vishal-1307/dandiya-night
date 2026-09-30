'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ticket, ArrowUpRight } from 'lucide-react';

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not show sticky register button if already on register, pass lookup, or admin pages
  if (!isVisible || pathname === '/register' || pathname === '/my-pass' || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] p-3 bg-gradient-to-r from-[#2a0b23]/95 via-[#380e2f]/95 to-[#2a0b23]/95 backdrop-blur-lg border-t border-[#f5bd4e]/30 shadow-[0_-8px_25px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <Link 
          href="/my-pass"
          className="py-3 px-3.5 rounded-xl bg-[#f5bd4e]/15 border border-[#f5bd4e]/35 text-[#f5bd4e] font-mono text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          aria-label="Find My Pass"
        >
          <Ticket className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">Pass</span>
        </Link>
        <Link 
          href="/register" 
          className="flex-1 text-center bg-gradient-to-r from-[#f5bd4e] via-[#e5b244] to-[#d4a017] text-[#38112f] font-bold py-3 px-5 rounded-xl text-sm uppercase tracking-wider shadow-[0_4px_15px_rgba(245,189,78,0.35)] flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <span>Reserve Spot</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
}
