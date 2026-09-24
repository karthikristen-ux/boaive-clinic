// ============================================================
// BOAIVE CLINIC — CENTRALIZED SITE CONFIGURATION
// ============================================================
// All customizable data for the clinic website lives here.
// The live customizer modifies this config in real-time.
// ============================================================

export interface Treatment {
  id: string;
  name: string;
  description: string;
  category: 'dental' | 'hair' | 'skin';
  image: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  enabled: boolean;
  treatments: Treatment[];
}

export interface Doctor {
  id: string;
  name: string;
  photo: string;
  qualification: string;
  specialization: string;
  experience: string;
  biography: string;
  expertise: string[];
  phone: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  mapUrl: string;
  mapEmbed: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string[];
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  card: string;
}

export interface TypographyPreset {
  id: string;
  name: string;
  displayFont: string;
  bodyFont: string;
  displayClass: string;
  bodyClass: string;
}

export interface AnimationPreset {
  id: string;
  name: string;
  description: string;
}

export interface LayoutPreset {
  id: string;
  name: string;
  description: string;
}

export interface SiteConfig {
  clinicName: string;
  tagline: string;
  logoIcon: string;
  logoWordmark: string;
  hero: HeroContent;
  services: Service[];
  doctors: Doctor[];
  contact: ContactInfo;
  social: SocialLinks;
  colorPalette: string;
  typographyPreset: string;
  animationPreset: string;
  layoutPreset: string;
  appointmentMethod: 'whatsapp' | 'phone' | 'both';
}

// ============================================================
// COLOR PALETTES
// ============================================================

export const colorPalettes: ColorPalette[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    background: '#FAF8F5',
    foreground: '#1A1A1A',
    primary: '#1A1A1A',
    secondary: '#6B6B6B',
    accent: '#7C8B6F',
    accentForeground: '#FFFFFF',
    muted: '#F0EDE8',
    mutedForeground: '#8A8A8A',
    border: '#E5E0D8',
    card: '#FFFFFF',
  },
  {
    id: 'clinical',
    name: 'Clinical',
    background: '#FAFAFA',
    foreground: '#0F172A',
    primary: '#0F172A',
    secondary: '#64748B',
    accent: '#0D7377',
    accentForeground: '#FFFFFF',
    muted: '#F1F5F9',
    mutedForeground: '#94A3B8',
    border: '#E2E8F0',
    card: '#FFFFFF',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    background: '#FBF9F4',
    foreground: '#2D2D2D',
    primary: '#2D2D2D',
    secondary: '#7A7A7A',
    accent: '#B8986E',
    accentForeground: '#FFFFFF',
    muted: '#F4F0E8',
    mutedForeground: '#9A9A9A',
    border: '#E8E2D6',
    card: '#FFFFFF',
  },
  {
    id: 'botanical',
    name: 'Botanical',
    background: '#FAFBF7',
    foreground: '#1B2E1B',
    primary: '#1B2E1B',
    secondary: '#5A6B5A',
    accent: '#2D5A3D',
    accentForeground: '#FFFFFF',
    muted: '#EFF2EA',
    mutedForeground: '#7A8A7A',
    border: '#D8DED0',
    card: '#FFFFFF',
  },
  {
    id: 'modern',
    name: 'Modern',
    background: '#FAFAFA',
    foreground: '#18181B',
    primary: '#18181B',
    secondary: '#71717A',
    accent: '#2563EB',
    accentForeground: '#FFFFFF',
    muted: '#F4F4F5',
    mutedForeground: '#A1A1AA',
    border: '#E4E4E7',
    card: '#FFFFFF',
  },
];

// ============================================================
// TYPOGRAPHY PRESETS
// ============================================================

export const typographyPresets: TypographyPreset[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    displayFont: 'Cormorant Garamond',
    bodyFont: 'Inter',
    displayClass: 'font-display',
    bodyClass: 'font-body',
  },
  {
    id: 'modern',
    name: 'Modern',
    displayFont: 'Inter',
    bodyFont: 'Inter',
    displayClass: 'font-body',
    bodyClass: 'font-body',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    displayFont: 'Inter',
    bodyFont: 'Inter',
    displayClass: 'font-body',
    bodyClass: 'font-body',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    displayFont: 'Playfair Display',
    bodyFont: 'Inter',
    displayClass: 'font-luxury',
    bodyClass: 'font-body',
  },
];

// ============================================================
// ANIMATION PRESETS
// ============================================================

export const animationPresets: AnimationPreset[] = [
  { id: 'subtle', name: 'Subtle', description: 'Minimal fade and slide transitions' },
  { id: 'signature', name: 'Signature', description: 'Parallax, reveals, and scroll interactions' },
  { id: 'immersive', name: 'Immersive', description: 'Rich page transitions and advanced motion' },
];

// ============================================================
// LAYOUT PRESETS
// ============================================================

export const layoutPresets: LayoutPreset[] = [
  { id: 'editorial', name: 'Editorial', description: 'Magazine-inspired with serif headings' },
  { id: 'modern-clinical', name: 'Modern Clinical', description: 'Clean, structured, professional' },
  { id: 'luxury', name: 'Luxury', description: 'Spacious with premium typography' },
  { id: 'minimal', name: 'Minimal', description: 'Essential content, maximum whitespace' },
];

// ============================================================
// DEFAULT SITE CONFIGURATION
// ============================================================

export const defaultConfig: SiteConfig = {
  clinicName: 'Boaive Clinic',
  tagline: 'Modern care. Made personal.',
  logoIcon: '/images/logo-icon.png',
  logoWordmark: '/images/logo-wordmark.png',

  hero: {
    eyebrow: 'CARE, REFINED.',
    headline: ['Your skin.', 'Your smile.', 'Your confidence.'],
    description: 'Advanced dental, hair and skin care designed around you.',
    primaryCta: 'Book Appointment',
    secondaryCta: 'Explore Services',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
  },

  services: [
    {
      id: 'dental',
      name: 'Dental Care',
      slug: 'dental',
      tagline: 'A healthier smile.',
      description: 'Modern dentistry for healthier, confident smiles.',
      icon: 'smile',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
      enabled: true,
      treatments: [
        { id: 'd1', name: 'Teeth Whitening', description: 'Professional whitening for a brighter, more radiant smile.', category: 'dental', image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80' },
        { id: 'd2', name: 'Dental Implants', description: 'Permanent tooth replacement that looks and feels natural.', category: 'dental', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80' },
        { id: 'd3', name: 'Aligners', description: 'Clear, comfortable aligners for a straighter smile.', category: 'dental', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80' },
        { id: 'd4', name: 'Veneers', description: 'Custom porcelain veneers for a flawless appearance.', category: 'dental', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80' },
        { id: 'd5', name: 'Root Canal', description: 'Pain-free root canal treatment with modern techniques.', category: 'dental', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80' },
        { id: 'd6', name: 'Dental Cleaning', description: 'Professional cleaning for healthier teeth and gums.', category: 'dental', image: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?w=600&q=80' },
        { id: 'd7', name: 'Crowns & Bridges', description: 'Durable restorations that blend with your natural teeth.', category: 'dental', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80' },
      ],
    },
    {
      id: 'hair',
      name: 'Hair Care',
      slug: 'hair',
      tagline: 'Stronger hair.',
      description: 'Stronger hair starts with the right care.',
      icon: 'wind',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
      enabled: true,
      treatments: [
        { id: 'h1', name: 'Hair Restoration', description: 'Advanced restoration for thicker, fuller hair.', category: 'hair', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80' },
        { id: 'h2', name: 'PRP Therapy', description: 'Platelet-rich plasma therapy for natural hair growth.', category: 'hair', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80' },
        { id: 'h3', name: 'Hair Transplant', description: 'Minimally invasive transplant for lasting results.', category: 'hair', image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=600&q=80' },
        { id: 'h4', name: 'Scalp Treatment', description: 'Targeted therapy for a healthier scalp.', category: 'hair', image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600&q=80' },
        { id: 'h5', name: 'Hair Fall Management', description: 'Comprehensive treatment to reduce hair fall.', category: 'hair', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80' },
      ],
    },
    {
      id: 'skin',
      name: 'Skin Care',
      slug: 'skin',
      tagline: 'Radiant skin.',
      description: 'Healthy skin, thoughtfully treated.',
      icon: 'sparkles',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
      enabled: true,
      treatments: [
        { id: 's1', name: 'Acne Treatment', description: 'Targeted solutions for clearer, healthier skin.', category: 'skin', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80' },
        { id: 's2', name: 'Chemical Peels', description: 'Controlled peeling for renewed, glowing skin.', category: 'skin', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80' },
        { id: 's3', name: 'Laser Treatments', description: 'Precision laser therapy for skin rejuvenation.', category: 'skin', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80' },
        { id: 's4', name: 'Pigmentation', description: 'Even-toned skin with advanced pigmentation care.', category: 'skin', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80' },
        { id: 's5', name: 'Skin Rejuvenation', description: 'Non-invasive treatments for youthful skin.', category: 'skin', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80' },
        { id: 's6', name: 'Anti-Aging', description: 'Advanced anti-aging therapies for lasting results.', category: 'skin', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80' },
      ],
    },
  ],

  doctors: [
    {
      id: 'doc1',
      name: 'Dr. Ananya S.',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
      qualification: 'MDS — Orthodontics',
      specialization: 'Orthodontics & Aligners',
      experience: '12+ years',
      biography: 'Specializing in orthodontic care with a focus on clear aligners and modern smile design. Demo content.',
      expertise: ['Clear Aligners', 'Braces', 'Smile Design', 'Jaw Alignment'],
      phone: '+919999999999',
    },
    {
      id: 'doc2',
      name: 'Dr. Karthik R.',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
      qualification: 'MD — Dermatology',
      specialization: 'Dermatology & Cosmetology',
      experience: '10+ years',
      biography: 'Expert in medical and cosmetic dermatology with specialization in laser treatments and skin rejuvenation. Demo content.',
      expertise: ['Laser Treatments', 'Acne Care', 'Skin Rejuvenation', 'Chemical Peels'],
      phone: '+919999999999',
    },
    {
      id: 'doc3',
      name: 'Dr. Meera V.',
      photo: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&q=80',
      qualification: 'MBBS, MD — Trichology',
      specialization: 'Trichology & Hair Restoration',
      experience: '8+ years',
      biography: 'Dedicated to hair health with expertise in PRP therapy, hair transplant, and scalp treatments. Demo content.',
      expertise: ['PRP Therapy', 'Hair Transplant', 'Scalp Treatment', 'Hair Fall Management'],
      phone: '+919999999999',
    },
  ],

  contact: {
    phone: '+91 99999 99999',
    whatsapp: '919999999999',
    email: 'hello@boaiveclinic.com',
    address: 'MDS Complex, City Union Bank building, Mahalingapuram, Chennai 600034',
    landmark: 'Opposite to Ayyappan Temple',
    city: 'Chennai',
    mapUrl: 'https://maps.google.com/?q=Mahalingapuram+Chennai',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4!2d80.23!3d13.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMahalingapuram!5e0!3m2!1sen!2sin!4v1',
    workingHours: {
      weekdays: 'Mon – Fri: 10:00 AM – 1 PM, 5 – 9 PM',
      saturday: 'Sat: 10:00 AM – 1 PM',
      sunday: 'Sun: Closed',
    },
  },

  social: {
    instagram: 'https://instagram.com/boaiveclinic',
    facebook: 'https://facebook.com/boaiveclinic',
    youtube: 'https://youtube.com/@boaiveclinic',
  },

  colorPalette: 'editorial',
  typographyPreset: 'editorial',
  animationPreset: 'signature',
  layoutPreset: 'editorial',
  appointmentMethod: 'both',
};

// ============================================================
// DEMO REVIEWS (Placeholder — clearly marked as demo content)
// ============================================================

export const demoReviews = [
  {
    id: 'r1',
    name: 'Priya S.',
    rating: 5,
    text: '"Amazing experience! The team is so professional and friendly."',
    treatment: 'Dental Care',
    isDemo: true,
  },
  {
    id: 'r2',
    name: 'Arjun K.',
    rating: 5,
    text: '"My skin has never looked better. Highly recommend the clinic."',
    treatment: 'Skin Care',
    isDemo: true,
  },
  {
    id: 'r3',
    name: 'Divya R.',
    rating: 5,
    text: '"Noticeable results and excellent follow-up care."',
    treatment: 'Hair Care',
    isDemo: true,
  },
  {
    id: 'r4',
    name: 'Rahul M.',
    rating: 5,
    text: '"Professional, clean, and state-of-the-art equipment."',
    treatment: 'Dental Care',
    isDemo: true,
  },
  {
    id: 'r5',
    name: 'Sneha P.',
    rating: 5,
    text: '"The doctors genuinely listen and explain everything clearly."',
    treatment: 'Skin Care',
    isDemo: true,
  },
];

// ============================================================
// GALLERY IMAGES (Placeholder)
// ============================================================

export const galleryImages = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', alt: 'Reception area', category: 'Reception' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80', alt: 'Treatment room', category: 'Treatment Rooms' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=800&q=80', alt: 'Medical equipment', category: 'Equipment' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80', alt: 'Consultation room', category: 'Consultation' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', alt: 'Clinic interior', category: 'Interior' },
];

// ============================================================
// SCROLL STORY STEPS
// ============================================================

export const scrollStorySteps = [
  {
    number: '01',
    title: 'Personalized Care',
    description: 'Every treatment plan is designed around your unique needs, preferences, and goals.',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80',
  },
  {
    number: '02',
    title: 'Modern Technology',
    description: 'We use the latest equipment and techniques for precise, comfortable treatments.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
  },
  {
    number: '03',
    title: 'Experienced Doctors',
    description: 'Our team brings decades of expertise across dental, dermatology, and trichology.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80',
  },
  {
    number: '04',
    title: 'Patient-First Experience',
    description: 'From your first visit to follow-up, every interaction is designed around your comfort.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
  },
  {
    number: '05',
    title: 'Transparent Guidance',
    description: 'Honest advice, clear explanations, and no unnecessary procedures — ever.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80',
  },
];
