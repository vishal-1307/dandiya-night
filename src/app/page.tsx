import Hero from "@/components/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import HighlightsSection from "@/components/sections/HighlightsSection";
import VenueSection from "@/components/sections/VenueSection";
import RulesSection from "@/components/sections/RulesSection";
import GallerySection from "@/components/sections/GallerySection";
import SocialSection from "@/components/sections/SocialSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import Link from "next/link";
import { EVENT_CONFIG } from "@/lib/config";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic Hero with Countdown */}
      <Hero />

      {/* 2. Event Introduction */}
      <AboutSection />

      {/* 3. Key Event Experiences (Dandiya Raas, Music, Food & Festivities) */}
      <ExperiencesSection />

      {/* 4. Interactive Event Schedule */}
      <ScheduleSection />

      {/* 5. Event Highlights & Attractions */}
      <HighlightsSection />

      {/* Mid-page Registration Callout Banner */}
      <section className="py-16 bg-gradient-to-r from-[#8b1a3f] via-[#6d1a36] to-[#1A0E2E] border-y border-[#d4a017]/30 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4a017_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4a017] font-semibold">
            Limited Capacity • {EVENT_CONFIG.capacity} Passes Only
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#FFF8F0] mt-2 mb-4 leading-tight">
            Be Part of Madhubani&apos;s Biggest Festive Celebration
          </h2>
          <p className="text-rose-100/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Register individually, as a couple, or with your group. Instant digital QR pass issued with Pay-at-Gate / On-Site UPI convenience!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-[#d4a017] hover:bg-[#b8860b] text-[#3f0919] font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_25px_rgba(212,160,23,0.4)] transition-all transform hover:scale-105"
            >
              Book Entry Pass (₹199 onwards)
            </Link>
            <Link
              href="/my-pass"
              className="w-full sm:w-auto border border-[#d4a017]/50 hover:bg-[#d4a017]/10 text-[#FFF8F0] font-semibold px-8 py-4 rounded-full text-base transition-colors"
            >
              Already Registered? Find Pass
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Venue & Directions */}
      <VenueSection />

      {/* 7. Event Rules & Guidelines */}
      <RulesSection />

      {/* 8. Event Gallery / Teaser */}
      <GallerySection />

      {/* 9. Sponsors & Partners (disappears automatically if empty) */}
      <SponsorsSection />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />

      {/* 11. Social & Instagram Community */}
      <SocialSection />

      {/* 12. Contact Organizers */}
      <ContactSection />
    </>
  );
}
