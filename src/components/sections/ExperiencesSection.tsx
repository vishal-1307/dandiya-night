import { EVENT_CONFIG } from '@/lib/config';

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="py-20 md:py-24 bg-zinc-950 text-amber-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-400 mb-6 tracking-wide">
            The Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EVENT_CONFIG.experiences.map((exp, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-3xl p-8 md:p-10 min-h-[460px] flex flex-col justify-end group transition-all duration-500 hover:scale-[1.02] border border-[#d4a017]/25 shadow-2xl"
            >
              {/* Card Photo Background */}
              {exp.image && (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${exp.image}')` }}
                />
              )}
              {/* Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/35 group-hover:from-black/90 group-hover:via-black/55 transition-colors duration-500" />
              
              <div className="relative z-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#d4a017]/25 backdrop-blur-md text-[#d4a017] border border-[#d4a017]/40 text-xs font-semibold tracking-wider uppercase mb-3">
                  {exp.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#FFF8F0] mb-3 leading-tight group-hover:text-amber-200 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-zinc-200 leading-relaxed text-sm md:text-base">
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
