'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/lib/config';

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
          <Link href="/register" className="hero-btn-primary">
            Reserve your spot <span>↗</span>
          </Link>
          <button 
            type="button" 
            onClick={scrollToExperience} 
            className="round-play" 
            aria-label="Explore the event"
          >
            <span>↓</span>
          </button>
          <span className="explore-label">Explore the night</span>
        </div>

        <div className="hero-meta reveal">
          <div>
            <span>WHEN</span>
            <strong>15 Oct &apos;26 · 5 PM</strong>
          </div>
          <div>
            <span>WHERE</span>
            <strong>{EVENT_CONFIG.venue.name}, {EVENT_CONFIG.venue.city}</strong>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Art Composition */}
      <div className="hero-art" aria-hidden="true">
        <div className="sun-disc"></div>
        <div className="orbit orbit-one"></div>
        <div className="orbit orbit-two"></div>
        <div className="lamp lamp-a">✦</div>
        <div className="lamp lamp-b">✦</div>

        <svg className="dancers" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M333 74C367 74 386 101 379 130C372 159 341 171 317 157C290 142 295 98 333 74Z" fill="#F8C859" />
          <path d="M266 166C299 140 356 140 401 170C437 195 482 225 551 222" stroke="#FAD075" strokeWidth="22" strokeLinecap="round" />
          <path d="M264 170C230 217 230 286 267 329C295 362 333 379 377 394" stroke="#FF7A3B" strokeWidth="44" strokeLinecap="round" />
          <path d="M399 170C390 230 406 283 449 327C484 363 526 384 573 390" stroke="#FAD075" strokeWidth="44" strokeLinecap="round" />
          <path d="M267 335C205 403 183 484 165 602" stroke="#FF7A3B" strokeWidth="50" strokeLinecap="round" />
          <path d="M447 332C458 426 475 498 546 604" stroke="#FAD075" strokeWidth="50" strokeLinecap="round" />
          <path d="M278 233C336 285 405 302 472 299" stroke="#5E1944" strokeWidth="18" strokeLinecap="round" />
          <path d="M195 137L543 93" stroke="#5E1944" strokeWidth="13" strokeLinecap="round" />
          <path d="M197 101L545 148" stroke="#A21E46" strokeWidth="13" strokeLinecap="round" />
          <path d="M145 537C254 488 404 476 591 548" stroke="#5E1944" strokeWidth="25" strokeLinecap="round" />
          <circle cx="190" cy="562" r="20" fill="#F8C859" />
          <circle cx="550" cy="560" r="16" fill="#FF7A3B" />
        </svg>

        <span className="art-tag tag-one">one night only</span>
        <span className="art-tag tag-two">dress in colour</span>
      </div>

      {/* Pinned Bottom-Left: Live Countdown */}
      <aside className="countdown" aria-label="Countdown to event">
        <p>THE COUNTDOWN IS ON</p>
        <div id="countdown">
          <span><b>{timeLeft.days}</b><small>Days</small></span>
          <i>:</i>
          <span><b>{timeLeft.hours}</b><small>Hrs</small></span>
          <i>:</i>
          <span><b>{timeLeft.minutes}</b><small>Min</small></span>
          <i>:</i>
          <span><b>{timeLeft.seconds}</b><small>Sec</small></span>
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
