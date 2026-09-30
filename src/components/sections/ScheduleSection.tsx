import { EVENT_CONFIG } from '@/lib/config';
import { DoorOpen, Flame, Music, Sparkles, Star, Disc3, Trophy, Heart, Clock } from 'lucide-react';

export default function ScheduleSection() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'door':
        return <DoorOpen className="w-5 h-5 text-[#f5bd4e]" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'music':
        return <Music className="w-5 h-5 text-[#f5bd4e]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#f5bd4e]" />;
      case 'star':
        return <Star className="w-5 h-5 text-amber-300" />;
      case 'speaker':
        return <Disc3 className="w-5 h-5 text-purple-400" />;
      case 'trophy':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-400" />;
      default:
        return <Clock className="w-5 h-5 text-[#f5bd4e]" />;
    }
  };

  return (
    <section id="schedule" className="py-20 md:py-24 bg-gradient-to-b from-[#0F0A1A] to-[#140614] text-amber-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5bd4e]/10 border border-[#f5bd4e]/30 text-[#f5bd4e] text-xs font-mono uppercase tracking-widest mb-3">
            <span>✦</span> Timeline &amp; Performances <span>✦</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#f5bd4e] to-amber-300 mb-6 tracking-wide">
            Event Schedule
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        <div className="relative border-l-2 border-amber-400/25 md:border-none">
          {EVENT_CONFIG.schedule.map((item, index) => (
            <div key={index} className="mb-10 md:mb-16 relative flex flex-col md:flex-row md:items-center justify-between w-full pl-8 md:pl-0">
              {/* Central Glowing Dot */}
              <div className="absolute left-[-9px] md:left-1/2 md:-ml-2 top-2 md:top-1/2 md:-mt-2 w-4 h-4 rounded-full bg-[#f5bd4e] ring-4 ring-[#140614] shadow-[0_0_10px_rgba(245,189,78,0.8)] z-10"></div>
              
              {/* Desktop Connecting Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-[-64px] w-0.5 bg-gradient-to-b from-amber-400/30 via-amber-400/15 to-transparent -ml-px z-0"></div>

              {/* Time display */}
              <div className={`w-full md:w-[45%] text-left ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:order-last md:pl-12'} mb-2 md:mb-0`}>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#f5bd4e] tracking-tight">{item.time}</span>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pl-12' : 'md:text-right md:pr-12'}`}>
                <div className={`bg-[#200a1d]/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800/80 hover:border-[#f5bd4e]/40 transition-all duration-300 shadow-xl ${index % 2 === 0 ? 'md:rounded-tl-none' : 'md:rounded-tr-none'}`}>
                  <div className={`flex items-center gap-3 mb-2.5 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-[#f5bd4e]/15 border border-[#f5bd4e]/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(245,189,78,0.2)]">
                      {renderIcon(item.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-amber-50 font-serif">{item.title}</h3>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
