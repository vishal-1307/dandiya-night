// Central Event Configuration
// All event-specific data is configured here for easy updates.

export const EVENT_CONFIG = {
  // Core Event Info
  name: "Mithila Dandiya Utsav 2026",
  tagline: "Celebrating Mithila Heritage & Festive Garba Joy",
  subtitle: "A Grand Night of Rhythm, Dandiya Raas & Cultural Celebration",
  city: "Madhubani",
  state: "Bihar",
  country: "India",
  description:
    "Experience the vibrant magic of Navratri with an unforgettable evening of traditional Dandiya Raas, energetic Garba circles, live dhol beats, authentic Mithila folk performances, and delicious festive feasts in the heart of Madhubani.",

  // Date & Time
  date: "2026-10-15", // YYYY-MM-DD format
  dateDisplay: "October 15, 2026",
  timeStart: "17:00",
  timeEnd: "22:30",
  timeDisplay: "5:00 PM – 10:30 PM",
  doorsOpen: "5:00 PM",

  type: "Dandiya & Garba Night",

  // Venue
  venue: {
    name: "Town Club Ground",
    city: "Madhubani",
    address: "Station Road, Madhubani, Bihar 847211",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57284.08397352!2d86.04!3d26.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edfd0e8eef1c7d%3A0x1e1f57fa8f8f8c42!2sMadhubani%2C%20Bihar!5e0!3m2!1sen!2sin!4v1",
    directionsUrl: "https://maps.google.com/?q=Madhubani+Bihar",
    landmarks: [
      "Near Madhubani Railway Station",
      "Opposite Collectorate Road",
      "5 min from Suri High School",
    ],
    parking: "Spacious dedicated parking available on venue grounds",
    entryGate: "Main Gate on Station Road",
  },

  // Registration & Pricing
  registrationFee: "₹199 onwards",
  currency: "INR",
  isPaid: true,
  capacity: 500,
  pricing: {
    individual: 199,
    couple: 349,
    group: 799,
  },
  registrationTypes: ["INDIVIDUAL", "COUPLE", "GROUP"] as const,
  registration: {
    url: "/register",
    fee: "₹199 onwards",
    isFree: false,
    isOpen: true,
    pricing: {
      individual: 199,
      couple: 349,
      group: 799,
    },
  },

  // Contact & Social
  contact: {
    phone: "+91 94310 88200",
    whatsapp: "+91 94310 88200",
    email: "events@mithiladandiya.in",
    instagram: "@mithiladandiyautsava",
    instagramUrl: "https://instagram.com/mithiladandiyautsava",
  },

  social: {
    instagram: "https://instagram.com/mithiladandiyautsava",
    whatsapp: "https://wa.me/919431088200",
    email: "events@mithiladandiyautsava.in",
    hashtag: "#MithilaDandiya2026",
  },

  // Organizer
  organizer: {
    name: "Mithila Cultural & Events Foundation",
    tagline: "Celebrating Traditions, Igniting Festive Spirits",
  },

  // Event Hashtag
  hashtag: "#MithilaDandiya2026",

  // Schedule
  schedule: [
    {
      time: "5:00 PM",
      title: "Doors Open",
      description: "Welcome to the venue. Collect your entry pass.",
      icon: "door",
    },
    {
      time: "5:30 PM",
      title: "Welcome & Inauguration",
      description: "Opening ceremony with traditional lamp lighting.",
      icon: "flame",
    },
    {
      time: "6:00 PM",
      title: "Garba Session",
      description: "Traditional Garba dance with live folk music.",
      icon: "music",
    },
    {
      time: "7:30 PM",
      title: "Dandiya Raas",
      description: "High-energy Dandiya with colorful sticks and beats.",
      icon: "sparkles",
    },
    {
      time: "8:30 PM",
      title: "Special Performance",
      description: "Cultural performance and competition results.",
      icon: "star",
    },
    {
      time: "9:00 PM",
      title: "DJ Night & Open Dance",
      description: "Bollywood & folk DJ mix. Dance floor is yours.",
      icon: "speaker",
    },
    {
      time: "10:00 PM",
      title: "Prize Distribution",
      description: "Awards for Best Dandiya Pair, Best Dressed & more.",
      icon: "trophy",
    },
    {
      time: "10:30 PM",
      title: "Closing",
      description: "Thank you for celebrating with us!",
      icon: "heart",
    },
  ],

  // Highlights / Attractions
  highlights: [
    {
      title: "Best Dandiya Pair",
      description: "Compete for the crown with your best moves",
      icon: "trophy",
    },
    {
      title: "Best Dressed",
      description: "Flaunt your festive outfit and win prizes",
      icon: "sparkles",
    },
    {
      title: "Live DJ",
      description: "Bollywood meets folk in an electrifying mix",
      icon: "speaker",
    },
    {
      title: "Photo Booth",
      description: "Capture your festive moments with themed props",
      icon: "camera",
    },
    {
      title: "Food Zone",
      description: "Savor authentic festive snacks and beverages",
      icon: "food",
    },
    {
      title: "Group Dance",
      description: "Form your squad and own the dance floor",
      icon: "users",
    },
  ],

  // Experiences (major sections)
  experiences: [
    {
      title: "Dandiya & Garba",
      subtitle: "The Heart of Navratri",
      description:
        "Lose yourself in the rhythmic beats of Dandiya sticks and the graceful circles of Garba. Whether you are a seasoned dancer or stepping in for the first time, the energy is infectious.",
      color: "from-red-600 to-orange-500",
      image: "/images/experience-dandiya.jpg",
    },
    {
      title: "Music & Performance",
      subtitle: "Sound of Celebration",
      description:
        "From soulful folk melodies to foot-tapping Bollywood remixes, our curated lineup keeps the energy alive all evening. Live performances and a professional DJ ensure the night never slows down.",
      color: "from-purple-600 to-pink-500",
      image: "/images/experience-music.jpg",
    },
    {
      title: "Food & Festivities",
      subtitle: "A Feast for the Senses",
      description:
        "Indulge in a curated selection of festive snacks, chaats, and beverages. Photo booths, competitions, and surprise moments make every corner of the venue an experience.",
      color: "from-amber-600 to-yellow-500",
      image: "/images/experience-food.jpg",
    },
  ],

  // FAQ
  faq: [
    {
      question: "Who can register for the event?",
      answer:
        "Anyone who loves dance and festivities! The event is open to all age groups. Minors must be accompanied by an adult guardian.",
    },
    {
      question: "What is the ticket price and how do I pay?",
      answer:
        "Passes start at ₹199 for Individual, ₹349 for Couples, and ₹799 for Groups (4+ members). You can reserve your pass online instantly, and the entry fee is collected at the venue counter via UPI (Google Pay, PhonePe, Paytm) or cash upon arrival.",
    },
    {
      question: "Can I register as a couple or group?",
      answer:
        "Yes! We offer Individual, Couple, and Group registration options. Group registrations require a minimum of 4 members.",
    },
    {
      question: "What should I wear?",
      answer:
        "Traditional festive attire is encouraged - chaniya choli, kurta-pajama, saree, or any Indian festive wear. Come dressed to impress for the Best Dressed competition!",
    },
    {
      question: "Do I need to bring my own Dandiya sticks?",
      answer:
        "Dandiya sticks will be available at the venue. You are welcome to bring your own decorated sticks as well.",
    },
    {
      question: "Are children allowed?",
      answer:
        "Children are welcome when accompanied by an adult. The event is family-friendly.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "Doors open at 5:00 PM. We recommend arriving by 5:30 PM for the opening ceremony.",
    },
    {
      question: "Is parking available?",
      answer:
        "Yes, parking is available at the venue. Please follow the signage upon arrival.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Please refer to our refund policy. Cancellations made 48 hours before the event are eligible for a full refund.",
    },
    {
      question: "How do I show my entry pass?",
      answer:
        "After registration, you will receive a digital QR pass. Show this on your phone screen or a printed copy at the entry gate.",
    },
  ],

  // Rules
  rules: [
    {
      category: "Entry",
      items: [
        "Valid registration and QR pass required for entry",
        "Gates open at 5:00 PM",
        "No re-entry after exit",
      ],
    },
    {
      category: "Dress Code",
      items: [
        "Traditional Indian festive attire is encouraged",
        "Casual western wear is acceptable",
        "Footwear suitable for dancing recommended",
      ],
    },
    {
      category: "Dandiya Sticks",
      items: [
        "Only lightweight wooden or plastic Dandiya sticks allowed",
        "Metal or heavy sticks are prohibited",
        "Sticks available at the venue",
      ],
    },
    {
      category: "Safety & Security",
      items: [
        "Bag check at entry",
        "No sharp objects, weapons, or illegal items",
        "No alcohol or intoxicants allowed inside the venue",
        "Follow instructions from event staff and security",
      ],
    },
    {
      category: "Photography & Video",
      items: [
        "Personal photography and video allowed",
        "Professional equipment requires prior permission",
        "Event may be recorded for promotional purposes",
      ],
    },
    {
      category: "General Conduct",
      items: [
        "Respect all attendees and staff",
        "No harassment or misconduct of any kind",
        "Organizers reserve the right to deny entry or remove attendees",
      ],
    },
  ],

  // Sponsors & Event Partners
  sponsors: [
    {
      name: "Mithila Heritage Trust",
      tier: "Title Sponsor",
      category: "Preserving Cultural Arts",
      logo: "/images/logo.svg",
    },
    {
      name: "Vibe Beats Production",
      tier: "Sound & Stage Partner",
      category: "Audio, Truss & SFX",
      logo: "/images/logo.svg",
    },
    {
      name: "Madhur Mithila Sweets",
      tier: "Festive Food Partner",
      category: "Authentic Chaat & Mithai",
      logo: "/images/logo.svg",
    },
    {
      name: "Mithilanchal 93.5 FM",
      tier: "Official Media Partner",
      category: "Radio & Digital Broadcast",
      logo: "/images/logo.svg",
    },
    {
      name: "Madhubani Kala Sangam",
      tier: "Cultural Arts Partner",
      category: "Traditional Decor & Folk Troupe",
      logo: "/images/logo.svg",
    },
  ],

  // Gallery
  gallery: {
    enabled: true,
    images: [
      {
        src: "/images/hero-bg.jpg",
        alt: "Grand Dandiya Raas Courtyard Celebration",
        category: "Dance",
      },
      {
        src: "/images/experience-dandiya.jpg",
        alt: "Traditional Decorated Dandiya Sticks in Motion",
        category: "Dandiya",
      },
      {
        src: "/images/gallery-2.jpg",
        alt: "Traditional Festive Ethnic Attire & Jewelry",
        category: "Attire",
      },
      {
        src: "/images/experience-music.jpg",
        alt: "Live Folk Beats & Stage Performance",
        category: "Music",
      },
      {
        src: "/images/gallery-1.jpg",
        alt: "Festive Diya and Night Illuminations",
        category: "Atmosphere",
      },
      {
        src: "/images/experience-food.jpg",
        alt: "Festive Street Food & Chaat Delicacies",
        category: "Food",
      },
      {
        src: "/images/gallery-3.jpg",
        alt: "Celebration and Energetic Dance Floor",
        category: "Dance",
      },
      {
        src: "/images/gallery-4.jpg",
        alt: "Festive Mithai and Traditional Sweets",
        category: "Food",
      },
      {
        src: "/images/gallery-5.jpg",
        alt: "Energetic Folk Dandiya Performance",
        category: "Dandiya",
      },
      {
        src: "/images/gallery-6.jpg",
        alt: "Live Dhol Beats and Musical Ensemble",
        category: "Music",
      },
      {
        src: "/images/gallery-7.jpg",
        alt: "Vibrant Marigold & Rangoli Decorations",
        category: "Atmosphere",
      },
      {
        src: "/images/gallery-8.jpg",
        alt: "Midnight Garba Joy & Confetti Celebration",
        category: "Dance",
      },
    ],
  },

  // SEO
  seo: {
    title: "Mithila Dandiya Utsav 2026 | Grand Garba Night in Madhubani, Bihar",
    description:
      "Join Mithila Dandiya Utsav 2026 at Town Club Ground, Madhubani. Live music, traditional Garba Raas, authentic food stalls, costume competitions & digital entry passes. Book tickets now!",
    keywords:
      "Mithila Dandiya Utsav, Dandiya Night Madhubani, Garba Night Bihar, Navratri 2026 Madhubani, Dandiya Raas, Madhubani Events",
    ogImage: "/images/hero-bg.jpg",
  },
};

// Registration type labels
export const REGISTRATION_TYPE_LABELS: Record<string, string> = {
  INDIVIDUAL: "Individual",
  COUPLE: "Couple",
  GROUP: "Group (4+)",
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

