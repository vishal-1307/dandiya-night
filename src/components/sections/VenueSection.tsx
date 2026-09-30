import { EVENT_CONFIG } from '@/lib/config';
import { Clock, Car, MapPin, Compass, ArrowUpRight } from 'lucide-react';

export default function VenueSection() {
  const { venue } = EVENT_CONFIG;

  return (
    <section id="venue" className="py-20 md:py-24 bg-[#0A0512] text-amber-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5bd4e]/10 border border-[#f5bd4e]/30 text-[#f5bd4e] text-xs font-mono uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" /> Venue &amp; Directions
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#f5bd4e] to-amber-300 mb-6 tracking-wide">
            Location &amp; Access
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-[#180816]/90 rounded-3xl overflow-hidden border border-[#d4a017]/30 shadow-2xl backdrop-blur-sm">
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#f5bd4e] font-mono font-bold block mb-1">
                Official Venue
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#fcf4e5] mb-2">{venue.name}</h3>
              <p className="text-zinc-300 text-base mb-8 flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#f5bd4e] flex-shrink-0 mt-0.5" />
                <span>{venue.address}</span>
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f5bd4e]/10 border border-[#f5bd4e]/25 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-amber-100 font-semibold">Event Timings</h4>
                    <p className="text-zinc-300 text-sm">{EVENT_CONFIG.doorsOpen} - Gates Open &amp; Dandiya Distribution</p>
                    <p className="text-zinc-400 text-sm">{EVENT_CONFIG.timeDisplay} - Non-Stop Dandiya &amp; Garba</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f5bd4e]/10 border border-[#f5bd4e]/25 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-amber-100 font-semibold">Entry &amp; Parking</h4>
                    <p className="text-zinc-300 text-sm">{venue.entryGate}</p>
                    <p className="text-zinc-400 text-sm">{venue.parking}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f5bd4e]/10 border border-[#f5bd4e]/25 flex items-center justify-center text-[#f5bd4e] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-amber-100 font-semibold">Key Landmarks</h4>
                    <ul className="text-zinc-400 text-sm list-disc list-inside mt-1 space-y-0.5">
                      {venue.landmarks.map((landmark, idx) => (
                        <li key={idx}>{landmark}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-800">
              <a 
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#f5bd4e] text-[#38112f] font-bold hover:brightness-110 shadow-[0_4px_15px_rgba(245,189,78,0.3)] transition-all transform hover:scale-[1.02]"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 min-h-[420px] relative">
            <iframe 
              src={venue.mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '420px' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Event Venue Location Map"
              className="w-full h-full grayscale-[25%] contrast-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
