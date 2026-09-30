import { EVENT_CONFIG } from '@/lib/config';
import { Shirt, Ticket, ShieldCheck, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function RulesSection() {
  const getRuleIcon = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes('dress') || c.includes('attire')) return <Shirt className="w-4 h-4 text-[#f5bd4e]" />;
    if (c.includes('entry') || c.includes('pass') || c.includes('ticket')) return <Ticket className="w-4 h-4 text-[#f5bd4e]" />;
    if (c.includes('safety') || c.includes('security')) return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
    return <CheckCircle2 className="w-4 h-4 text-[#f5bd4e]" />;
  };

  return (
    <section id="rules" className="py-14 sm:py-20 bg-[#120413] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Guidelines &amp; Policies ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Event Standards &amp; Guidelines
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            To ensure a safe, disciplined, and family-friendly experience for all participants and visitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EVENT_CONFIG.rules.map((ruleBlock, index) => (
            <div
              key={index}
              className="rounded-lg p-5 sm:p-6 bg-[#180517] border border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-800/80">
                  <div className="w-8 h-8 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0">
                    {getRuleIcon(ruleBlock.category)}
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#fcf4e5] leading-tight">
                    {ruleBlock.category}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {ruleBlock.items.map((item, i) => (
                    <li key={i} className="flex items-start text-zinc-300 text-xs sm:text-xs leading-relaxed">
                      <span className="text-[#f5bd4e] mr-2 mt-0.5 leading-none font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

