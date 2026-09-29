import { EVENT_CONFIG } from '@/lib/config';

export default function RulesSection() {
  return (
    <section id="rules" className="py-20 md:py-24 bg-zinc-950 text-amber-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-400 mb-6 tracking-wide">
            Event Rules & Guidelines
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            To ensure a safe and enjoyable experience for everyone, please adhere to the following guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CONFIG.rules.map((ruleBlock, index) => (
            <div key={index} className="bg-rose-950/20 border border-rose-900/30 rounded-2xl p-6 md:p-8 hover:bg-rose-950/30 transition-colors">
              <h3 className="text-2xl font-serif text-rose-200 mb-4 pb-4 border-b border-rose-900/50">
                {ruleBlock.category}
              </h3>
              <ul className="space-y-3">
                {ruleBlock.items.map((item, i) => (
                  <li key={i} className="flex items-start text-zinc-300">
                    <span className="text-rose-400 mr-3 mt-1.5 leading-none">•</span>
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
