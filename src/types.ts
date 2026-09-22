export type ServiceCategory = 'hair' | 'grooming' | 'beauty';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  duration: number; // in minutes
  price: number; // in USD
  image: string;
  popular?: boolean;
  features: string[];
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  experience: string; // e.g. "9+ Years Master Barber"
  image: string;
  rating: number;
  availableDays: string[];
}

export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  reference: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
  notes?: string;
  price: number;
  status: BookingStatus;
  createdAt: string;
  locationId: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  validUntil: string;
  expired: boolean;
  category: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'hair' | 'grooming' | 'ambiance' | 'vip';
  image: string;
  description: string;
}

export interface SalonLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  mapUrl: string;
}

export interface Hotspot {
  id: string;
  name: string;
  title: string;
  description: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  iconName: string;
}
