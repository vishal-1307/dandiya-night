import { EVENT_CONFIG } from '@/lib/config';
import { Clock, Car, MapPin, Compass, ArrowUpRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function VenueSection() {
  const { venue } = EVENT_CONFIG;

  return (
    <section id="venue" className="py-14 sm:py-20 bg-[#0c030d] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Location &amp; Access ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Venue &amp; Directions
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Conveniently situated in Jhanjharpur with verified entry gates and secure vehicle parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-hidden border border-zinc-800 bg-[#160517]">
          {/* Left Venue Details */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/[0.06] text-[#f5bd4e] font-bold border border-[#f5bd4e]/20 mb-3">
                Official Location
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcf4e5] mb-2">
                {venue.name}
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm mb-6 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f5bd4e] flex-shrink-0 mt-0.5" />
                <span>{venue.address}</span>
              </p>

              <div className="space-y-4 border-t border-zinc-800/80 pt-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Timings</h4>
                    <p className="text-xs sm:text-sm text-zinc-200 mt-0.5">{EVENT_CONFIG.doorsOpen} - Gates Open &amp; Sticks Pickup</p>
                    <p className="text-xs text-zinc-400">{EVENT_CONFIG.timeDisplay} - Jhijhiya Folk Showcase &amp; Open Dandiya</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Entry &amp; Parking</h4>
                    <p className="text-xs sm:text-sm text-zinc-200 mt-0.5">{venue.entryGate}</p>
                    <p className="text-xs text-zinc-400">{venue.parking}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Nearby Landmarks</h4>
                    <ul className="text-xs text-zinc-300 list-disc list-inside mt-1 space-y-0.5">
                      {venue.landmarks.map((landmark, idx) => (
                        <li key={idx}>{landmark}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-zinc-800/80">
              <Button
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                <span>Get Directions in Google Maps</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Right Map */}
          <div className="min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] border-t lg:border-t-0 lg:border-l border-zinc-800 bg-[#0f0310]">
            <iframe
              src={venue.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Event Venue Location Map"
              className="w-full h-full grayscale-[30%] contrast-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

