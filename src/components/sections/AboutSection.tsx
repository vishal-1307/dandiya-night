import { EVENT_CONFIG } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#0B0612] text-amber-50 relative overflow-hidden">
      {/* Subtle background ambient radial glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#8b1a3f]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#d4a017]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-semibold uppercase tracking-widest mb-4">
            <span>✨</span> Bihar&apos;s Premier Cultural Celebration
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#d4a017] to-amber-300 mb-6 tracking-wide">
            Where Heritage Meets Celebration
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent mx-auto"></div>
        </div>

        {/* 2-Column Editorial Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif text-amber-100 font-semibold leading-snug">
              Celebrating the Magic of Navratri in the Heart of Mithila
            </h3>
            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
              {EVENT_CONFIG.description}
            </p>
            <p className="text-base text-zinc-400 leading-relaxed">
              Step into an electric atmosphere bathed in festive lanterns, rhythmic dhol beats, and swirling traditional lehengas. Whether you are twirling in concentric Garba circles, competing with your partner for the coveted Best Dandiya Pair trophy, or relishing authentic festival delicacies, every moment at {EVENT_CONFIG.venue.name} is designed to be timeless.
            </p>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/25 text-center">
                <span className="block text-2xl font-bold font-serif text-[#d4a017]">500+</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Dancers</span>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/25 text-center">
                <span className="block text-2xl font-bold font-serif text-amber-300">6+ Hrs</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Live Beats</span>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/25 text-center">
                <span className="block text-2xl font-bold font-serif text-rose-400">₹10K+</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Prizes</span>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/25 text-center">
                <span className="block text-2xl font-bold font-serif text-emerald-400">100%</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Family Safe</span>
              </div>
            </div>

            {/* Organizer Credibility Strip */}
            <div className="flex items-center gap-4 pt-2 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <img 
                src="/images/logo.svg" 
                alt="Mithila Dandiya Emblem" 
                className="w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(212,160,23,0.4)]"
              />
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold">Organized By</p>
                <h4 className="text-base font-serif font-bold text-white">{EVENT_CONFIG.organizer.name}</h4>
                <p className="text-xs text-zinc-400">{EVENT_CONFIG.organizer.tagline}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#8b1a3f] via-[#d4a017] to-[#f97316] rounded-3xl opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4a017]/40 shadow-2xl bg-zinc-900">
                <img 
                  src="/images/about-culture.jpg" 
                  alt="Mithila Navratri Cultural Celebration" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                {/* Overlaid Info Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-900/80 border border-rose-400/30 text-rose-200 text-xs font-semibold mb-2 backdrop-blur-sm">
                    📍 Town Club Ground, Station Road
                  </span>
                  <h4 className="text-xl font-serif font-bold text-white mb-1">
                    Madhubani&apos;s Grandest Stage
                  </h4>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    Decorated canopies, traditional wooden dandiya sticks, high-fidelity sound, and live cultural folk ensembles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-8 border border-zinc-800/80 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:border-[#d4a017]/50 hover:shadow-[0_0_25px_rgba(212,160,23,0.15)] transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4a017]/10 flex items-center justify-center mb-6 text-[#d4a017] group-hover:scale-110 group-hover:bg-[#d4a017]/20 transition-all border border-[#d4a017]/30">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-amber-100 mb-3 group-hover:text-[#d4a017] transition-colors">Live Music & Dhol</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Soulful folk melodies, electrifying Gujarati & Bollywood fusion, and thunderous dhol rhythms that resonate through the night.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 border border-zinc-800/80 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:border-[#d4a017]/50 hover:shadow-[0_0_25px_rgba(212,160,23,0.15)] transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4a017]/10 flex items-center justify-center mb-6 text-[#d4a017] group-hover:scale-110 group-hover:bg-[#d4a017]/20 transition-all border border-[#d4a017]/30">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-amber-100 mb-3 group-hover:text-[#d4a017] transition-colors">Garba Circles & Raas</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Synchronized 2-step & 3-step Garba circles, free lightweight Dandiya sticks provided at venue, and open dance floor for all.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 border border-zinc-800/80 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:border-[#d4a017]/50 hover:shadow-[0_0_25px_rgba(212,160,23,0.15)] transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4a017]/10 flex items-center justify-center mb-6 text-[#d4a017] group-hover:scale-110 group-hover:bg-[#d4a017]/20 transition-all border border-[#d4a017]/30">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-amber-100 mb-3 group-hover:text-[#d4a017] transition-colors">Contests & Delicacies</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Exciting prizes for Best Dressed & Best Dandiya Pair, photo booths with instant print props, and delicious festive chaat stalls.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

