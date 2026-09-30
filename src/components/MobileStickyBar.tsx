'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ticket, ArrowRight } from 'lucide-react';

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show once scrolled past the top hero banner
      if (window.scrollY > 480) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not show sticky bar on register, pass lookup, or admin pages
  if (!isVisible || pathname === '/register' || pathname === '/my-pass' || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#140412]/95 backdrop-blur-md border-t border-zinc-800 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <Link 
          href="/my-pass"
          className="h-11 px-3.5 rounded-lg bg-[#1e071c] border border-zinc-700 hover:border-[#f5bd4e] text-[#fcf4e5] font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          aria-label="Find My Pass"
        >
          <Ticket className="w-4 h-4 text-[#f5bd4e] flex-shrink-0" />
          <span>Find Pass</span>
        </Link>
        <Link 
          href="/register" 
          className="flex-1 h-11 px-4 rounded-lg bg-[#f5bd4e] hover:bg-[#e5ad3e] text-[#140412] font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Reserve Pass (₹149+)</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
}

