import React from 'react';
import Link from 'next/link';
import { Sparkles, User, HeartHandshake, ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function PassOptionsSection() {
  const tiers = [
    {
      id: 'jhijhiya',
      name: '108 Girls Jhijhiya',
      audience: 'School & College Girls',
      price: '₹149',
      unit: 'per participant',
      icon: Sparkles,
      badge: 'Historic Folk',
      inclusions: [
        'Academy Dance Choreography',
        'Jhijhiya / Matka Prop Included',
        'Stage Practice & Guidance',
      ],
      note: 'Costume & makeup to be arranged by participant',
      href: '/register',
    },
    {
      id: 'single',
      name: 'Dandiya Night Single',
      audience: 'Single Attendee Entry',
      price: '₹249',
      unit: 'per person',
      icon: User,
      badge: 'Open Dance Floor',
      inclusions: [
        'Full Evening Festival Access',
        'Pair of Dandiya Sticks Included',
        'DJ Floor, Live Dhol & Food Stalls',
      ],
      note: 'Entry gate opens at 5:00 PM',
      href: '/register',
    },
    {
      id: 'couple',
      name: 'Dandiya Night Couple',
      audience: 'Entry for 2 Persons',
      price: '₹399',
      unit: 'per couple',
      icon: HeartHandshake,
      badge: 'Couple Pass',
      inclusions: [
        'Fast-Track Entry for Two',
        '2 Pairs of Dandiya Sticks Included',
        'Best Traditional Couple Contest',
      ],
      note: 'Eligible for grand couple awards',
      href: '/register',
    },
  ];

  return (
    <section id="passes" className="py-14 sm:py-20 bg-[#160515] border-b border-zinc-800/80 text-[#FFF8F0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Registration &amp; Passes ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Choose Your Experience
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Select your category to reserve your official Pass ID with instant WhatsApp verification.
          </p>
        </div>

        {/* 3 Compact, Comparable Cards (8px radius, no artificial hover scale) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isFeatured = tier.id === 'jhijhiya';

            return (
              <div
                key={tier.id}
                className={`bg-[#1e071c] rounded-lg p-6 sm:p-7 flex flex-col justify-between border transition-colors ${
                  isFeatured 
                    ? 'border-[#f5bd4e]/70 shadow-md ring-1 ring-[#f5bd4e]/30' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/[0.06] text-[#f5bd4e] font-bold border border-[#f5bd4e]/20">
                      {tier.badge}
                    </span>
                    <Icon className="w-4 h-4 text-[#f5bd4e]/80" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#fcf4e5] mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4">{tier.audience}</p>

                  <div className="py-3 border-y border-zinc-800/80 mb-5">
                    <div className="text-3xl font-mono font-extrabold text-[#f5bd4e]">
                      {tier.price}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {tier.unit}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-zinc-200 mb-6">
                    {tier.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#f5bd4e] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] text-zinc-400 mb-3 italic">
                    {tier.note}
                  </p>
                  <Button
                    href={tier.href}
                    variant={isFeatured ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full justify-center"
                  >
                    <span>Reserve Pass</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/my-pass"
            className="text-xs font-mono text-[#f5bd4e] hover:underline inline-flex items-center gap-1.5"
          >
            <span>Already registered? Retrieve your digital pass with mobile number</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
