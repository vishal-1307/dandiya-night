'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/lib/config';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const eventDate = new Date(EVENT_CONFIG.date + 'T17:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, eventDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" className="relative bg-[#140412] text-[#FFF8F0] overflow-hidden">
      {/* Hero Visual Area with Real Event Photography Scrim */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center pt-28 sm:pt-36 pb-16 sm:pb-20">
        {/* Background Image with Fixed Scrim Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140412]/95 via-[#1b0619]/90 to-[#140412]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140412] via-transparent to-black/40" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          <div className="max-w-2xl space-y-5">
            {/* Event Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-[#f5bd4e]/40 text-[#f5bd4e] text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>108 Girls Jhijhiya &amp; Dandiya Fest 2026</span>
            </div>

            {/* Headline: Clear, Cultural, Non-overlapping */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#fcf4e5] tracking-normal leading-[1.12]">
              Move to the rhythm of <span className="text-[#f5bd4e] italic">Jhijhiya &amp; Raas.</span>
            </h1>

            {/* Concise 2-Line Summary */}
            <p className="text-zinc-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Mithila&apos;s grand 108 Girls Jhijhiya folk performance &amp; high-energy Dandiya Raas in Jhanjharpur, Madhubani. Presented by Evolution Dance and Karate Academy with BroCollab.
            </p>

            {/* Primary Action and Quiet Secondary Link */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <Button href="/register" variant="primary" size="lg">
                <span>Reserve Pass</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <a
                href="#schedule"
                className="text-sm font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors underline-offset-4 hover:underline"
              >
                <span>View Programme</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* At-a-glance Strip (Factually Rich, Mobile-Friendly) */}
      <section className="border-y border-[#f5bd4e]/20 bg-[#1a0618] relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Date */}
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#f5bd4e] flex items-center gap-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5" /> Date
              </span>
              <p className="font-serif font-bold text-white text-sm sm:text-base">
                Sunday, 18 Oct 2026
              </p>
              <span className="text-[11px] text-zinc-400 font-mono block">Navratri Mahotsav</span>
            </div>

            {/* Time */}
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#f5bd4e] flex items-center gap-1.5 font-bold">
                <Clock className="w-3.5 h-3.5" /> Timing
              </span>
              <p className="font-serif font-bold text-white text-sm sm:text-base">
                5:00 PM Onwards
              </p>
              <span className="text-[11px] text-zinc-400 font-mono block">Single Day Performance</span>
            </div>

            {/* Venue */}
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#f5bd4e] flex items-center gap-1.5 font-bold">
                <MapPin className="w-3.5 h-3.5" /> Venue
              </span>
              <p className="font-serif font-bold text-white text-sm sm:text-base truncate">
                {EVENT_CONFIG.venue.name}
              </p>
              <a 
                href="#venue" 
                className="text-[11px] text-[#f5bd4e] hover:underline font-mono inline-flex items-center gap-1"
              >
                <span>{EVENT_CONFIG.venue.city}, {EVENT_CONFIG.district}</span>
                <span>→</span>
              </a>
            </div>

            {/* Live Ticker / Pass Status */}
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Countdown
              </span>
              <div className="font-mono font-bold text-[#f5bd4e] text-sm sm:text-base">
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
              </div>
              <span className="text-[11px] text-zinc-400 font-mono block">
                ₹149 / ₹249 / ₹399
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
