'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  Ticket, 
  ArrowUpRight, 
  Menu, 
  X, 
  Sparkles, 
  Camera, 
  Clock, 
  Trophy, 
  MapPin, 
  ShieldCheck, 
  HelpCircle, 
  Phone,
  PhoneCall
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Experience', href: '/#about', icon: Sparkles },
    { label: 'Moments', href: '/#experiences', icon: Camera },
    { label: 'Schedule', href: '/#schedule', icon: Clock },
    { label: 'Highlights', href: '/#highlights', icon: Trophy },
    { label: 'Gallery', href: '/#gallery', icon: Sparkles },
    { label: 'Venue & Map', href: '/#venue', icon: MapPin },
    { label: 'Rules', href: '/#rules', icon: ShieldCheck },
    { label: 'FAQ', href: '/#faq', icon: HelpCircle },
  ];

  return (
    <>
      <header 
        className={`fixed w-full z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'top-0 bg-[#240a1f]/95 backdrop-blur-md shadow-2xl py-3 border-b border-[#f5bd4e]/20' 
            : 'top-[38px] bg-transparent py-3.5 sm:py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo / Event Branding */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <img 
                src="/images/logo.svg" 
                alt="Mithila Dandiya Logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(245,189,78,0.5)] group-hover:rotate-12 transition-transform duration-300" 
              />
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#fcf4e5] tracking-wide leading-tight group-hover:text-[#f5bd4e] transition-colors">
                  {EVENT_CONFIG.name}
                </span>
                <span className="text-[10px] text-[#f5bd4e] uppercase tracking-widest font-mono hidden xs:block">
                  {EVENT_CONFIG.city}, {EVENT_CONFIG.state}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7">
              <Link href="/#about" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Experience</Link>
              <Link href="/#experiences" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Moments</Link>
              <Link href="/#schedule" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Schedule</Link>
              <Link href="/#gallery" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Gallery</Link>
              <Link href="/#venue" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Venue</Link>
              
              <Link 
                href="/my-pass" 
                className="text-xs uppercase tracking-wider font-semibold text-[#f5bd4e] hover:text-[#fcf4e5] transition-colors flex items-center gap-1.5 font-mono px-3 py-1.5 rounded-lg bg-[#f5bd4e]/10 border border-[#f5bd4e]/20"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Find Pass</span>
              </Link>

              <Link 
                href="/register"
                className="bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] text-[#38112f] px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(245,189,78,0.3)] inline-flex items-center gap-1.5 transform hover:scale-[1.02] active:scale-95"
              >
                <span>Reserve spot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </nav>

            {/* Mobile Actions: Find Pass + 3-Line Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link 
                href="/my-pass" 
                className="text-xs font-mono text-[#f5bd4e] flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f5bd4e]/15 border border-[#f5bd4e]/30 font-semibold"
                aria-label="Find Pass"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>My Pass</span>
              </Link>

              {/* Three-Line Menu Toggle Button */}
              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#f5bd4e]/20 border border-[#f5bd4e]/40 text-[#f5bd4e] hover:bg-[#f5bd4e]/30 active:scale-90 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#f5bd4e]"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-[#140412]/98 backdrop-blur-3xl flex flex-col md:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Mobile Drawer Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f5bd4e]/20 bg-[#20081d]">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <img 
                src="/images/logo.svg" 
                alt="Logo" 
                className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(245,189,78,0.5)]" 
              />
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-[#fcf4e5] leading-tight">
                  {EVENT_CONFIG.name}
                </span>
                <span className="text-[10px] text-[#f5bd4e] uppercase tracking-wider font-mono">
                  {EVENT_CONFIG.city}, {EVENT_CONFIG.state}
                </span>
              </div>
            </Link>

            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-[#f5bd4e]/20 border border-[#f5bd4e]/50 flex items-center justify-center text-[#f5bd4e] active:scale-90 transition-transform focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Scrollable Navigation List */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#f5bd4e]/70 px-2 mb-3">
              Explore Event
            </p>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#230c22]/80 border border-zinc-800/80 hover:border-[#f5bd4e]/40 hover:bg-[#2e102c] active:bg-[#351333] transition-all text-[#fcf4e5] group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-[#f5bd4e]/15 flex items-center justify-center text-[#f5bd4e] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-serif text-lg font-medium tracking-wide">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#f5bd4e] transition-colors" />
                </Link>
              );
            })}

            {/* Quick Contact Line */}
            <div className="pt-4 border-t border-zinc-800/80 mt-4 px-2 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#f5bd4e]" /> Helpline:
              </span>
              <a href={`tel:${EVENT_CONFIG.contact.phone}`} className="font-mono text-[#fcf4e5] font-bold underline">
                {EVENT_CONFIG.contact.phone}
              </a>
            </div>
          </div>

          {/* Mobile Drawer Bottom CTAs */}
          <div className="p-5 border-t border-[#f5bd4e]/20 bg-[#1d061a] space-y-3">
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-gradient-to-r from-[#f5bd4e] via-[#e5b244] to-[#d4a017] text-[#38112f] py-4 rounded-2xl font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(245,189,78,0.4)] active:scale-95 transition-transform"
            >
              <span>Reserve Your Spot</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </Link>

            <Link
              href="/my-pass"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-[#2a0e27] border border-[#f5bd4e]/30 text-[#f5bd4e] font-mono text-sm font-semibold flex items-center justify-center gap-2 active:bg-[#341130] transition-colors"
            >
              <Ticket className="w-4 h-4" />
              <span>Find Already Booked Pass</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
