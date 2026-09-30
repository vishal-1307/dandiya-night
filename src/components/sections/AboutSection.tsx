import { EVENT_CONFIG } from '@/lib/config';
import { Sparkles, ArrowRight, ShieldCheck, School } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#140412] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Real Photographic Proof */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden border border-[#f5bd4e]/40 shadow-xl bg-[#1e071c]">
              <img 
                src="/images/about-culture.jpg" 
                alt="108 Girls Jhijhiya Performance Jhanjharpur" 
                className="w-full h-[400px] sm:h-[480px] object-cover object-center" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono">
                <span className="inline-block px-2.5 py-1 rounded bg-black/60 text-[#f5bd4e] border border-[#f5bd4e]/30 font-bold mb-1">
                  Mithila Heritage
                </span>
                <p className="text-white font-medium text-sm font-serif">
                  108 Girls Sacred Matka Presentation
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial & Cultural Context */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.05] border border-[#f5bd4e]/30 text-[#f5bd4e] text-xs font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cultural Heart of the Fest</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#fcf4e5] leading-tight">
              The 108 Girls Jhijhiya Story
            </h2>

            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
              Jhijhiya is Mithila&apos;s sacred folk dance performed during Navratri to invoke divine protection and celebrate communal harmony. Women dance in synchrony carrying lighted earthen pots (<em className="text-[#f5bd4e]">matkas</em>) balanced on their heads.
            </p>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              This festival brings together <strong className="text-white">108 school and college girls</strong> from Jhanjharpur and Madhubani district for a landmark synchronized performance on the grand stage, followed by an open-ground Dandiya Raas celebration.
            </p>

            {/* Inclusions and Organizer Assurance */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#1e071c] border border-zinc-800">
                <span className="text-[#f5bd4e] font-bold block mb-0.5">₹149 / Girl</span>
                <span className="text-zinc-300 text-[11px]">Includes choreography &amp; matka prop</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1e071c] border border-zinc-800">
                <span className="text-[#f5bd4e] font-bold block mb-0.5">Guidance</span>
                <span className="text-zinc-300 text-[11px]">Academy practice &amp; certificate</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1e071c] border border-zinc-800">
                <span className="text-[#f5bd4e] font-bold block mb-0.5">Eligibility</span>
                <span className="text-zinc-300 text-[11px]">School &amp; College Students</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1e071c] border border-zinc-800">
                <span className="text-[#f5bd4e] font-bold block mb-0.5">Costume Note</span>
                <span className="text-zinc-300 text-[11px]">Arranged by participant</span>
              </div>
            </div>

            {/* Organizer Credibility */}
            <div className="flex items-center gap-3.5 pt-3 p-3.5 rounded-lg bg-[#1a0618] border border-zinc-800">
              <img 
                src="/images/jhanjharpur-logo.jpg" 
                alt="Academy Crest" 
                className="w-12 h-12 rounded-full object-cover border border-[#f5bd4e]/40 flex-shrink-0" 
              />
              <div className="text-xs">
                <span className="text-zinc-400 font-mono text-[10px] uppercase block">Led &amp; Choreographed By</span>
                <h4 className="font-serif font-bold text-white text-sm">
                  {EVENT_CONFIG.organizer.name}
                </h4>
                <p className="text-zinc-300 text-[11px]">
                  In collaboration with {EVENT_CONFIG.organizer.collab}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button href="/register" variant="primary" size="md">
                <span>Register for 108 Girls Jhijhiya</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
