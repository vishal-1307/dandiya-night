import Link from 'next/link';
import { EVENT_CONFIG } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0F0A1A] to-[#630f2c] pt-16 pb-8 overflow-hidden">
      <div className="mithila-border-top absolute top-0 left-0 w-full h-1" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.svg" 
                alt="Mithila Dandiya Logo" 
                className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(212,160,23,0.5)]" 
              />
              <h3 className="font-playfair text-xl font-bold text-[#d4a017]">
                {EVENT_CONFIG.name}
              </h3>
            </div>
            <p className="text-[#FFF8F0]/70 text-sm leading-relaxed max-w-xs">
              {EVENT_CONFIG.description}
            </p>
            <div className="flex gap-4 pt-2">
              <a href={EVENT_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#FFF8F0]/70 hover:text-[#d4a017] transition-colors" title="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href={EVENT_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#FFF8F0]/70 hover:text-[#d4a017] transition-colors" title="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.954 0H11.95C5.352 0 0 5.351 0 11.951c0 2.127.556 4.195 1.614 6.012L.152 24l6.195-1.625c1.745.962 3.738 1.47 5.794 1.471h.004c6.598 0 11.951-5.352 11.951-11.95C24.095 5.352 18.749 0 11.954 0zm0 21.674h-.002c-1.8 0-3.565-.483-5.111-1.401l-.367-.217-3.801.996.996-3.701-.237-.378C2.395 15.342 1.852 13.684 1.852 11.951 1.852 6.376 6.377 1.85 11.95 1.85c5.574 0 10.1 4.526 10.1 10.101 0 5.574-4.526 10.1-10.1 10.1zm5.556-7.574c-.305-.153-1.802-.89-2.083-.992-.281-.102-.485-.153-.69.153-.204.305-.788.992-.967 1.196-.179.204-.358.229-.663.076-1.554-.775-2.73-1.644-3.791-3.447-.18-.305.18-.284.478-.881.089-.178.045-.333-.031-.486-.076-.153-.69-1.666-.946-2.28-.249-.602-.503-.52-.69-.529-.178-.009-.382-.012-.587-.012-.204 0-.535.076-.815.382-.281.305-1.07 1.045-1.07 2.545s1.096 2.954 1.249 3.158c.153.204 2.155 3.287 5.222 4.611 2.052.888 2.871.958 3.993.803 1.258-.174 3.792-1.549 4.328-3.045.535-1.496.535-2.778.375-3.045-.153-.268-.56-.426-.865-.58z"/>
                </svg>
              </a>
              <a href={`mailto:${EVENT_CONFIG.social.email}`} className="text-[#FFF8F0]/70 hover:text-[#d4a017] transition-colors" title="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
            <p className="text-[#d4a017] font-semibold text-sm pt-1">{EVENT_CONFIG.social.hashtag}</p>
          </div>

          {/* Event Links */}
          <div>
            <h4 className="font-playfair text-[#FFF8F0] font-semibold text-lg mb-4">Event</h4>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">About the Festival</Link></li>
              <li><Link href="#experiences" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">Experiences</Link></li>
              <li><Link href="#schedule" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">Schedule & Timeline</Link></li>
              <li><Link href="#highlights" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">Attractions & Prizes</Link></li>
            </ul>
          </div>

          {/* Attend Links */}
          <div>
            <h4 className="font-playfair text-[#FFF8F0] font-semibold text-lg mb-4">Attend</h4>
            <ul className="space-y-2">
              <li><Link href="/register" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">Register / Book Pass</Link></li>
              <li><Link href="/my-pass" className="text-amber-300 hover:text-amber-100 text-sm transition-colors font-medium">Find My Entry Pass</Link></li>
              <li><Link href="#venue" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">Venue & Directions</Link></li>
              <li><Link href="#rules" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">Event Rules & Guidelines</Link></li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-playfair text-[#FFF8F0] font-semibold text-lg mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link href="#faq" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">FAQ</Link></li>
              <li><Link href="#contact" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="#gallery" className="text-[#FFF8F0]/70 hover:text-[#d4a017] text-sm transition-colors">Gallery</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFF8F0]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFF8F0]/50 text-xs">
            © {new Date().getFullYear()} {EVENT_CONFIG.organizer.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[#FFF8F0]/50 hover:text-[#FFF8F0]/80 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#FFF8F0]/50 hover:text-[#FFF8F0]/80 text-xs transition-colors">Terms of Service</Link>
            <Link href="/refund" className="text-[#FFF8F0]/50 hover:text-[#FFF8F0]/80 text-xs transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
