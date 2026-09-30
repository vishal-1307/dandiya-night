import { EVENT_CONFIG } from '@/lib/config';
import { Trophy, Crown, Disc3, Camera, UtensilsCrossed, Users, Sparkles } from 'lucide-react';

export default function HighlightsSection() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-5 h-5 text-[#f5bd4e]" />;
      case 'sparkles':
        return <Crown className="w-5 h-5 text-[#f5bd4e]" />;
      case 'speaker':
        return <Disc3 className="w-5 h-5 text-[#f5bd4e]" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-[#f5bd4e]" />;
      case 'food':
        return <UtensilsCrossed className="w-5 h-5 text-[#f5bd4e]" />;
      case 'users':
        return <Users className="w-5 h-5 text-[#f5bd4e]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#f5bd4e]" />;
    }
  };

  return (
    <section id="highlights" className="py-14 sm:py-20 bg-[#0e030e] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Special Attractions ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Event Highlights &amp; Awards
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Trophies for Best Dandiya Pair, traditional ethnic attire recognitions, and high-energy music.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {EVENT_CONFIG.highlights.map((highlight, index) => (
            <div
              key={index}
              className="rounded-lg p-5 sm:p-6 bg-[#160517] border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded bg-[#20071e] border border-[#f5bd4e]/20 flex items-center justify-center mb-4 text-[#f5bd4e]">
                  {renderIcon(highlight.icon)}
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#fcf4e5] mb-1.5">
                  {highlight.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

