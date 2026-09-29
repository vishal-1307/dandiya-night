import { EVENT_CONFIG } from '@/lib/config';
import { Music, Sparkles, Trophy, MapPin, Sparkle, Star } from 'lucide-react';

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
            <Sparkle className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} /> Mithila Cultural Celebration 2026
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold tracking-wider">
              <span>🌺</span> 108 GIRLS GRAND JHIJHIYA &amp; DANDIYA NIGHT
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif text-amber-100 font-semibold leading-snug">
              Mithila ki Sanskriti... Hamari Pehchan
            </h3>
            
            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
              {EVENT_CONFIG.description}
            </p>
            
            <p className="text-base text-zinc-400 leading-relaxed">
              Presented by <strong className="text-amber-200">Evolution Dance and Karate Academy</strong> in collaboration with <strong className="text-amber-200">Brocollab.in</strong>, this festival honors the timeless Mithila tradition with a synchronized spectacle of 108 school &amp; college girls, followed by a pulsating open-to-all Dandiya and Garba night with live DJ beats.
            </p>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/25 text-center">
                <span className="block text-2xl font-bold font-serif text-[#d4a017]">108</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Jhijhiya Girls</span>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/25 text-center">
                <span className="block text-2xl font-bold font-serif text-amber-300">500+</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Dancers</span>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/25 text-center">
                <span className="block text-2xl font-bold font-serif text-rose-400">₹149</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Starting Pass</span>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-[#d4a017]/25 text-center">
                <span className="block text-2xl font-bold font-serif text-emerald-400">100%</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Family Safe</span>
              </div>
            </div>

            {/* Organizer Credibility Strip */}
            <div className="flex items-center gap-4 pt-2 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
              <img 
                src="/images/jhanjharpur-logo.jpg" 
                alt="Evolution Dance Academy & Jhanjharpur Dandiya Fest Emblem" 
                className="w-14 h-14 rounded-full object-cover border border-[#f5bd4e]/40 drop-shadow-[0_0_10px_rgba(212,160,23,0.4)]" 
              />
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold font-mono">Organized By</p>
                <h4 className="text-base font-serif font-bold text-white">{EVENT_CONFIG.organizer.name}</h4>
                <p className="text-xs text-zinc-400">In Collab with {EVENT_CONFIG.organizer.collab} • {EVENT_CONFIG.organizer.tagline}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#8b1a3f] via-[#d4a017] to-[#f97316] rounded-3xl opacity-35 blur-lg group-hover:opacity-65 transition duration-500"></div>

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4a017]/40 shadow-2xl bg-zinc-900">
                <img 
                  src="/images/jhijiya-poster.jpg" 
                  alt="108 Girls Jhijhiya Performance Jhanjharpur" 
                  className="w-full h-[460px] object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                {/* Overlaid Info Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/80 border border-rose-400/30 text-rose-200 text-xs font-semibold mb-2 backdrop-blur-sm">
                    <MapPin className="w-3 h-3 text-rose-300" /> Jhanjharpur (Madhubani, Bihar)
                  </span>
                  <h4 className="text-xl font-serif font-bold text-white mb-1">
                    108 Girls Grand Jhijhiya Performance
                  </h4>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    Traditional steps, lighted matka props, professional choreography guidance, and unforgettable cultural pride.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-8 border border-zinc-800/80 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:border-[#d4a017]/50 hover:shadow-[0_0_25px_rgba(212,160,23,0.15)] transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4a017]/10 flex items-center justify-center mb-6 text-[#d4a017] group-hover:scale-110 group-hover:bg-[#d4a017]/20 transition-all border border-[#d4a017]/30 shadow-[0_0_15px_rgba(212,160,23,0.2)]">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-amber-100 mb-3 group-hover:text-[#d4a017] transition-colors">108 Girls Jhijhiya</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Synchronized cultural folk dance by 108 girls with lighted earthen pots. Registration ₹149 includes choreography and props.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 border border-zinc-800/80 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:border-[#d4a017]/50 hover:shadow-[0_0_25px_rgba(212,160,23,0.15)] transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4a017]/10 flex items-center justify-center mb-6 text-[#d4a017] group-hover:scale-110 group-hover:bg-[#d4a017]/20 transition-all border border-[#d4a017]/30 shadow-[0_0_15px_rgba(212,160,23,0.2)]">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-amber-100 mb-3 group-hover:text-[#d4a017] transition-colors">Dandiya &amp; Garba Night</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              High-energy Garba circles and Dandiya beats. Single entry ₹249, Couple entry ₹399 with Dandiya sticks provided.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 border border-zinc-800/80 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:border-[#d4a017]/50 hover:shadow-[0_0_25px_rgba(212,160,23,0.15)] transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4a017]/10 flex items-center justify-center mb-6 text-[#d4a017] group-hover:scale-110 group-hover:bg-[#d4a017]/20 transition-all border border-[#d4a017]/30 shadow-[0_0_15px_rgba(212,160,23,0.2)]">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-amber-100 mb-3 group-hover:text-[#d4a017] transition-colors">DJ Night &amp; Contests</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Live Bollywood and folk DJ remixes, authentic festive chaat stalls, and awards for Best Dandiya Pair and Best Dressed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
