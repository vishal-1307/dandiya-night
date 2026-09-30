import { EVENT_CONFIG } from '@/lib/config';
import { Handshake, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SponsorsSection() {
  if (EVENT_CONFIG.sponsors.length === 0) {
    return null;
  }

  // Get initials for partner badge
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section id="sponsors" className="py-14 sm:py-20 bg-[#0e0410] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Community &amp; Collaborations ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Event Partners &amp; Supporters
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Organized in dedicated partnership with Mithila cultural groups and regional creative forums.
          </p>
        </div>

        {/* Sponsor Cards Grid: 8px radius, distinguished text & initials treatment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {EVENT_CONFIG.sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="rounded-lg p-5 sm:p-6 bg-[#160517] border border-zinc-800 flex items-start gap-4 transition-colors hover:border-zinc-700"
            >
              {/* Partner Monogram */}
              <div className="w-12 h-12 rounded bg-[#20071e] border border-[#f5bd4e]/20 flex items-center justify-center font-mono font-bold text-sm text-[#f5bd4e] flex-shrink-0">
                {getInitials(sponsor.name)}
              </div>

              {/* Partner Details */}
              <div className="min-w-0 flex-1">
                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-[#f5bd4e] font-bold mb-1">
                  {sponsor.tier}
                </span>
                <h3 className="font-serif text-base font-bold text-[#fcf4e5] leading-snug">
                  {sponsor.name}
                </h3>
                {'category' in sponsor && (
                  <p className="text-xs text-zinc-400 mt-1">
                    {sponsor.category}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sponsorship Inquiry Strip */}
        <div className="rounded-lg bg-[#180519] border border-zinc-800/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
              <Handshake className="w-4 h-4 text-[#f5bd4e]" />
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#fcf4e5]">
                Support Regional Folk Culture &amp; Girls Empowerment
              </h4>
            </div>
            <p className="text-xs text-zinc-400 text-center sm:text-left">
              Become a community patron or sponsor for the 108 Girls Jhijhiya Performance.
            </p>
          </div>
          <Button
            href={`https://wa.me/${EVENT_CONFIG.payment.whatsappNumber}?text=${encodeURIComponent('Namaste! I would like to inquire regarding sponsorship/partnership for Jhanjharpur Jhijhiya & Dandiya Fest 2026.')}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="flex-shrink-0 w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            <span>Inquire for Sponsorship</span>
          </Button>
        </div>
      </div>
    </section>
  );
}


