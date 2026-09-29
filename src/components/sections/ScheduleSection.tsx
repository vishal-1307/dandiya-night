import { EVENT_CONFIG } from '@/lib/config';

export default function ScheduleSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'door':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />;
      case 'flame':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />;
      case 'music':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />;
      case 'sparkles':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />;
      case 'star':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />;
      case 'speaker':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 19h4l5 5V0L9 5H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
      case 'trophy':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />;
      case 'heart':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />;
      default:
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />;
    }
  };

  return (
    <section id="schedule" className="py-20 md:py-24 bg-zinc-900 text-amber-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-400 mb-6 tracking-wide">
            Event Schedule
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        <div className="relative border-l-2 border-amber-400/20 md:border-none">
          {EVENT_CONFIG.schedule.map((item, index) => (
            <div key={index} className="mb-10 md:mb-16 relative flex flex-col md:flex-row md:items-center justify-between w-full pl-8 md:pl-0">
              {/* Dot */}
              <div className="absolute left-[-9px] md:left-1/2 md:-ml-2 top-2 md:top-1/2 md:-mt-2 w-4 h-4 rounded-full bg-amber-400 ring-4 ring-zinc-900 z-10"></div>
              
              {/* Desktop Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-[-64px] w-0.5 bg-amber-400/20 -ml-px z-0"></div>

              {/* Time */}
              <div className={`w-full md:w-[45%] text-left ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:order-last md:pl-12'} mb-2 md:mb-0`}>
                <span className="text-2xl font-serif text-amber-400">{item.time}</span>
              </div>

              {/* Content */}
              <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pl-12' : 'md:text-right md:pr-12'}`}>
                <div className={`bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 hover:border-amber-400/30 transition-colors ${index % 2 === 0 ? 'md:rounded-tl-none' : 'md:rounded-tr-none'}`}>
                  <div className={`flex items-center gap-3 mb-3 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {getIcon(item.icon)}
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-amber-50">{item.title}</h3>
                  </div>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
