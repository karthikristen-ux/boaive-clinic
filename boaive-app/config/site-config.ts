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
  appointmentMethod: 'whatsapp' | 'phone' | 'both';
}

// ============================================================
// DEFAULT SITE CONFIGURATION
// ============================================================

export const defaultConfig: SiteConfig = {
  clinicName: 'Boaive Clinic',
  tagline: 'Modern care. Made personal.',
  logoIcon: '/images/logo-icon.png',
  logoWordmark: '/images/logo-wordmark.png',

  hero: {
    eyebrow: 'Dental · Hair · Skin Clinic',
    headline: ['Caring for your smile, hair and skin.'],
    description: 'One neighbourhood clinic for dental, hair and skin care. Experienced doctors, clear advice and fair pricing — with no unnecessary procedures.',
    primaryCta: 'Book Appointment',
    secondaryCta: 'Our Treatments',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
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
    phone: '+91 81108 23730',
    whatsapp: '91 81108 23730',
    email: 'boaive.tech@gmail.com',
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
    instagram: 'https://instagram.com/boaive',
    facebook: 'https://facebook.com/boaive',
    youtube: 'https://youtube.com/@boaive',
  },

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
// HOME PAGE CONTENT
// ============================================================

export const clinicStats = [
  { value: '3,000+', label: 'Patients treated' },
  { value: '15+', label: 'Years of combined experience' },
  { value: '3', label: 'Specialties, one clinic' },
  { value: '4.9', label: 'Average patient rating' },
];

export const whyUs = [
  { title: 'Experienced doctors', description: 'Qualified specialists in dentistry, dermatology and trichology — you see the doctor, not a trainee.' },
  { title: 'Honest advice', description: 'We explain your options and costs up front, and only recommend what you actually need.' },
  { title: 'Clean and comfortable', description: 'Modern equipment, strict sterilisation and a calm clinic where children and seniors feel at ease.' },
  { title: 'Fair, clear pricing', description: 'Consultation fees and treatment estimates are shared before anything begins.' },
];

export const faqs = [
  { q: 'Do I need an appointment?', a: 'Appointments are recommended so you are not kept waiting, but we do accept walk-ins when a slot is free.' },
  { q: 'What happens at the first visit?', a: 'The doctor listens to your concern, examines you, explains the diagnosis and options, and shares an estimate before any treatment.' },
  { q: 'Are the treatments painful?', a: 'We use modern anaesthesia, gentle techniques and topical numbing so most treatments are comfortable. Your doctor will explain what to expect.' },
  { q: 'Can I get dental, skin and hair care in one visit?', a: 'Yes. All three departments are in the same clinic, so you can be seen by more than one specialist in a single trip.' },
];

export const resultCases = [
  { id: 'dental', category: 'Dental', title: 'Closing a gap and brightening the smile', treatment: 'Porcelain veneers and whitening', duration: '2 weeks · 2 visits', before: '/images/dental-before.jpg', after: '/images/dental-after.jpg' },
  { id: 'hair', category: 'Hair', title: 'Restoring density at the crown', treatment: 'PRP therapy', duration: '16 weeks · 4 sessions', before: '/images/hair-before.jpg', after: '/images/hair-after.jpg' },
  { id: 'skin', category: 'Skin', title: 'Clearer, more even skin', treatment: 'Peels and resurfacing', duration: '6 weeks · 3 sessions', before: '/images/skin-before.jpg', after: '/images/skin-after.jpg' },
];
