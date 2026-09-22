import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { Salon3DExperience } from './components/Salon3DExperience';
import { TeamSection } from './components/TeamSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { OffersSection } from './components/OffersSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ClosingSection } from './components/ClosingSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { WixBlueprintModal } from './components/WixBlueprintModal';
import { BackToTop } from './components/BackToTop';

import { 
  SERVICES, 
  STAFF_MEMBERS, 
  REVIEWS, 
  OFFERS, 
  SALON_LOCATIONS, 
  INITIAL_BOOKINGS 
} from './data/mockData';
import { Service, Staff, Review, Offer, SalonLocation, Booking } from './types';
import { MessageSquare, Calendar, Sliders, Layers } from 'lucide-react';

export default function App() {
  // Live dynamic app state
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [staffList, setStaffList] = useState<Staff[]>(STAFF_MEMBERS);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [offers, setOffers] = useState<Offer[]>(OFFERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [currentLocation, setCurrentLocation] = useState<SalonLocation>(SALON_LOCATIONS[0]);

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedStaffId, setPreselectedStaffId] = useState<string | undefined>(undefined);
  const [preselectedOffer, setPreselectedOffer] = useState<Offer | undefined>(undefined);

  const [detailService, setDetailService] = useState<Service | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWixGuideOpen, setIsWixGuideOpen] = useState(false);

  // Handlers for starting bookings with preselected contexts
  const handleOpenGeneralBooking = () => {
    setPreselectedServiceId(undefined);
    setPreselectedStaffId(undefined);
    setPreselectedOffer(undefined);
    setIsBookingOpen(true);
  };

  const handleBookService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedStaffId(undefined);
    setPreselectedOffer(undefined);
    setIsBookingOpen(true);
  };

  const handleBookWithStaff = (staffId: string) => {
    setPreselectedStaffId(staffId);
    setPreselectedServiceId(undefined);
    setPreselectedOffer(undefined);
    setIsBookingOpen(true);
  };

  const handleBookWithOffer = (offer: Offer) => {
    setPreselectedOffer(offer);
    setPreselectedStaffId(undefined);
    // Find matching service if applicable
    const matchSrv = services.find((s) =>
      s.name.toLowerCase().includes(offer.title.toLowerCase().split(' ')[0])
    );
    setPreselectedServiceId(matchSrv ? matchSrv.id : undefined);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    // Add to bookings collection with current location attached
    setBookings((prev) => [{ ...newBooking, locationId: currentLocation.id }, ...prev]);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-zinc-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200">
      {/* Primary Sticky Luxury Navigation */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenWixGuide={() => setIsWixGuideOpen(true)}
        currentLocation={currentLocation}
      />

      {/* Main Landing Flow */}
      <main className="flex-1">
        {/* Stage 1 & 2: Hero Section */}
        <Hero
          onOpenBooking={handleOpenGeneralBooking}
          onExploreSalon={() =>
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
          }
          currentLocation={currentLocation}
        />

        {/* Stage 3: Services Grid with Filtering & Price Display */}
        <ServicesSection
          services={services}
          onBookService={handleBookService}
        />

        {/* Stage 4: Interactive 3D Salon Experience & Hotspot Tour */}
        <Salon3DExperience onOpenBooking={handleOpenGeneralBooking} />

        {/* Stage 5: Gallery Visual Archive with Lightbox */}
        <GallerySection />

        {/* Stage 6: Collective Team Flip Cards */}
        <TeamSection
          staffList={staffList}
          onBookWithStaff={handleBookWithStaff}
        />

        {/* Stage 7: Patron Verdicts & Write Review Engine */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Stage 8: Exclusive Invitations & Offers */}
        <OffersSection
          offers={offers}
          onBookWithOffer={handleBookWithOffer}
        />

        {/* Stage 9: Atelier Philosophy / About */}
        <AboutSection />

        {/* Stage 10: Concierge & Multi-Salon Locations */}
        <ContactSection
          currentLocation={currentLocation}
          onSelectLocation={(loc) => setCurrentLocation(loc)}
        />

        {/* Cinematic Closing CTA */}
        <ClosingSection
          onOpenBooking={handleOpenGeneralBooking}
          currentLocation={currentLocation}
        />
      </main>

      {/* Footer */}
      <Footer
        currentLocation={currentLocation}
        onOpenBooking={handleOpenGeneralBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenWixGuide={() => setIsWixGuideOpen(true)}
      />

      {/* FLOATING ACTION PILLS (Bottom Right: WhatsApp & Quick Book) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
        {/* Back to top button positioned right above WhatsApp & Book buttons */}
        <BackToTop />

        <button
          onClick={handleOpenGeneralBooking}
          className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold uppercase tracking-wider shadow-2xl shadow-purple-900/60 border border-purple-400/40 hover:scale-105 active:scale-95 transition-all"
          id="floating-book-now-btn"
        >
          <Calendar className="w-4 h-4 text-purple-200" />
          <span>Book Ritual</span>
        </button>

        <a
          href={`https://wa.me/${currentLocation.whatsapp}?text=Hello%20LUXORA,%20I%20would%20like%20to%20connect%20with%20your%20studio%20concierge.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/70 border border-emerald-400/30 hover:scale-105 active:scale-95 transition-all"
          aria-label="Direct WhatsApp Concierge"
          id="floating-whatsapp-btn"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="hidden sm:inline text-xs font-semibold tracking-wide">
            WhatsApp Concierge
          </span>
        </a>
      </div>

      {/* SERVICE DETAIL MODAL */}
      <ServiceDetailModal
        service={detailService}
        onClose={() => setDetailService(null)}
        onBookService={(serviceId: string) => {
          setDetailService(null);
          handleBookService(serviceId);
        }}
      />

      {/* FULL BOOKING FLOW MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        staffList={staffList}
        preselectedServiceId={preselectedServiceId}
        preselectedStaffId={preselectedStaffId}
        preselectedOffer={preselectedOffer}
        onBookingConfirmed={handleBookingConfirmed}
        currentLocation={currentLocation}
      />

      {/* ADMIN & MULTI-SALON SAAS DASHBOARD MODAL */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bookings={bookings}
        services={services}
        staffList={staffList}
        reviews={reviews}
        offers={offers}
        onUpdateBookings={setBookings}
        onUpdateServices={setServices}
        onUpdateStaff={setStaffList}
        onUpdateOffers={setOffers}
        onUpdateReviews={setReviews}
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
      />

      {/* PHASE 1: WIX STUDIO LAUNCH BLUEPRINT MODAL */}
      <WixBlueprintModal
        isOpen={isWixGuideOpen}
        onClose={() => setIsWixGuideOpen(false)}
      />
    </div>
  );
}
