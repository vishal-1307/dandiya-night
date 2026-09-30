'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  Ticket, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  Camera, 
  Clock, 
  Trophy, 
  MapPin, 
  ShieldCheck, 
  HelpCircle, 
  Phone
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
    { label: 'Venue & Map', href: '/#venue', icon: MapPin },
    { label: 'Rules & Attire', href: '/#rules', icon: ShieldCheck },
    { label: 'FAQ', href: '/#faq', icon: HelpCircle },
    { label: 'Contact Helpdesk', href: '/#contact', icon: Phone },
  ];

  return (
    <>
      <header 
        className={`fixed w-full z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'top-0 bg-[#20071c]/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-[#f5bd4e]/20' 
            : 'top-[36px] bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo / Event Branding */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <img 
                src="/images/jhanjharpur-logo.jpg" 
                alt="Jhanjharpur Dandiya Fest Logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#f5bd4e]/40 drop-shadow-[0_0_8px_rgba(245,189,78,0.5)] group-hover:rotate-12 transition-transform duration-300" 
              />
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#fcf4e5] tracking-wide leading-tight group-hover:text-[#f5bd4e] transition-colors">
                  {EVENT_CONFIG.name}
                </span>
                <span className="text-[10px] text-[#f5bd4e] uppercase tracking-widest font-mono hidden xs:block">
                  {EVENT_CONFIG.city}, {EVENT_CONFIG.state}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-6">
              <Link href="/#about" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Experience</Link>
              <Link href="/#experiences" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Moments</Link>
              <Link href="/#schedule" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Schedule</Link>
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
                className="bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] text-[#38112f] px-5 py-2 font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(245,189,78,0.3)] inline-flex items-center gap-1.5 transform hover:scale-[1.02] active:scale-95"
              >
                <span>Reserve Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </nav>

            {/* Mobile Actions: Find Pass + 3-Line Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link 
                href="/my-pass" 
                className="text-xs font-mono text-[#f5bd4e] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5bd4e]/15 border border-[#f5bd4e]/30 font-semibold"
                aria-label="Find Pass"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Pass</span>
              </Link>

              {/* Three-Line Menu Toggle Button */}
              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#f5bd4e]/20 border border-[#f5bd4e]/40 text-[#f5bd4e] hover:bg-[#f5bd4e]/30 active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#f5bd4e]"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex justify-end md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Slide-in Menu Panel */}
          <div 
            className="w-[85%] max-w-[340px] h-full bg-[#180517] border-l border-[#f5bd4e]/20 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Top Bar of Drawer */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-[#20071f]">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/images/jhanjharpur-logo.jpg" 
                  alt="Logo" 
                  className="w-8 h-8 rounded-full object-cover border border-[#f5bd4e]/40" 
                />
                <div>
                  <span className="font-serif text-sm font-bold text-[#fcf4e5] block leading-tight">
                    Navigation
                  </span>
                  <span className="text-[10px] text-[#f5bd4e] font-mono">
                    18 Oct 2026 • 5:00 PM
                  </span>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-zinc-200 hover:text-[#f5bd4e] hover:bg-[#250a22] transition-colors border border-transparent hover:border-[#f5bd4e]/20 text-sm font-medium"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-[#f5bd4e]/10 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-zinc-800/80 mt-3 px-2">
                <span className="text-[10px] font-mono text-zinc-400 block mb-1 uppercase tracking-wider">Helplines</span>
                <div className="flex flex-col gap-1 text-xs">
                  <a href={`tel:${EVENT_CONFIG.contact.phone}`} className="text-[#f5bd4e] font-mono font-semibold">
                    {EVENT_CONFIG.contact.phone}
                  </a>
                  <a href={`tel:${EVENT_CONFIG.contact.phoneSecondary}`} className="text-zinc-300 font-mono">
                    {EVENT_CONFIG.contact.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="p-4 border-t border-zinc-800 bg-[#140413] space-y-2.5">
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-[#f5bd4e] to-[#d4a017] text-[#38112f] py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <span>Reserve Pass (₹149+)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/my-pass"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-[#20071e] border border-zinc-700 text-[#f5bd4e] font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Find My Pass</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

