'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/lib/config';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'top-0 bg-[#38112f]/95 backdrop-blur-md shadow-2xl py-3 border-b border-[#f5bd4e]/20' 
          : 'top-[38px] bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Event Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.svg" 
              alt="Mithila Dandiya Logo" 
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(245,189,78,0.5)] group-hover:rotate-12 transition-transform duration-300" 
            />
            <div className="flex flex-col">
              <span className="font-playfair text-lg md:text-xl font-bold text-[#fcf4e5] tracking-wide leading-tight">
                {EVENT_CONFIG.name}
              </span>
              <span className="text-[10px] text-[#f5bd4e] uppercase tracking-widest hidden sm:block font-mono">
                {EVENT_CONFIG.city}, {EVENT_CONFIG.state}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="#about" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Experience</Link>
            <Link href="#experiences" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Moments</Link>
            <Link href="#schedule" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Schedule</Link>
            <Link href="#gallery" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Gallery</Link>
            <Link href="#venue" className="text-xs uppercase tracking-wider font-semibold text-[#fcf4e5]/85 hover:text-[#f5bd4e] transition-colors">Venue</Link>
            <Link href="/my-pass" className="text-xs uppercase tracking-wider font-semibold text-[#f5bd4e] hover:text-[#fcf4e5] transition-colors flex items-center gap-1.5 font-mono">
              <span>🎟️</span> Find My Pass
            </Link>
            <Link 
              href="/register"
              className="bg-[#f5bd4e] text-[#531239] px-6 py-2.5 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(245,189,78,0.3)] inline-flex items-center gap-1.5"
            >
              Reserve spot <span>↗</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#fcf4e5] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`md:hidden fixed inset-0 top-[76px] bg-[#38112f]/98 backdrop-blur-2xl transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-7 pb-20">
          <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-playfair text-[#fcf4e5] hover:text-[#f5bd4e]">Experience</Link>
          <Link href="#experiences" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-playfair text-[#fcf4e5] hover:text-[#f5bd4e]">Moments</Link>
          <Link href="#schedule" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-playfair text-[#fcf4e5] hover:text-[#f5bd4e]">Schedule</Link>
          <Link href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-playfair text-[#fcf4e5] hover:text-[#f5bd4e]">Gallery</Link>
          <Link href="#venue" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-playfair text-[#fcf4e5] hover:text-[#f5bd4e]">Venue</Link>
          <Link href="/my-pass" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-mono text-[#f5bd4e] hover:text-white flex items-center gap-2">
            <span>🎟️</span> Find My Pass
          </Link>
          <Link 
            href="/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 bg-[#f5bd4e] text-[#531239] px-8 py-3 font-bold text-base uppercase tracking-wider shadow-xl"
          >
            Reserve Your Spot ↗
          </Link>
        </div>
      </div>
    </header>
  );
}
