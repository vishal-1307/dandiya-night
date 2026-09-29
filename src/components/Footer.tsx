import Link from 'next/link';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Ticket, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  Lock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#110410] via-[#1c0618] to-[#2a0924] text-[#fcf4e5] pt-16 pb-28 md:pb-12 border-t border-[#f5bd4e]/20 overflow-hidden">
      {/* Decorative Mithila Border Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5bd4e] to-transparent opacity-80" />
      
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 left-1/4 w-80 h-80 bg-[#8b1a3f]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-[#f5bd4e]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand & Event Overview */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <img 
                src="/images/logo.svg" 
                alt="Mithila Dandiya Logo" 
                className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(245,189,78,0.5)] group-hover:rotate-12 transition-transform duration-300" 
              />
              <div>
                <h3 className="font-serif text-xl font-bold text-[#fcf4e5] group-hover:text-[#f5bd4e] transition-colors leading-tight">
                  {EVENT_CONFIG.name}
                </h3>
                <span className="text-[10px] uppercase font-mono text-[#f5bd4e] tracking-widest block">
                  {EVENT_CONFIG.city}, {EVENT_CONFIG.state}
                </span>
              </div>
            </Link>

            <p className="text-zinc-300 text-sm leading-relaxed max-w-sm">
              Madhubani&apos;s signature cultural celebration of Navratri with traditional Garba circles, authentic Dandiya beats, live DJ music, and delicious festive food.
            </p>

            {/* Quick Event Summary Pills */}
            <div className="space-y-2 pt-1 text-xs text-zinc-300 font-mono">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#f5bd4e] flex-shrink-0" />
                <span>15 October 2026 • 5:00 PM Onwards</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f5bd4e] flex-shrink-0" />
                <span>Town Club Ground, Madhubani</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href={EVENT_CONFIG.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-[#2b0c26] border border-[#f5bd4e]/30 flex items-center justify-center text-[#f5bd4e] hover:bg-[#f5bd4e] hover:text-[#38112f] transition-all transform hover:scale-105 shadow-md" 
                title="Instagram"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href={`https://wa.me/${EVENT_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-[#2b0c26] border border-[#f5bd4e]/30 flex items-center justify-center text-[#f5bd4e] hover:bg-[#f5bd4e] hover:text-[#38112f] transition-all transform hover:scale-105 shadow-md" 
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${EVENT_CONFIG.social.email}`} 
                className="w-10 h-10 rounded-xl bg-[#2b0c26] border border-[#f5bd4e]/30 flex items-center justify-center text-[#f5bd4e] hover:bg-[#f5bd4e] hover:text-[#38112f] transition-all transform hover:scale-105 shadow-md" 
                title="Email"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-[#f5bd4e] font-mono text-xs font-semibold pt-1 tracking-wider">
              {EVENT_CONFIG.social.hashtag}
            </p>
          </div>

          {/* Event Quick Links */}
          <div>
            <h4 className="font-serif text-[#fcf4e5] font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f5bd4e]" />
              <span>Event Details</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#about" className="text-zinc-300 hover:text-[#f5bd4e] transition-colors flex items-center gap-2">
                  <span className="text-[#f5bd4e]/60 text-xs">✦</span>
                  <span>About the Festival</span>
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="text-zinc-300 hover:text-[#f5bd4e] transition-colors flex items-center gap-2">
                  <span className="text-[#f5bd4e]/60 text-xs">✦</span>
                  <span>Night Experiences</span>
                </Link>
              </li>
              <li>
                <Link href="/#schedule" className="text-zinc-300 hover:text-[#f5bd4e] transition-colors flex items-center gap-2">
                  <span className="text-[#f5bd4e]/60 text-xs">✦</span>
                  <span>Schedule &amp; Flow</span>
                </Link>
              </li>
              <li>
                <Link href="/#highlights" className="text-zinc-300 hover:text-[#f5bd4e] transition-colors flex items-center gap-2">
                  <span className="text-[#f5bd4e]/60 text-xs">✦</span>
                  <span>Attractions &amp; Prizes</span>
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-zinc-300 hover:text-[#f5bd4e] transition-colors flex items-center gap-2">
                  <span className="text-[#f5bd4e]/60 text-xs">✦</span>
                  <span>Festival Gallery</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Passes & Attendees */}
          <div>
            <h4 className="font-serif text-[#fcf4e5] font-bold text-lg mb-4 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#f5bd4e]" />
              <span>Passes &amp; Attend</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  href="/register" 
                  className="text-[#f5bd4e] font-semibold hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Register &amp; Book Spot</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/my-pass" 
                  className="text-amber-300 font-mono text-xs font-semibold hover:text-amber-100 transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5bd4e]/15 border border-[#f5bd4e]/30 mt-1"
                >
                  <Ticket className="w-3 h-3" />
                  <span>Retrieve My Digital Pass</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/#venue" className="text-zinc-300 hover:text-[#f5bd4e] transition-colors flex items-center gap-2">
                  <span className="text-[#f5bd4e]/60 text-xs">✦</span>
                  <span>Venue, Map &amp; Parking</span>
                </Link>
              </li>
              <li>
                <Link href="/#rules" className="text-zinc-300 hover:text-[#f5bd4e] transition-colors flex items-center gap-2">
                  <span className="text-[#f5bd4e]/60 text-xs">✦</span>
                  <span>Dress Code &amp; Guidelines</span>
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-zinc-300 hover:text-[#f5bd4e] transition-colors flex items-center gap-2">
                  <span className="text-[#f5bd4e]/60 text-xs">✦</span>
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Helpline Card */}
          <div>
            <h4 className="font-serif text-[#fcf4e5] font-bold text-lg mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#f5bd4e]" />
              <span>Organizer Support</span>
            </h4>
            
            <div className="p-4 rounded-2xl bg-[#230c21]/90 border border-zinc-800 text-xs space-y-3">
              <div>
                <span className="text-zinc-400 block font-mono uppercase text-[10px] tracking-wider mb-1">Helpline Phone</span>
                <a href={`tel:${EVENT_CONFIG.contact.phone}`} className="text-[#fcf4e5] hover:text-[#f5bd4e] font-mono font-bold text-sm transition-colors">
                  {EVENT_CONFIG.contact.phone}
                </a>
              </div>

              <div>
                <span className="text-zinc-400 block font-mono uppercase text-[10px] tracking-wider mb-1">Official WhatsApp</span>
                <a 
                  href={`https://wa.me/${EVENT_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-400 hover:text-emerald-300 font-mono font-bold transition-colors"
                >
                  {EVENT_CONFIG.contact.whatsapp}
                </a>
              </div>

              <div>
                <span className="text-zinc-400 block font-mono uppercase text-[10px] tracking-wider mb-1">Support Email</span>
                <a href={`mailto:${EVENT_CONFIG.contact.email}`} className="text-zinc-300 hover:text-[#f5bd4e] transition-colors break-all">
                  {EVENT_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Admin Link */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
          <p>
            © {new Date().getFullYear()} {EVENT_CONFIG.organizer.name}. Dedicated to Mithila Cultural Heritage.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono">
            <Link href="/#rules" className="hover:text-[#f5bd4e] transition-colors">
              Rules &amp; Safety
            </Link>
            <Link href="/#faq" className="hover:text-[#f5bd4e] transition-colors">
              FAQ
            </Link>
            <Link href="/#contact" className="hover:text-[#f5bd4e] transition-colors">
              Help Desk
            </Link>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-[#f5bd4e] transition-colors border border-zinc-700/60 rounded-lg px-2.5 py-1 bg-black/40"
              title="Event Organizer Admin Portal"
            >
              <Lock className="w-3 h-3 text-[#f5bd4e]" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
