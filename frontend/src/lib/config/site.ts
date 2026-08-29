/**
 * IITDEVELOPER — Central Site Configuration
 * Single source of truth for all business data, feature flags, and placeholders.
 * 
 * BEFORE LAUNCH: Search for all REQUIRED_ placeholders and fill them in.
 */

// ─── Feature Flags ───────────────────────────────────────────────────────────
export const featureFlags = {
  /** Show testimonials section. Set true only when quotes are owner-verified. */
  showTestimonials: false,
  /** Show verified numeric stats (projects, clients). Set true only with evidence. */
  showVerifiedStats: false,
  /** Show booking button. Set NEXT_PUBLIC_BOOKING_URL env var before enabling. */
  showBookingCTA: true,
  /** Show work/case studies section on homepage */
  showWorkPreview: true,
  /** Show insights section on homepage */
  showInsightsPreview: true,
} as const;

// ─── Business Information ─────────────────────────────────────────────────────
export const siteConfig = {
  /** Official brand name */
  name: 'IITDEVELOPER',
  /** Display name used in UI */
  displayName: 'IIT Developer',
  /** Founding year — verified */
  foundingYear: 2020,
  /** MSME registration year — verified */
  msmeYear: 2020,
  /** Canonical domain */
  url: 'https://iitdeveloper.com',
  /** Primary business email */
  email: 'info@iitdeveloper.com',
  /** Default locale */
  locale: 'en_IN',
  /** Service area */
  areaServed: 'Worldwide',
  /** Country of registration */
  country: 'India',

  /** 
   * Founder details.
   * Update FOUNDER_SOCIAL_GITHUB, FOUNDER_SOCIAL_LINKEDIN if/when public.
   */
  founder: {
    name: 'Ravikant Yadav',
    role: 'Founder & Software Engineer',
    bio: 'Software engineer with experience across full-stack development, cloud platforms, DevOps, and AI systems. Founded IITDEVELOPER in 2020 to make practical technology delivery accessible to growing businesses. After years of deepening expertise across production engineering and AI infrastructure, relaunching with a sharper focus on AI, cloud, and software delivery.',
    /** Set to public GitHub profile URL, or null to hide */
    github: null as string | null,
    /** Set to public LinkedIn URL, or null to hide */
    linkedin: null as string | null,
  },

  // Social profiles — set real URLs before launch
  social: {
    /** GitHub org URL or null to hide */
    github: 'https://github.com/iitdeveloper-git',
    /** LinkedIn company page or null to hide */
    linkedin: 'https://www.linkedin.com/company/iitdeveloper/',
    /** Twitter/X handle URL or null to hide */
    twitter: 'https://x.com/developer_iit',
    /** Instagram page or null to hide */
    instagram: 'https://www.instagram.com/iitdeveloper',
    /** Email for social display */
    email: 'info@iitdeveloper.com',
  },

  // Booking — REQUIRED before launch
  /** 
   * Calendly / Cal.com / Koalendar URL for "Book a Discovery Call" CTAs.
   * Falls back to /contact if not set.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '/contact',

  // SEO
  ogImage: '/og-image.jpg',
  twitterHandle: null as string | null,

  // Search Console verification — set via env variables
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || null,
  bingVerification: process.env.NEXT_PUBLIC_BING_VERIFICATION || null,
} as const;

// ─── Verified Stats (only show when confirmed) ───────────────────────────────
/**
 * Update these only with verified evidence.
 * Set featureFlags.showVerifiedStats = true when ready.
 */
export const verifiedStats = {
  projectsDelivered: null as number | null,      // VERIFIED_PROJECT_COUNT_REQUIRED
  clientsServed: null as number | null,           // VERIFIED_CLIENT_COUNT_REQUIRED
  yearsExperience: new Date().getFullYear() - siteConfig.foundingYear,
  technologies: 30,                              // Conservative, defensible
} as const;

// ─── Non-numeric credibility statements (always safe to show) ────────────────
export const credibilityStatements = [
  {
    value: '2020',
    label: 'Founded',
    subtext: 'MSME Registered',
  },
  {
    value: '4+',
    label: 'Years of Experience',
    subtext: 'Engineering & AI',
  },
  {
    value: '30+',
    label: 'Technologies',
    subtext: 'In Active Use',
  },
  {
    value: 'India',
    label: 'Based In',
    subtext: 'Serving Worldwide',
  },
] as const;

// ─── Navigation ──────────────────────────────────────────────────────────────
export const primaryCTA = {
  label: 'Book a Discovery Call',
  href: siteConfig.bookingUrl,
} as const;

export const secondaryCTA = {
  label: 'Get a Project Estimate',
  href: '/estimate',
} as const;
