// Central Event Configuration
// All event-specific data is configured here for easy updates.

export const EVENT_CONFIG = {
  // Core Event Info
  name: "Jhanjharpur Jhijhiya & Dandiya Fest 2026",
  hindiName: "झंझारपुर झिझिया एवं डांडिया उत्सव 2026",
  tagline: "Mithila ki Sanskriti... Hamari Pehchan",
  subtitle: "108 Girls Grand Jhijhiya Performance & Dandiya Night",
  city: "Jhanjharpur",
  district: "Madhubani",
  state: "Bihar",
  country: "India",
  description:
    "Experience the divine grace of 108 Girls Grand Jhijhiya Performance and the electrifying beats of Dandiya & Garba Night in Jhanjharpur, Madhubani. Organized by Evolution Dance and Karate Academy in collaboration with Brocollab.in.",

  // Date & Time
  date: "2026-10-18", // YYYY-MM-DD format
  dateDisplay: "18 October 2026 (Sunday)",
  timeStart: "17:00",
  timeEnd: "22:30",
  timeDisplay: "5:00 PM Onwards",
  doorsOpen: "5:00 PM",

  type: "Jhijhiya Dance & Dandiya Fest",

  // Venue
  venue: {
    name: "Jhanjharpur",
    venueNote: "Venue Details Coming Soon",
    city: "Jhanjharpur (Madhubani)",
    address: "Jhanjharpur, Madhubani District, Bihar 847404",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57284.08397352!2d86.28!3d26.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee25bda1f0d3ef%3A0x6bcfd30a84e3112b!2sJhanjharpur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1",
    directionsUrl: "https://maps.google.com/?q=Jhanjharpur+Madhubani+Bihar",
    landmarks: [
      "Centrally located in Jhanjharpur",
      "Near Jhanjharpur Railway Station / Bus Stand",
      "Accessible from NH-27 & Madhubani City",
    ],
    parking: "Dedicated secure parking space available at venue grounds",
    entryGate: "Main Registration & Entry Counter",
  },

  // Registration & Pricing
  registrationFee: "₹149 onwards",
  currency: "INR",
  isPaid: true,
  capacity: 800,
  pricing: {
    jhijhiya: 149,
    dandiyaSingle: 249,
    dandiyaCouple: 399,
  },
  registrationTypes: ["JHIJHIYA_108", "DANDIYA_SINGLE", "DANDIYA_COUPLE"] as const,
  registration: {
    url: "/register",
    fee: "₹149 onwards",
    isFree: false,
    isOpen: true,
    pricing: {
      jhijhiya: 149,
      dandiyaSingle: 249,
      dandiyaCouple: 399,
    },
    jhijhiyaInclusions: [
      "Dance Choreography & Training",
      "Jhijhiya / Matka Prop provided",
      "Essential Performance Props",
      "Practice & Choreography Guidance",
    ],
    jhijhiyaExclusions: [
      "Costume not included (all participants bring their own costume)",
      "Makeup not included (self-makeup by participants)",
    ],
  },

  // Contact & Social
  contact: {
    phone: "+91 97981 40068",
    phoneSecondary: "+91 77829 95310",
    phoneAlt: "+91 97981 40968",
    whatsapp: "+91 97981 40068",
    whatsappSecondary: "+91 77829 95310",
    email: "events@brocollab.in",
    instagram: "@madhubani__dance",
    instagramUrl: "https://instagram.com/madhubani__dance",
    collabInstagram: "@brocollab.in",
    collabInstagramUrl: "https://instagram.com/brocollab.in",
  },

  social: {
    instagram: "https://instagram.com/madhubani__dance",
    collabInstagram: "https://instagram.com/brocollab.in",
    whatsapp: "https://wa.me/919798140068",
    whatsappSecondary: "https://wa.me/917782995310",
    email: "events@brocollab.in",
    hashtag: "#JhanjharpurDandiya2026",
  },

  // Organizers
  organizer: {
    name: "Evolution Dance and Karate Academy",
    location: "Jhanjharpur & Madhubani, Bihar",
    tagline: "Traditional Steps • Stronger Girls • Brighter Tomorrow",
    collab: "Brocollab.in",
    support: "Madhubani Dance Community",
  },

  // Event Hashtag
  hashtag: "#JhanjharpurDandiya2026",

  // Schedule
  schedule: [
    {
      time: "5:00 PM",
      title: "Gates Open & Prop Distribution",
      description: "Welcome to participants and guests. Pass verification & Dandiya sticks pickup.",
      icon: "door",
    },
    {
      time: "5:30 PM",
      title: "Inauguration & Traditional Deep Prajjwalan",
      description: "Auspicious lamp lighting ceremony celebrating Mithila cultural heritage.",
      icon: "flame",
    },
    {
      time: "6:15 PM",
      title: "🌺 108 Girls Grand Jhijhiya Performance",
      description: "Historic cultural showcase with 108 girls balancing illuminated earthen Jhijhiya matkas.",
      icon: "star",
    },
    {
      time: "7:45 PM",
      title: "Maha Aarti & Cultural Felicitation",
      description: "Honoring participants, choreographers, and academy supporters.",
      icon: "sparkles",
    },
    {
      time: "8:15 PM",
      title: "Dandiya Raas & Open Garba Circles",
      description: "High-energy Dandiya beats for all attendees with live folk and festive fusion.",
      icon: "music",
    },
    {
      time: "9:30 PM",
      title: "Live DJ Night & Bollywood Celebration",
      description: "Electrifying dance floor mix keeping the celebration alive through the night.",
      icon: "speaker",
    },
    {
      time: "10:15 PM",
      title: "Awards & Best Dressed Recognition",
      description: "Trophies and prizes for Best Dandiya Pair, Best Dressed, and Star Dancers.",
      icon: "trophy",
    },
    {
      time: "10:30 PM",
      title: "Closing & Festive Goodbye",
      description: "Heartfelt gratitude and memories until next Navratri!",
      icon: "heart",
    },
  ],

  // Highlights / Attractions
  highlights: [
    {
      title: "108 Girls Jhijhiya",
      description: "Grand historical traditional Jhijhiya folk dance with illuminated earthen matkas",
      icon: "star",
    },
    {
      title: "Dandiya Night",
      description: "High-energy Garba circles & Dandiya beats with sticks provided",
      icon: "sparkles",
    },
    {
      title: "Best Dandiya Pair",
      description: "Compete for royal trophies & prizes with your signature dance steps",
      icon: "trophy",
    },
    {
      title: "Best Dressed Awards",
      description: "Flaunt your finest traditional Mithila & festive ethnic attire",
      icon: "crown",
    },
    {
      title: "Live DJ & Folk Fusion",
      description: "Seamless blend of authentic Mithila folk rhythms and modern festival beats",
      icon: "speaker",
    },
    {
      title: "Festive Photo Booths",
      description: "Capture memorable moments with custom photo props and festival backdrops",
      icon: "camera",
    },
  ],

  // Experiences (major sections)
  experiences: [
    {
      title: "108 Girls Jhijhiya Performance",
      subtitle: "Mithila ki Sanskriti... Hamari Pehchan",
      description:
        "Witness a breathtaking spectacle of 108 school & college girls performing traditional Jhijhiya with lighted perforated pots balanced with divine grace. Choreographed by Evolution Dance and Karate Academy.",
      color: "from-amber-600 to-rose-600",
      image: "/images/jhijiya-poster.jpg",
    },
    {
      title: "Dandiya Raas & Garba Circles",
      subtitle: "Rhythmic Joy for Everyone",
      description:
        "Grab your Dandiya sticks and dance in vibrant concentric circles. Open for singles, couples, and families to experience the authentic euphoria of Navratri.",
      color: "from-red-600 to-orange-500",
      image: "/images/dandiya-poster.jpg",
    },
    {
      title: "Food, DJ & Festivities",
      subtitle: "A Night to Remember",
      description:
        "Savor lip-smacking festive street food, capture timeless photos, dance to pulsating DJ rhythms, and win prestigious cultural awards.",
      color: "from-purple-600 to-pink-500",
      image: "/images/experience-food.jpg",
    },
  ],

  // FAQ
  faq: [
    {
      question: "What is the 108 Girls Jhijhiya Performance?",
      answer:
        "It is a historic cultural presentation where 108 girls perform the auspicious Jhijhiya folk dance. Registration is ₹149 per participant, which includes dance choreography, practice sessions, Jhijhiya/Matka prop, and performance guidance. Costume and makeup must be arranged by participants themselves.",
    },
    {
      question: "What are the ticket prices for Dandiya Night?",
      answer:
        "Single Entry pass is ₹249 per person, and Couple Entry pass is ₹399 per couple. Passes grant full entry to the festival, open Garba & Dandiya dance floors, Dandiya sticks, and DJ night.",
    },
    {
      question: "Are costume and makeup included in the ₹149 Jhijhiya registration?",
      answer:
        "No. Costume and makeup are not included in the registration fee. All participants must bring their own traditional dress and do their own makeup. Props and choreography guidance are fully provided by the academy.",
    },
    {
      question: "Who is organizing this fest?",
      answer:
        "The festival is organized by Evolution Dance and Karate Academy (Jhanjharpur & Madhubani, Bihar) in collaboration with Brocollab.in and the Madhubani Dance Community.",
    },
    {
      question: "When and where will practice sessions be conducted?",
      answer:
        "After registration, participants will receive complete schedule and location details for practice and choreography guidance via WhatsApp and phone from the academy team.",
    },
    {
      question: "How do I show my entry pass at the gate?",
      answer:
        "You receive an instant digital entry pass with a unique Pass ID (e.g. DN-XXXX). Simply show this pass on your mobile phone screen or a screenshot at the gate counter for immediate verification.",
    },
    {
      question: "Whom can I contact for questions or group inquiries?",
      answer:
        "You can call or WhatsApp our official helplines at +91 97981 40068 or +91 77829 95310, or DM on Instagram @madhubani__dance and @brocollab.in.",
    },
  ],

  // Rules
  rules: [
    {
      category: "Jhijhiya Performance Guidelines",
      items: [
        "Open for all school and college girls",
        "Registration fee (₹149) covers choreography guidance, Jhijhiya matka prop & essential props",
        "Costume and makeup must be arranged self by each participant",
        "Mandatory attendance in designated practice & choreography sessions",
      ],
    },
    {
      category: "Dandiya Night Entry & Passes",
      items: [
        "Valid digital Pass ID required for venue gate check-in",
        "Gates open at 5:00 PM; please arrive early for smooth entry",
        "Single Pass: ₹249 | Couple Pass: ₹399",
      ],
    },
    {
      category: "Dress Code & Attire",
      items: [
        "Traditional Indian ethnic festive attire is warmly encouraged",
        "Chaniya Choli, Kurta-Pajama, Saree, or cultural folk dresses",
        "Comfortable footwear suitable for dancing",
      ],
    },
    {
      category: "Safety & Family Environment",
      items: [
        "100% safe, family-friendly cultural celebration",
        "Strict security check at entry; zero tolerance for misconduct",
        "Alcohol, smoking, and intoxicants are strictly prohibited",
      ],
    },
  ],

  // Sponsors & Event Partners (5 Partners)
  sponsors: [
    {
      name: "Evolution Dance & Karate Academy",
      tier: "Organizing Body",
      category: "Lead Choreography & Training",
      logo: "/images/jhanjharpur-logo.jpg",
    },
    {
      name: "Brocollab.in",
      tier: "Official Collaboration Partner",
      category: "Youth, Creators & Digital Media",
      logo: "/images/jhanjharpur-logo.jpg",
    },
    {
      name: "Madhubani Dance Community",
      tier: "Cultural Outreach Partner",
      category: "Mithila Folk & Heritage Promotion",
      logo: "/images/jhanjharpur-logo.jpg",
    },
    {
      name: "Jhanjharpur Youth & Cultural Forum",
      tier: "Community Partner",
      category: "Local Logistics & Event Support",
      logo: "/images/jhanjharpur-logo.jpg",
    },
    {
      name: "Mithila Audio, Stage & SFX",
      tier: "Sound & Stage Partner",
      category: "Folk Sound, Lighting & Special Effects",
      logo: "/images/jhanjharpur-logo.jpg",
    },
  ],

  // Gallery (Past Event Photos and Official Posters)
  gallery: {
    enabled: true,
    images: [
      {
        src: "/images/jhijiya-poster.jpg",
        alt: "108 Girls Jhijhiya Performance Official Poster",
        category: "Jhijhiya",
      },
      {
        src: "/images/dandiya-poster.jpg",
        alt: "Jhanjharpur Dandiya Fest Hands in Circle Poster",
        category: "Dandiya",
      },
      {
        src: "/images/registration-poster.png",
        alt: "Official Academy Registration Form Guidelines",
        category: "Performances",
      },
      {
        src: "/images/past-events/fest-memory-1.jpeg",
        alt: "Festive Garba Circle Celebration",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-2.jpeg",
        alt: "Dandiya Sticks Rhythm Celebration",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-3.jpeg",
        alt: "Traditional Ethnic Attire Showcase",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-4.jpeg",
        alt: "Festive Night Illuminations & Gathering",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-5.jpeg",
        alt: "Grand Folk Dance Circle",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-6.jpeg",
        alt: "Stage Performance & Live Energy",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-7.jpeg",
        alt: "Joyful Dandiya Participants",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-8.jpeg",
        alt: "Festive Smiles & Traditional Attire",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-9.jpeg",
        alt: "Mithila Cultural Celebration Highlights",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-10.jpeg",
        alt: "Celebration Dance Floor Vibes",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-11.jpeg",
        alt: "Festival Night Memories",
        category: "Memories",
      },
      {
        src: "/images/past-events/fest-memory-12.jpeg",
        alt: "Community Celebration & Group Dance",
        category: "Memories",
      },
    ],
  },

  // SEO
  seo: {
    title: "Jhanjharpur Jhijhiya & Dandiya Fest 2026 | 108 Girls Jhijhiya Performance",
    description:
      "Join Jhanjharpur Jhijhiya & Dandiya Fest 2026 on 18 October 2026 in Jhanjharpur, Madhubani. 108 Girls Grand Jhijhiya Performance, Dandiya Night, live DJ, food stalls & awards by Evolution Dance and Karate Academy & Brocollab.in.",
    keywords:
      "Jhanjharpur Dandiya Fest, 108 Girls Jhijhiya Performance, Jhijhiya Dance Madhubani, Evolution Dance and Karate Academy, Brocollab.in, Navratri 2026 Jhanjharpur, Dandiya Night Bihar",
    ogImage: "/images/jhijiya-poster.jpg",
  },
};

// Registration type labels
export const REGISTRATION_TYPE_LABELS: Record<string, string> = {
  JHIJHIYA_108: "108 Girls Jhijhiya (₹149)",
  DANDIYA_SINGLE: "Dandiya Night Single (₹249)",
  DANDIYA_COUPLE: "Dandiya Night Couple (₹399)",
  INDIVIDUAL: "Dandiya Single Entry",
  COUPLE: "Dandiya Couple Entry",
  GROUP: "Group Entry",
};

// Status labels
export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  CONFIRMED: { label: "Confirmed", color: "text-green-600 bg-green-50" },
  CANCELLED: { label: "Cancelled", color: "text-red-600 bg-red-50" },
  WAITLISTED: { label: "Waitlisted", color: "text-yellow-600 bg-yellow-50" },
};

export const PAYMENT_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  FREE: { label: "Free Entry", color: "text-blue-600 bg-blue-50" },
  PENDING: { label: "Payment Pending", color: "text-yellow-600 bg-yellow-50" },
  PAID: { label: "Paid", color: "text-green-600 bg-green-50" },
  REFUNDED: { label: "Refunded", color: "text-gray-600 bg-gray-50" },
};

export const eventConfig = EVENT_CONFIG;
export default EVENT_CONFIG;
