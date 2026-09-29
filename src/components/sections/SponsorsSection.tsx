import { EVENT_CONFIG } from '@/lib/config';
import Link from 'next/link';

export default function SponsorsSection() {
  if (EVENT_CONFIG.sponsors.length === 0) {
    return null;
  }

  return (
    <section id="sponsors" className="py-20 md:py-28 bg-[#0B0612] text-amber-50 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4a017]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-semibold uppercase tracking-widest mb-4">
            <span>🤝</span> Community Collaborators
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#d4a017] to-amber-300 mb-4 tracking-wide">
            Our Valued Partners
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mb-6">
            Proudly supported by leading organizations and cultural patrons committed to keeping the spirit of Navratri alive.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent mx-auto"></div>
        </div>

        {/* Sponsor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {EVENT_CONFIG.sponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-zinc-900/80 via-zinc-900/50 to-zinc-950 border border-zinc-800 hover:border-[#d4a017]/60 hover:shadow-[0_0_30px_rgba(212,160,23,0.18)] transition-all duration-300 group"
            >
              {/* Partner Logo / Insignia */}
              <div className="w-20 h-20 rounded-2xl bg-black/40 border border-[#d4a017]/30 flex items-center justify-center p-3 mb-5 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="w-full h-full object-contain drop-shadow-[0_0_6px_rgba(212,160,23,0.4)]" 
                />
              </div>

              {/* Tier Badge */}
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-amber-300 bg-[#d4a017]/15 border border-[#d4a017]/30 mb-3">
                {sponsor.tier}
              </span>

              {/* Partner Name */}
              <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-[#d4a017] transition-colors">
                {sponsor.name}
              </h3>

              {/* Tagline / Category */}
              {'category' in sponsor && (
                <p className="text-xs text-zinc-400 font-medium">
                  {sponsor.category}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Sponsorship Inquiry Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#3f0919] via-[#240316] to-[#12021c] border border-[#d4a017]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="text-xl font-serif font-bold text-amber-200 mb-1">
              Become an Event Sponsor
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg">
              Showcase your brand to 500+ attendees and thousands on social media during Madhubani&apos;s biggest festive night.
            </p>
          </div>
          <div className="flex gap-4">
            <a 
              href={EVENT_CONFIG.social.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-[#d4a017] to-[#eac563] text-[#4a0a1f] font-bold text-sm rounded-full shadow-lg hover:brightness-110 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>💬</span> Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

