import Hero from "@/components/Hero";
import PassOptionsSection from "@/components/sections/PassOptionsSection";
import AboutSection from "@/components/sections/AboutSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import HighlightsSection from "@/components/sections/HighlightsSection";
import VenueSection from "@/components/sections/VenueSection";
import RulesSection from "@/components/sections/RulesSection";
import GallerySection from "@/components/sections/GallerySection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import FAQSection from "@/components/sections/FAQSection";
import SocialSection from "@/components/sections/SocialSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic Hero with Scrim, Headline & At-A-Glance Info */}
      <Hero />

      {/* 2. Primary Decision: Choose Your Experience / Pass Options */}
      <PassOptionsSection />

      {/* 3. Cultural Heritage: The 108 Girls Jhijhiya Story */}
      <AboutSection />

      {/* 4. Chronological Programme Schedule */}
      <ScheduleSection />

      {/* 5. Festival Experiences */}
      <ExperiencesSection />

      {/* 6. Special Attractions & Recognition */}
      <HighlightsSection />

      {/* 7. Venue, Timings & Google Maps Directions */}
      <VenueSection />

      {/* 8. Event Rules & Guidelines */}
      <RulesSection />

      {/* 9. Curated Moments & Memories (Gallery) */}
      <GallerySection />

      {/* 10. Community Partners & Supporters */}
      <SponsorsSection />

      {/* 11. Frequently Asked Questions */}
      <FAQSection />

      {/* 12. Social & Instagram Community */}
      <SocialSection />

      {/* 13. Direct Helpdesk, Helplines & Contact Desk */}
      <ContactSection />
    </>
  );
}

