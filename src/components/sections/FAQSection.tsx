'use client';

import { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/config';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#120413] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Clarifications &amp; Help ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Everything you need to know about the 108 Girls Jhijhiya performance, passes, and venue rules.
          </p>
        </div>

        <div className="space-y-3">
          {EVENT_CONFIG.faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-lg border transition-colors overflow-hidden ${
                  isOpen
                    ? 'bg-[#1e071c] border-[#f5bd4e]/40'
                    : 'bg-[#180517] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <button
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-serif text-sm sm:text-base font-medium transition-colors ${isOpen ? 'text-[#f5bd4e]' : 'text-zinc-100'}`}>
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#f5bd4e] text-[#1f0618] rotate-180' : 'bg-white/[0.05] text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-zinc-800/80 mt-1">
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-3">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

