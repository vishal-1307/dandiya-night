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
  Phone,
  ArrowUpRight
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    { label: 'Rules', href: '/#rules', icon: ShieldCheck },
    { label: 'FAQ', href: '/#faq', icon: HelpCircle },
  ];

  return (
    <>
      <header 
        className={`fixed w-full z-[100] transition-colors duration-200 ${
          isScrolled 
            ? 'top-0 bg-[#140412]/95 backdrop-blur-md py-2.5 border-b border-[#f5bd4e]/20 shadow-lg' 
            : 'top-[32px] bg-transparent py-3'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo / Event Brand */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <img 
                src="/images/jhanjharpur-logo.jpg" 
                alt="Jhanjharpur Jhijhiya & Dandiya Fest 2026" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#f5bd4e]/40 shadow-sm" 
              />
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#fcf4e5] tracking-wide leading-tight line-clamp-2 max-w-[210px] sm:max-w-none group-hover:text-[#f5bd4e] transition-colors">
                  {EVENT_CONFIG.name}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (No Gallery) */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7">
              <Link href="/#about" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">
                Experience
              </Link>
              <Link href="/#experiences" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">
                Moments
              </Link>
              <Link href="/#schedule" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">
                Schedule
              </Link>
              <Link href="/#venue" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">
                Venue
              </Link>
              
              <Link 
                href="/my-pass" 
                className="text-xs uppercase tracking-wider font-semibold text-[#f5bd4e] hover:text-[#fcf4e5] transition-colors flex items-center gap-1.5 font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-[#f5bd4e]/30"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Find Pass</span>
              </Link>

              <Button href="/register" variant="primary" size="sm" className="min-h-[40px] px-4">
                <span>Reserve Pass</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </nav>

            {/* Mobile Actions: Find Pass + Hamburger Menu */}
            <div className="flex md:hidden items-center gap-2">
              <Link 
                href="/my-pass" 
                className="text-xs font-mono text-[#f5bd4e] flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-[#f5bd4e]/30 font-semibold"
                aria-label="Find My Pass"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Pass</span>
              </Link>

              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.06] border border-[#f5bd4e]/30 text-[#f5bd4e] hover:bg-white/[0.1] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#f5bd4e]"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean, Focused Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex justify-end md:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Drawer Sheet */}
          <div 
            className="w-full max-w-sm h-full bg-[#160514] border-l border-[#f5bd4e]/25 flex flex-col shadow-2xl animate-in slide-in-from-right duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-[#1e071c]">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <img 
                  src="/images/jhanjharpur-logo.jpg" 
                  alt="Logo" 
                  className="w-8 h-8 rounded-full object-cover border border-[#f5bd4e]/40" 
                />
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-[#fcf4e5] leading-tight line-clamp-1">
                    {EVENT_CONFIG.name}
                  </span>
                  <span className="text-[10px] text-[#f5bd4e] font-mono">
                    18 Oct 2026 • Jhanjharpur
                  </span>
                </div>
              </Link>

              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#f5bd4e]/70 px-3 block mb-2">
                Event Sections
              </span>

              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm text-[#fcf4e5] hover:bg-white/[0.05] hover:text-[#f5bd4e] transition-colors border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#f5bd4e]/80" />
                      <span className="font-medium">{link.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                  </Link>
                );
              })}

              {/* Direct Helpline Row */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 px-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1.5">
                  Helpline &amp; Support
                </span>
                <a 
                  href={`tel:${EVENT_CONFIG.contact.phone}`} 
                  className="flex items-center gap-2 text-xs font-mono font-bold text-[#f5bd4e] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{EVENT_CONFIG.contact.phone}</span>
                </a>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-zinc-800 bg-[#1a0618] space-y-2.5">
              <Button 
                href="/register" 
                variant="primary" 
                size="md" 
                className="w-full justify-center"
              >
                <span>Reserve Pass</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <Button 
                href="/my-pass" 
                variant="secondary" 
                size="md" 
                className="w-full justify-center text-xs font-mono"
              >
                <Ticket className="w-4 h-4 mr-1.5 text-[#f5bd4e]" />
                <span>Find My Pass</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
