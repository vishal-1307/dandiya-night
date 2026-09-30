import { EVENT_CONFIG } from '@/lib/config';

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="py-14 sm:py-20 bg-[#100411] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Fest Highlights ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Festival Experiences
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            From the divine grace of 108 illuminated Jhijhiya earthen pots to high-energy Dandiya Raas and live folk rhythms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {EVENT_CONFIG.experiences.map((exp, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg p-6 sm:p-7 min-h-[360px] sm:min-h-[400px] flex flex-col justify-end group border border-zinc-800 bg-zinc-900"
            >
              {/* Card Photo Background */}
              {exp.image && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${exp.image}')` }}
                />
              )}
              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30" />

              <div className="relative z-10">
                <span className="inline-block px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[#f5bd4e] border border-[#f5bd4e]/30 text-[10px] font-mono uppercase font-bold tracking-wider mb-2.5">
                  {exp.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#fcf4e5] mb-2 leading-tight">
                  {exp.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

