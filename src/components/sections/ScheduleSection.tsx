import { EVENT_CONFIG } from '@/lib/config';
import { DoorOpen, Flame, Music, Sparkles, Star, Disc3, Trophy, Heart, Clock } from 'lucide-react';

export default function ScheduleSection() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'door':
        return <DoorOpen className="w-4 h-4 text-[#f5bd4e]" />;
      case 'flame':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'music':
        return <Music className="w-4 h-4 text-[#f5bd4e]" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-[#f5bd4e]" />;
      case 'star':
        return <Star className="w-4 h-4 text-amber-300" />;
      case 'speaker':
        return <Disc3 className="w-4 h-4 text-purple-400" />;
      case 'trophy':
        return <Trophy className="w-4 h-4 text-yellow-400" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-rose-400" />;
      default:
        return <Clock className="w-4 h-4 text-[#f5bd4e]" />;
    }
  };

  return (
    <section id="schedule" className="py-14 sm:py-20 bg-[#120412] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Event Timeline ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Programme Schedule
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Sunday, 18 October 2026 • Gates open at 5:00 PM onwards in Jhanjharpur
          </p>
        </div>

        {/* Clean chronological timeline: Left time, right details */}
        <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-800">
          {EVENT_CONFIG.schedule.map((item, index) => {
            const isHighlight = item.title.includes('Jhijhiya');

            return (
              <div key={index} className="relative group">
                {/* Node bullet dot */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-3.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center -translate-x-1/2 transition-colors ${
                    isHighlight
                      ? 'bg-[#f5bd4e] border-[#f5bd4e] text-[#1f0618]'
                      : 'bg-[#1e071c] border-zinc-700 text-[#f5bd4e] group-hover:border-[#f5bd4e]'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isHighlight ? 'bg-[#1f0618]' : 'bg-[#f5bd4e]'}`} />
                </div>

                {/* Content Card with 8px radius */}
                <div
                  className={`rounded-lg p-5 sm:p-6 border transition-colors ${
                    isHighlight
                      ? 'bg-[#22071f] border-[#f5bd4e]/50 ring-1 ring-[#f5bd4e]/20'
                      : 'bg-[#180517] border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0">
                        {renderIcon(item.icon)}
                      </div>
                      <h3 className={`font-serif text-base sm:text-lg font-bold ${isHighlight ? 'text-[#fcf4e5]' : 'text-[#fcf4e5]'}`}>
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#f5bd4e] bg-[#f5bd4e]/10 px-2.5 py-0.5 rounded border border-[#f5bd4e]/20 self-start sm:self-auto">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-9 sm:pl-9">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

