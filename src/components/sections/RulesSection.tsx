import { EVENT_CONFIG } from '@/lib/config';
import { Shirt, Ticket, ShieldCheck, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function RulesSection() {
  const getRuleIcon = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes('dress') || c.includes('attire')) return <Shirt className="w-5 h-5 text-[#f5bd4e]" />;
    if (c.includes('entry') || c.includes('pass') || c.includes('ticket')) return <Ticket className="w-5 h-5 text-[#f5bd4e]" />;
    if (c.includes('safety') || c.includes('security')) return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    return <CheckCircle2 className="w-5 h-5 text-[#f5bd4e]" />;
  };

  return (
    <section id="rules" className="py-20 md:py-24 bg-[#0F0A1A] text-amber-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5bd4e]/10 border border-[#f5bd4e]/30 text-[#f5bd4e] text-xs font-mono uppercase tracking-widest mb-3">
            <ShieldAlert className="w-3.5 h-3.5" /> Guidelines &amp; Policies
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#f5bd4e] to-amber-300 mb-6 tracking-wide">
            Event Rules &amp; Guidelines
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
            To ensure a safe, joyful, and family-friendly experience for everyone, please adhere to these event standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CONFIG.rules.map((ruleBlock, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-b from-[#1f0b1d]/80 to-[#140614]/90 border border-[#8b1a3f]/40 rounded-2xl p-6 md:p-8 hover:border-[#f5bd4e]/50 hover:shadow-[0_4px_25px_rgba(245,189,78,0.1)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#8b1a3f]/40">
                <div className="w-10 h-10 rounded-xl bg-[#f5bd4e]/10 border border-[#f5bd4e]/20 flex items-center justify-center flex-shrink-0">
                  {getRuleIcon(ruleBlock.category)}
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-100">
                  {ruleBlock.category}
                </h3>
              </div>
              <ul className="space-y-3.5">
                {ruleBlock.items.map((item, i) => (
                  <li key={i} className="flex items-start text-zinc-300 text-sm">
                    <span className="text-[#f5bd4e] mr-2.5 mt-0.5 leading-none font-bold">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
