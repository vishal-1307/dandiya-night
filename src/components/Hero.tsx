'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/lib/config';
import { Clock, Calendar, MapPin, ArrowUpRight, ArrowDown } from 'lucide-react';

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

  const scrollToExperience = () => {
    const target = document.getElementById('about') || document.getElementById('experiences');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-editorial" id="home">
      {/* Left Column: Hero Editorial Copy */}
      <div className="hero-copy">
        <p className="eyebrow reveal">
          Navratri 2026 <i></i> {EVENT_CONFIG.city}, {EVENT_CONFIG.state}
        </p>

        <h1 className="reveal">
          Move to<br />
          <em>the rhythm</em><br />
          of raas.
        </h1>

        <p className="hero-summary reveal">
          An electric evening of Garba circles, Dandiya beats and all the colour you can carry in the cultural heart of Mithila.
        </p>

        <div className="hero-actions reveal">
          <Link href="/register" className="hero-btn-primary group">
            Reserve your spot <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <button 
            type="button" 
            onClick={scrollToExperience} 
            className="round-play" 
            aria-label="Explore the event"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <span className="explore-label">Explore the night</span>
        </div>

        <div className="hero-meta reveal">
          <div>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#f5bd4e]" /> WHEN
            </span>
            <strong>15 Oct &apos;26 · 5 PM</strong>
          </div>
          <div>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#f5bd4e]" /> WHERE
            </span>
            <strong>{EVENT_CONFIG.venue.name}, {EVENT_CONFIG.venue.city}</strong>
          </div>
        </div>
      </div>



      {/* Pinned Bottom-Left: Live Countdown */}
      <aside className="countdown" aria-label="Countdown to event">
        <p>
          <Clock className="w-3.5 h-3.5 animate-pulse text-[#f5bd4e]" />
          <span>THE COUNTDOWN IS ON</span>
        </p>
        <div id="countdown">
          <div className="countdown-box">
            <b>{timeLeft.days}</b>
            <small>Days</small>
          </div>
          <i>:</i>
          <div className="countdown-box">
            <b>{timeLeft.hours}</b>
            <small>Hrs</small>
          </div>
          <i>:</i>
          <div className="countdown-box">
            <b>{timeLeft.minutes}</b>
            <small>Min</small>
          </div>
          <i>:</i>
          <div className="countdown-box">
            <b>{timeLeft.seconds}</b>
            <small>Sec</small>
          </div>
        </div>
      </aside>

      {/* Pinned Bottom-Right: Side Scroll Indicator */}
      <div 
        className="hero-side-note cursor-pointer hover:opacity-80 transition-opacity" 
        onClick={scrollToExperience}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') scrollToExperience(); }}
      >
        scroll to enter <span>↓</span>
      </div>
    </section>
  );
}
