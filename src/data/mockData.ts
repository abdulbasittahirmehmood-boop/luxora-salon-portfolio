import { Service, Staff, Review, Offer, GalleryItem, SalonLocation, Hotspot, Booking } from '../types';

export const INITIAL_SERVICES: Service[] = [
  // HAIR
  {
    id: 'hair-mens-cut',
    name: "Men’s Haircut",
    category: 'hair',
    shortDesc: 'Precision scissor and clipper sculpting paired with hot lather neck shave and finishing wash.',
    fullDesc: 'A comprehensive grooming ritual designed for modern distinction. Includes personal consultation, scalp detox cleansing, structural hair architecture, razor edge alignment, and matte/gloss finish styling.',
    duration: 45,
    price: 65,
    popular: true,
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    features: ['Consultation & scalp analysis', 'Precision clipper/shear cut', 'Hot lather neck taper', 'Revitalizing tonic scalp massage']
  },
  {
    id: 'hair-womens-cut',
    name: "Women’s Haircut",
    category: 'hair',
    shortDesc: 'Bespoke precision cutting, texturizing, blowout, and infrared nutrient infusion.',
    fullDesc: 'Sculptural haircut tailored to your bone structure and hair movement. Includes botanical botanical bath, custom layering, split-end elimination, and signature LUXORA voluminous blowout.',
    duration: 60,
    price: 95,
    popular: true,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    features: ['Face-framing design', 'Signature silk blowout', 'Deep hydration rinse', 'Thermal heat protection']
  },
  {
    id: 'hair-styling',
    name: 'Hair Styling',
    category: 'hair',
    shortDesc: 'Editorial thermal styling, sleek waves, high-impact volume, or avant-garde sculpts.',
    fullDesc: 'Whether preparing for a premiere or personal engagement, our master stylists craft resilient, camera-ready hairstyles using precision heat tools and micro-mist setting polymers.',
    duration: 50,
    price: 75,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    features: ['Thermal wave sculpting', 'Volume roots lift', 'Shine seal glaze', 'Long-lasting hold']
  },
  {
    id: 'hair-coloring',
    name: 'Hair Coloring',
    category: 'hair',
    shortDesc: 'Balayage, futuristic platinum, lived-in gloss, and multi-dimensional toners.',
    fullDesc: 'Advanced chromatic formulation protecting hair integrity with bond-building plex technology. From rich espresso glosses to crystalline silvers and vibrant ultraviolet accents.',
    duration: 120,
    price: 180,
    popular: true,
    image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=800&q=80',
    features: ['Custom pigment blend', 'Olaplex bond reconstructor', 'Post-color gloss glaze', 'Color lock hydration mask']
  },
  {
    id: 'hair-treatment',
    name: 'Hair Treatment',
    category: 'hair',
    shortDesc: 'Keratin smoothing, peptide cellular restoration, and cryo-infusion hair therapy.',
    fullDesc: 'Intensive restorative care formulated to undo chemical, heat, and environmental damage. Leaves the cuticle glass-smooth, eliminates frizz, and restores tensile elasticity.',
    duration: 60,
    price: 110,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    features: ['Peptide deep penetration', 'Nano-mist cuticle steaming', 'Split-end bonding', 'Glass hair mirror finish']
  },

  // GROOMING
  {
    id: 'groom-beard-care',
    name: 'Beard Grooming',
    category: 'grooming',
    shortDesc: 'Beard shape sculpting, essential oil hot towel wrap, and natural bristle conditioning.',
    fullDesc: 'Refine your facial silhouette with geometric symmetry. Features trimming, length gradation, high cheek and neckline razor detailing, followed by sandalwood conditioning butter.',
    duration: 35,
    price: 45,
    popular: true,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    features: ['Geometric perimeter shaping', 'Steam towel infusion', 'Nutrient beard butter', 'Foil shaver clean-up']
  },
  {
    id: 'groom-beard-style',
    name: 'Beard Styling',
    category: 'grooming',
    shortDesc: 'Full facial hair transformation, fade blend into sideburns, and contour enhancement.',
    fullDesc: 'Tailored for longer, dense beards or complete restructuring. We sculpt your jawline definition, blend the fade seamlessly into your haircut, and apply organic conditioning wax.',
    duration: 45,
    price: 55,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    features: ['Jawline illusion sculpting', 'Sideburn fade integration', 'Moustache wax styling', 'Hydrating beard serum']
  },
  {
    id: 'groom-premium-shave',
    name: 'Premium Shave',
    category: 'grooming',
    shortDesc: 'Traditional straight razor shave with 3-step hot towel therapy and cold stone closure.',
    fullDesc: 'The apex of classic barbering. Botanical pre-shave oil, thick warm badger-brush lather, twin-pass straight edge shave, and cold obsidian stone compress to tighten pores.',
    duration: 50,
    price: 60,
    popular: true,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    features: ['Triple eucalyptus steam towels', 'Feather straight razor shave', 'Cold stone pore contraction', 'Aftershave soothing balm']
  },

  // BEAUTY
  {
    id: 'beauty-facial',
    name: 'Facial & Skin Care',
    category: 'beauty',
    shortDesc: 'Ultrasonic pore cleansing, LED light therapy, and hyaluronic acid hydration bath.',
    fullDesc: 'Custom targeted facial treatment designed to purify congested pores, brighten dull skin, and stimulate collagen production. Leaves you rested, toned, and visibly illuminated.',
    duration: 60,
    price: 120,
    popular: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    features: ['Ultrasonic skin scrubbing', 'Targeted LED collagen light', 'Peptide firming massage', 'Hydrating jelly mask']
  },
  {
    id: 'beauty-event-style',
    name: 'Event / Party Styling',
    category: 'beauty',
    shortDesc: 'Comprehensive event look combining hair updos, soft glamorous waves, and red-carpet glow.',
    fullDesc: 'Engineered for galas, stage appearances, and high-profile social nights. Includes structured pins, thermal lock styling, and accessory placement for 12+ hour perfection.',
    duration: 75,
    price: 140,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    features: ['Updo or Hollywood waves', 'Hair ornament/clip integration', 'Humidity lock setting spray', 'Emergency touch-up kit']
  },
  {
    id: 'beauty-bridal-style',
    name: 'Bridal Styling',
    category: 'beauty',
    shortDesc: 'Luxury wedding day hair architecture, veil placement, and complete ceremonial aesthetic.',
    fullDesc: 'Our highest tier styling experience. Includes a pre-wedding consultation, veil pinning, and bespoke romantic or sleek architectural hairdo crafted to withstand emotional vows and all-night celebration.',
    duration: 90,
    price: 220,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    features: ['Master stylist dedication', 'Veil & tiara securement', 'Champagne arrival ritual', 'Hair care touch-up travel case']
  }
];

export const INITIAL_STAFF: Staff[] = [
  {
    id: 'staff-marcus',
    name: 'Marcus Vance',
    role: 'Master Barber & Founder',
    bio: 'Dedicated to geometric fade architecture and precision straight razor rituals. Trained in London and Tokyo barber ateliers.',
    specialties: ['Taper & Burst Fades', 'Hot Lather Straight Razor', 'Beard Silhouette Sculpting'],
    experience: '12 Years Master Craftsmanship',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    rating: 4.98,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: 'staff-elena',
    name: 'Elena Rostova',
    role: 'Creative Hair Director',
    bio: 'Specialist in avant-garde cutting, multidimensional balayage, and restorative keratin hair therapies.',
    specialties: ['Modern Shags & Bobs', 'Platinum & Chromatic Balayage', 'Silk Press Blowouts'],
    experience: '10 Years Editorial & Salon Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 4.96,
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'staff-dante',
    name: 'Dante Mercer',
    role: 'Senior Grooming Artisan',
    bio: 'Combines traditional Italian barbering with contemporary sharp edge detailing and botanical skin therapies.',
    specialties: ['Classic Scissor Work', 'Beard Reconstruction', 'Scalp Detox Therapy'],
    experience: '8 Years Luxury Barbering',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.94,
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'staff-chloe',
    name: 'Chloe Thorne',
    role: 'Bridal & Aesthetic Specialist',
    bio: 'Renowned for gala aesthetics, intricate bridal hair architecture, and high-frequency skin revitalizations.',
    specialties: ['Bridal Updos', 'Hollywood Glam Waves', 'Ultrasonic Skin Facials'],
    experience: '9 Years Event & Skin Artistry',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    rating: 4.97,
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alexander Sterling',
    role: 'Tech Executive',
    rating: 5,
    comment: 'The atmosphere at LUXORA feels twenty years ahead of every other salon. Marcus delivered the most precise fade and straight razor shave I have ever experienced. Pristine cleanliness and top-tier service.',
    date: '2 days ago',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    author: 'Sophia Chen',
    role: 'Creative Director',
    rating: 5,
    comment: 'Elena transformed my hair with a multi-tonal dimensional color and textured cut that moves effortlessly. The 3D salon preview online was super cool, and the real space is even more striking in person.',
    date: '1 week ago',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    author: 'Julian Moreau',
    role: 'Architect',
    rating: 5,
    comment: 'Flawless beard contouring and hot towel treatment from Dante. The ambient lighting and acoustic design in the studio makes the appointment a genuine meditation. Booking online took less than a minute.',
    date: '2 weeks ago',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-4',
    author: 'Genevieve Ross',
    role: 'Event Producer',
    rating: 5,
    comment: 'Chloe handled our bridal party styling. Every style stayed intact for over 14 hours. LUXORA represents absolute luxury without any snobbery—just pure mastery and gracious hospitality.',
    date: '3 weeks ago',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'offer-first-visit',
    title: 'The LUXORA Induction Ritual',
    description: 'Complimentary botanical scalp detox and hot towel facial compress when booking any Master Haircut or Styling.',
    code: 'INDUCTION25',
    discountPercent: 20,
    validUntil: 'Valid this month',
    expired: false,
    category: 'First-Time Guests',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-duo',
    title: 'Grooming Sovereign Package',
    description: 'Men’s Haircut + Premium Hot Towel Straight Razor Shave bundled with custom beard hydration elixir.',
    code: 'SOVEREIGN',
    discountAmount: 25,
    validUntil: 'Ongoing Membership',
    expired: false,
    category: 'Grooming Bundle',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-vip-color',
    title: 'Chromatic Radiance & Plex',
    description: 'Full dimensional balayage or gloss paired with deep restructuring treatment and take-home serum.',
    code: 'CHROMATIC',
    discountPercent: 15,
    validUntil: 'Through End of Quarter',
    expired: false,
    category: 'Color Transformation',
    image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-summer-glow',
    title: 'Summer Solstice Glow (Expired)',
    description: 'Seasonal cryo-facial paired with summer silk blowout. This limited promotion has concluded.',
    code: 'SOLSTICE',
    discountPercent: 30,
    validUntil: 'Expired August 31',
    expired: true,
    category: 'Archived Promo',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Textured Razor Taper',
    category: 'grooming',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80',
    description: 'High fade with razor contoured parting and natural matte clay finish.'
  },
  {
    id: 'gal-2',
    title: 'Ultraviolet Platinum Tone',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=900&q=80',
    description: 'Double-process cool ice blonde with subtle lavender dimensional undertones.'
  },
  {
    id: 'gal-3',
    title: 'The Futuristic Barber Chamber',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80',
    description: 'Custom Japanese hydraulic chairs framed by recessed violet LED halo illumination.'
  },
  {
    id: 'gal-4',
    title: 'Sculpted Beard Architecture',
    category: 'grooming',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
    description: 'Sharp geometric cheek lines blended down to a natural dense square taper.'
  },
  {
    id: 'gal-5',
    title: 'Red Carpet Silk Waves',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    description: 'Smooth s-curve thermal waves with glass reflection serum and soft volume.'
  },
  {
    id: 'gal-6',
    title: 'Executive VIP Lounge',
    category: 'vip',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    description: 'Private single-suite styling room with acoustic isolation and espresso bar.'
  },
  {
    id: 'gal-7',
    title: 'Ultrasonic Hydro-Cleansing',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    description: 'Deep pore dermal infusion utilizing micro-current botanical serum delivery.'
  },
  {
    id: 'gal-8',
    title: 'Modern Bridal Architecture',
    category: 'vip',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    description: 'Architectural bridal updo intertwined with titanium crystalline hair pins.'
  }
];

export const SALON_LOCATIONS: SalonLocation[] = [
  {
    id: 'loc-flagship',
    name: 'LUXORA Flagship Studio',
    tagline: 'The Apex of Futuristic Grooming',
    address: '450 Neo Horizon Boulevard, Suite 100',
    city: 'Metropolis Central',
    phone: '+1 (555) 234-5890',
    whatsapp: '15552345890',
    email: 'concierge@luxorasalon.com',
    hours: {
      weekdays: '09:00 AM – 09:00 PM',
      saturday: '09:00 AM – 08:00 PM',
      sunday: '10:00 AM – 06:00 PM'
    },
    mapUrl: 'https://maps.google.com/?q=Metropolis+Central+Salon'
  },
  {
    id: 'loc-cyber',
    name: 'LUXORA Cyber District',
    tagline: 'High-Tech Express & Styling Bar',
    address: '88 Cybernetics Way, Level 2',
    city: 'Innovation Park',
    phone: '+1 (555) 887-3401',
    whatsapp: '15558873401',
    email: 'cyber@luxorasalon.com',
    hours: {
      weekdays: '10:00 AM – 10:00 PM',
      saturday: '10:00 AM – 09:00 PM',
      sunday: '11:00 AM – 07:00 PM'
    },
    mapUrl: 'https://maps.google.com/?q=Innovation+Park+Salon'
  },
  {
    id: 'loc-marina',
    name: 'LUXORA Marina Sanctuary',
    tagline: 'Waterfront VIP Suites & Bridal Atelier',
    address: '12 Harbor Promenade, Penthouse 4',
    city: 'Marina Heights',
    phone: '+1 (555) 412-9088',
    whatsapp: '15554129088',
    email: 'marina@luxorasalon.com',
    hours: {
      weekdays: '09:30 AM – 08:30 PM',
      saturday: '09:00 AM – 08:00 PM',
      sunday: 'Closed for Private Bookings'
    },
    mapUrl: 'https://maps.google.com/?q=Marina+Heights+Salon'
  }
];

export const SALON_HOTSPOTS: Hotspot[] = [
  {
    id: 'entrance',
    name: '1. Salon Entrance',
    title: 'Sanctuary Entry & Grand Salon View',
    description: 'Welcome to LUXORA. Take in the expansive architecture, polished marble flooring with gold inlay, velvet lounge, and master barber stations.',
    cameraPos: [0, 2.4, 5.8],
    targetPos: [0, 1.4, -1.0],
    iconName: 'DoorOpen'
  },
  {
    id: 'reception',
    name: '2. Concierge Desk',
    title: 'Bespoke Digital Consultation',
    description: 'Executive walnut and stone reception counter with digital client management, service concierge, and refreshment service.',
    cameraPos: [-1.4, 1.8, 5.0],
    targetPos: [-2.8, 1.0, 4.0],
    iconName: 'Layers'
  },
  {
    id: 'waiting',
    name: '3. Waiting Lounge',
    title: 'Executive Velvet Decompression Suite',
    description: 'Deep charcoal velvet sofa, brass-plinth coffee table, design monographs, and complimentary artisanal espresso service.',
    cameraPos: [2.2, 1.6, 3.6],
    targetPos: [4.0, 0.8, 2.0],
    iconName: 'Coffee'
  },
  {
    id: 'chair',
    name: '4. Barber Chair',
    title: 'Ergonomic Japanese Recline Station',
    description: 'Plush tufted memory leather, heavy chrome hydraulic pedestal with 360-degree precision rotation and custom headrest.',
    cameraPos: [1.2, 1.6, 1.2],
    targetPos: [0, 1.0, -0.2],
    iconName: 'Armchair'
  },
  {
    id: 'mirror',
    name: '5. Smart Mirror Station',
    title: 'Color-Calibrated Studio Mirror & Tools',
    description: '5500K halo ring light, beveled gold frame, solid stone countertop with Damascus shears, precision clippers, and tonic bottles.',
    cameraPos: [0, 1.8, -1.8],
    targetPos: [0, 1.8, -4.3],
    iconName: 'Sparkles'
  },
  {
    id: 'products',
    name: '6. Product Vault',
    title: 'Clinical Hair & Skin Apothecary',
    description: 'Recessed walnut wall niche featuring illuminated glass shelves with organic peptide serums, styling pomades, and beard elixirs.',
    cameraPos: [-3.8, 2.0, 0.8],
    targetPos: [-5.6, 1.8, -1.5],
    iconName: 'PackageCheck'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-demo-1',
    reference: 'LUX-84920',
    serviceId: 'hair-mens-cut',
    serviceName: "Men’s Haircut",
    staffId: 'staff-marcus',
    staffName: 'Marcus Vance',
    date: '2026-09-24',
    time: '02:00 PM',
    customerName: 'David K. Miller',
    phone: '+1 (555) 438-9210',
    email: 'david.miller@example.com',
    notes: 'Low skin fade, tidy up beard line.',
    price: 65,
    status: 'confirmed',
    createdAt: '2026-09-21T10:15:00Z',
    locationId: 'loc-flagship'
  },
  {
    id: 'bk-demo-2',
    reference: 'LUX-71349',
    serviceId: 'beauty-facial',
    serviceName: 'Facial & Skin Care',
    staffId: 'staff-chloe',
    staffName: 'Chloe Thorne',
    date: '2026-09-25',
    time: '11:30 AM',
    customerName: 'Victoria Hastings',
    phone: '+1 (555) 781-3049',
    email: 'vhastings@example.com',
    notes: 'Hydration focus before weekend event.',
    price: 120,
    status: 'confirmed',
    createdAt: '2026-09-22T08:30:00Z',
    locationId: 'loc-flagship'
  }
];

// Convenience Aliases
export const SERVICES = INITIAL_SERVICES;
export const STAFF_MEMBERS = INITIAL_STAFF;
export const REVIEWS = INITIAL_REVIEWS;
export const OFFERS = INITIAL_OFFERS;

