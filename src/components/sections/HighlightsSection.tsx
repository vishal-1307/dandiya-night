import { EVENT_CONFIG } from '@/lib/config';
import { Trophy, Crown, Disc3, Camera, UtensilsCrossed, Users, Sparkles } from 'lucide-react';

export default function HighlightsSection() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-6 h-6 text-[#f5bd4e]" />;
      case 'sparkles':
        return <Crown className="w-6 h-6 text-[#f5bd4e]" />;
      case 'speaker':
        return <Disc3 className="w-6 h-6 text-[#f5bd4e]" />;
      case 'camera':
        return <Camera className="w-6 h-6 text-[#f5bd4e]" />;
      case 'food':
        return <UtensilsCrossed className="w-6 h-6 text-[#f5bd4e]" />;
      case 'users':
        return <Users className="w-6 h-6 text-[#f5bd4e]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#f5bd4e]" />;
    }
  };

  return (
    <section id="highlights" className="py-20 md:py-24 bg-zinc-950 text-amber-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b1a3f]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5bd4e]/10 border border-[#f5bd4e]/30 text-[#f5bd4e] text-xs font-mono uppercase tracking-widest mb-3">
            <span>✦</span> Special Attractions <span>✦</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#f5bd4e] to-amber-300 mb-6 tracking-wide">
            Event Highlights
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {EVENT_CONFIG.highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl bg-gradient-to-b from-[#1b0a1a]/70 to-[#100410]/90 border border-zinc-800/80 hover:border-[#f5bd4e]/60 hover:shadow-[0_8px_30px_rgba(245,189,78,0.12)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f5bd4e]/15 border border-[#f5bd4e]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#f5bd4e]/25 transition-all duration-300 shadow-[0_0_12px_rgba(245,189,78,0.25)]">
                {renderIcon(highlight.icon)}
              </div>
              <h3 className="text-2xl font-serif text-amber-100 mb-3 group-hover:text-[#f5bd4e] transition-colors">
                {highlight.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
