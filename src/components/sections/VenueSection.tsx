import { EVENT_CONFIG } from '@/lib/config';

export default function VenueSection() {
  const { venue } = EVENT_CONFIG;

  return (
    <section id="venue" className="py-20 md:py-24 bg-zinc-900 text-amber-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-400 mb-6 tracking-wide">
            Venue Details
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800">
          <div className="lg:w-1/2 p-8 md:p-12">
            <h3 className="text-3xl font-serif text-amber-400 mb-2">{venue.name}</h3>
            <p className="text-zinc-400 text-lg mb-8">{venue.address}</p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-amber-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-amber-100 font-medium">Timings</h4>
                  <p className="text-zinc-400">{EVENT_CONFIG.doorsOpen} - Doors Open</p>
                  <p className="text-zinc-400">{EVENT_CONFIG.timeDisplay} - Event Duration</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 text-amber-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-amber-100 font-medium">Entry & Parking</h4>
                  <p className="text-zinc-400">{venue.entryGate}</p>
                  <p className="text-zinc-400">{venue.parking}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 text-amber-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-amber-100 font-medium">Nearby Landmarks</h4>
                  <ul className="text-zinc-400 list-disc list-inside">
                    {venue.landmarks.map((landmark, idx) => (
                      <li key={idx}>{landmark}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a 
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 min-h-[400px]">
            <iframe 
              src={venue.mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[400px]"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
