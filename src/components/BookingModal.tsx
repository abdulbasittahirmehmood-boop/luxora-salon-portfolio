import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Download, 
  Share2, 
  MessageSquare,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Service, Staff, Booking, SalonLocation, Offer } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  staffList: Staff[];
  currentLocation: SalonLocation;
  preselectedServiceId?: string;
  preselectedStaffId?: string;
  preselectedOffer?: Offer;
  onBookingConfirmed: (booking: Booking) => void;
}

type Step = 'service' | 'staff' | 'date' | 'time' | 'details' | 'review' | 'success';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  staffList,
  currentLocation,
  preselectedServiceId,
  preselectedStaffId,
  preselectedOffer,
  onBookingConfirmed,
}) => {
  // Step state
  const [currentStep, setCurrentStep] = useState<Step>('service');

  // Booking selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedStaffId, setSelectedStaffId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Customer details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');

  // Validation errors
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Async submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [simulateErrorToggle, setSimulateErrorToggle] = useState<boolean>(false);

  // Available Time Slots
  const timeSlots = [
    { time: '09:30 AM', period: 'Morning', available: true },
    { time: '10:30 AM', period: 'Morning', available: true },
    { time: '11:30 AM', period: 'Morning', available: false },
    { time: '01:00 PM', period: 'Afternoon', available: true },
    { time: '02:00 PM', period: 'Afternoon', available: true },
    { time: '03:15 PM', period: 'Afternoon', available: true },
    { time: '04:30 PM', period: 'Afternoon', available: true },
    { time: '05:45 PM', period: 'Evening', available: true },
    { time: '07:00 PM', period: 'Evening', available: false },
    { time: '08:00 PM', period: 'Evening', available: true },
  ];

  // Set default / preselected values when opening
  useEffect(() => {
    if (isOpen) {
      if (preselectedServiceId) {
        setSelectedServiceId(preselectedServiceId);
      } else if (!selectedServiceId && services.length > 0) {
        setSelectedServiceId(services[0].id);
      }

      if (preselectedStaffId) {
        setSelectedStaffId(preselectedStaffId);
      }

      // Default date to tomorrow if unset
      if (!selectedDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        setSelectedDate(`${yyyy}-${mm}-${dd}`);
      }
    }
  }, [isOpen, preselectedServiceId, preselectedStaffId, services]);

  // Support Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        handleCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting]);

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedStaff = selectedStaffId === 'any' 
    ? { id: 'any', name: 'First Available Master Specialist', role: 'LUXORA Collective' } 
    : staffList.find((s) => s.id === selectedStaffId) || { id: 'any', name: 'First Available Master Specialist', role: 'LUXORA Collective' };

  const handleCancel = () => {
    setFormErrors({});
    setSubmitError(null);
    onClose();
  };

  const validateDetails = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      errors.name = 'Please provide your full legal or preferred name (min 2 characters).';
    }

    // Phone validation
    const cleanPhone = customerPhone.replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errors.phone = 'Please enter a valid phone number for SMS booking updates.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim() || !emailRegex.test(customerEmail)) {
      errors.email = 'Please provide a valid email address to receive your confirmation receipt.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    setFormErrors({});

    if (currentStep === 'service') {
      if (!selectedServiceId) {
        setFormErrors({ service: 'Please select a salon ritual to continue.' });
        return;
      }
      setCurrentStep('staff');
    } else if (currentStep === 'staff') {
      setCurrentStep('date');
    } else if (currentStep === 'date') {
      if (!selectedDate) {
        setFormErrors({ date: 'Please select an appointment date.' });
        return;
      }
      setCurrentStep('time');
    } else if (currentStep === 'time') {
      if (!selectedTime) {
        setFormErrors({ time: 'Please select an available time slot.' });
        return;
      }
      setCurrentStep('details');
    } else if (currentStep === 'details') {
      if (!validateDetails()) return;
      setCurrentStep('review');
    }
  };

  const handlePrevStep = () => {
    setFormErrors({});
    setSubmitError(null);
    if (currentStep === 'staff') setCurrentStep('service');
    else if (currentStep === 'date') setCurrentStep('staff');
    else if (currentStep === 'time') setCurrentStep('date');
    else if (currentStep === 'details') setCurrentStep('time');
    else if (currentStep === 'review') setCurrentStep('details');
  };

  // Submit appointment with Loading -> Success or Error -> Retry handling
  const handleConfirmBooking = () => {
    if (isSubmitting) return; // Prevent double click duplicate submissions

    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate server communication latency
    setTimeout(() => {
      // Check if user toggled simulated failure to test recovery
      if (simulateErrorToggle) {
        setIsSubmitting(false);
        setSubmitError('Booking dispatch failed: Simulated gateway interruption. Please retry your submission.');
        return;
      }

      // Success
      const refCode = `LUX-${Math.floor(10000 + Math.random() * 90000)}`;
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        reference: refCode,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        staffId: selectedStaff.id,
        staffName: selectedStaff.name,
        date: selectedDate,
        time: selectedTime,
        customerName: customerName.trim(),
        phone: customerPhone.trim(),
        email: customerEmail.trim(),
        notes: customerNotes.trim(),
        price: selectedService.price,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        locationId: currentLocation.id,
      };

      setCreatedBooking(newBooking);
      onBookingConfirmed(newBooking);
      setIsSubmitting(false);
      setCurrentStep('success');

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#6366f1', '#e9d5ff', '#3b82f6'],
        });
      } catch (e) {
        // safe fallback
      }
    }, 1200);
  };

  // Generate .ics calendar download
  const handleDownloadCalendar = () => {
    if (!createdBooking) return;
    const cleanDate = createdBooking.date.replace(/-/g, '');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LUXORA Salon & Barber//EN
BEGIN:VEVENT
SUMMARY:LUXORA: ${createdBooking.serviceName}
DESCRIPTION:Appointment with ${createdBooking.staffName} at ${currentLocation.name}. Reference: ${createdBooking.reference}
LOCATION:${currentLocation.address}, ${currentLocation.city}
DTSTART:${cleanDate}T140000Z
DTEND:${cleanDate}T150000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `LUXORA-Booking-${createdBooking.reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Steps Progress labels
  const stepsList: { id: Step; label: string }[] = [
    { id: 'service', label: '1. Service' },
    { id: 'staff', label: '2. Specialist' },
    { id: 'date', label: '3. Date' },
    { id: 'time', label: '4. Time' },
    { id: 'details', label: '5. Details' },
    { id: 'review', label: '6. Review' },
  ];

  const currentStepIndex = stepsList.findIndex((s) => s.id === currentStep);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      id="booking-modal-overlay"
      onClick={handleCancel}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0e0c18] border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-950/60 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="booking-modal-dialog"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                Online Reservation
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/30 border border-purple-500/30 text-purple-300">
                {currentLocation.name}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {currentStep === 'success' ? 'Appointment Confirmed' : 'Book Your Ritual'}
            </h2>
          </div>

          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors focus:outline-none"
            aria-label="Cancel booking"
            id="booking-close-x-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker (hidden on success) */}
        {currentStep !== 'success' && (
          <div className="bg-zinc-900/40 px-6 py-2.5 border-b border-zinc-800/60 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[460px] gap-2">
              {stepsList.map((step, idx) => {
                const isPassed = currentStepIndex > idx;
                const isCurrent = currentStep === step.id;
                return (
                  <div key={step.id} className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        // Allow clicking past steps to jump back easily
                        if (isPassed && !isSubmitting) {
                          setCurrentStep(step.id);
                        }
                      }}
                      disabled={!isPassed || isSubmitting}
                      className={`text-xs font-mono flex items-center gap-1.5 transition-colors ${
                        isCurrent
                          ? 'text-purple-300 font-bold'
                          : isPassed
                          ? 'text-zinc-400 hover:text-white cursor-pointer'
                          : 'text-zinc-600 cursor-not-allowed'
                      }`}
                      id={`booking-step-crumb-${step.id}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                          isCurrent
                            ? 'bg-purple-600 text-white'
                            : isPassed
                            ? 'bg-purple-900/60 text-purple-300'
                            : 'bg-zinc-800 text-zinc-600'
                        }`}
                      >
                        {isPassed ? <Check className="w-3 h-3" /> : idx + 1}
                      </span>
                      <span>{step.label.split('. ')[1]}</span>
                    </button>
                    {idx < stepsList.length - 1 && (
                      <span className="text-zinc-700 text-xs">/</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Scrollable Step Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: SERVICE */}
          {currentStep === 'service' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Select Required Service
                </label>
                <span className="text-xs text-purple-400">{services.length} Rituals Available</span>
              </div>

              {formErrors.service && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formErrors.service}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {services.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-purple-950/60 border-purple-400 shadow-md shadow-purple-900/40'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                      }`}
                      id={`select-service-${srv.id}`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <img
                          src={srv.image}
                          alt={srv.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-white font-heading">
                            {srv.name}
                          </h4>
                          <span className="text-[10px] font-mono text-purple-300 uppercase">
                            {srv.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs font-mono">
                        <span className="text-zinc-400">{srv.duration} mins</span>
                        <span className="text-white font-bold">${srv.price} USD</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: STAFF / SPECIALIST */}
          {currentStep === 'staff' && (
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                Choose Barber or Stylist
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option: Any Available */}
                <div
                  onClick={() => setSelectedStaffId('any')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedStaffId === 'any'
                      ? 'bg-purple-950/60 border-purple-400 shadow-md shadow-purple-900/40'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                  id="select-staff-any"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">
                      First Available Specialist
                    </h4>
                    <p className="text-xs text-zinc-400">Earliest opening with any master artisan</p>
                  </div>
                </div>

                {/* Specific Staff Members */}
                {staffList.map((st) => {
                  const isSelected = selectedStaffId === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStaffId(st.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-purple-950/60 border-purple-400 shadow-md shadow-purple-900/40'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                      id={`select-staff-${st.id}`}
                    >
                      <img
                        src={st.image}
                        alt={st.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white font-heading truncate">
                          {st.name}
                        </h4>
                        <p className="text-xs text-purple-300 truncate">{st.role}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">Rating: {st.rating} ★</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE */}
          {currentStep === 'date' && (
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                Select Desired Date
              </label>

              {formErrors.date && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formErrors.date}</span>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-white">Choose from calendar</span>
                </div>

                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-black/60 border border-zinc-700 text-white font-mono text-sm focus:border-purple-500 focus:outline-none"
                  id="booking-date-input"
                />

                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  LUXORA is open Monday through Saturday from 09:00 AM to 09:00 PM, and Sunday from 10:00 AM to 06:00 PM. Same-day appointments subject to schedule openings.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: AVAILABLE TIME SLOTS */}
          {currentStep === 'time' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Select Time Slot ({selectedDate})
                </label>
                <span className="text-xs text-purple-300 font-mono">
                  {selectedService.duration} min session
                </span>
              </div>

              {formErrors.time && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formErrors.time}</span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot, index) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3.5 rounded-xl text-center border font-mono text-xs transition-all flex flex-col items-center justify-center gap-1 ${
                        !slot.available
                          ? 'bg-zinc-950/40 border-zinc-900 text-zinc-600 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-900/50 font-bold'
                          : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                      }`}
                      id={`time-slot-btn-${slot.time.replace(/[\s:]/g, '-')}`}
                    >
                      <span className="text-sm">{slot.time}</span>
                      <span className="text-[10px] text-zinc-400 font-sans">
                        {slot.available ? slot.period : 'Booked'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: CUSTOMER DETAILS */}
          {currentStep === 'details' && (
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                Guest Identification & Contact
              </label>

              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="e.g. Julian Sterling"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border text-xs text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        formErrors.name ? 'border-rose-500' : 'border-zinc-800 focus:border-purple-500'
                      }`}
                      id="customer-name-input"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Mobile Phone <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 019-2834"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border text-xs text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        formErrors.phone ? 'border-rose-500' : 'border-zinc-800 focus:border-purple-500'
                      }`}
                      id="customer-phone-input"
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      placeholder="e.g. jsterling@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border text-xs text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        formErrors.email ? 'border-rose-500' : 'border-zinc-800 focus:border-purple-500'
                      }`}
                      id="customer-email-input"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Special Requests or Styling Notes (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                    <textarea
                      rows={2}
                      placeholder="e.g. Low skin taper, sensitive skin on neckline, preparing for evening gala..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-purple-500 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all resize-none"
                      id="customer-notes-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW SUMMARY */}
          {currentStep === 'review' && (
            <div className="space-y-5">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                Review Appointment Specification
              </label>

              {submitError && (
                <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/60 text-rose-300 text-xs flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Submission Gateway Notice</span>
                  </div>
                  <p>{submitError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSimulateErrorToggle(false);
                      setSubmitError(null);
                      // Slight delay to allow state clear before re-invoking
                      setTimeout(() => {
                        handleConfirmBooking();
                      }, 50);
                    }}
                    className="self-start px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 border border-rose-400 text-white text-xs mt-1 inline-flex items-center gap-1.5 shadow-sm transition-all"
                    id="booking-retry-submission-btn"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Submission</span>
                  </button>
                </div>
              )}

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                {/* Service row with edit button */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Ritual
                    </span>
                    <span className="text-sm font-bold text-white font-heading">
                      {selectedService.name}
                    </span>
                    <span className="text-xs text-purple-300 block font-mono">
                      {selectedService.duration} Minutes • ${selectedService.price} USD
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentStep('service')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium underline"
                    id="edit-service-selection-btn"
                  >
                    Change
                  </button>
                </div>

                {/* Specialist row */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Specialist
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {selectedStaff.name}
                    </span>
                    <span className="text-xs text-zinc-400 block">
                      {selectedStaff.role}
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentStep('staff')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium underline"
                    id="edit-staff-selection-btn"
                  >
                    Change
                  </button>
                </div>

                {/* Date & Time row */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Date & Slot
                    </span>
                    <span className="text-sm font-semibold text-white font-mono">
                      {selectedDate} at {selectedTime}
                    </span>
                    <span className="text-xs text-zinc-400 block">
                      {currentLocation.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentStep('date')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium underline"
                    id="edit-time-selection-btn"
                  >
                    Change
                  </button>
                </div>

                {/* Guest Contact row */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Guest Information
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {customerName}
                    </span>
                    <span className="text-xs text-zinc-400 block">
                      {customerPhone} • {customerEmail}
                    </span>
                    {customerNotes && (
                      <span className="text-xs text-zinc-500 italic block mt-1">
                        Note: "{customerNotes}"
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setCurrentStep('details')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium underline"
                    id="edit-details-selection-btn"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Error Simulation Tester Tooltip for requirement testing */}
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between text-xs">
                <span className="text-zinc-400">
                  Audit tool: Test Error & Retry flow
                </span>
                <button
                  type="button"
                  onClick={() => setSimulateErrorToggle(!simulateErrorToggle)}
                  className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
                    simulateErrorToggle
                      ? 'bg-rose-900 text-rose-200 border border-rose-500'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                  id="simulate-error-toggle-btn"
                >
                  {simulateErrorToggle ? 'Simulate Failure: ON' : 'Simulate Failure: OFF'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: SUCCESS CONFIRMATION RECEIPT */}
          {currentStep === 'success' && createdBooking && (
            <div className="space-y-6 text-center py-2 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                  Reservation Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-2">
                  We look forward to welcoming you.
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                  A confirmation SMS and calendar invitation have been registered for{' '}
                  <span className="text-white font-semibold">{createdBooking.customerName}</span>.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-purple-500/30 text-left space-y-3 max-w-lg mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-mono text-zinc-400">Booking Reference</span>
                  <span className="text-sm font-mono font-bold text-purple-300 px-2.5 py-1 rounded bg-purple-950/60 border border-purple-500/30">
                    {createdBooking.reference}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 block font-mono text-[10px]">Service</span>
                    <span className="font-semibold text-white">{createdBooking.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-mono text-[10px]">Specialist</span>
                    <span className="font-semibold text-white">{createdBooking.staffName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-mono text-[10px]">Date & Time</span>
                    <span className="font-semibold text-white font-mono">
                      {createdBooking.date} @ {createdBooking.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-mono text-[10px]">Location</span>
                    <span className="font-semibold text-white">{currentLocation.name}</span>
                  </div>
                </div>
              </div>

              {/* Transparent storage notice per brief */}
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 max-w-lg mx-auto text-left flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 text-purple-400 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-zinc-300">
                  <strong className="text-purple-300">Demo Architecture Note:</strong> This booking is securely saved in your browser session and synchronized with the LUXORA SaaS Admin Suite.
                </p>
              </div>

              {/* Post-booking Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-white flex items-center gap-2 transition-all shadow-sm"
                  id="download-ics-calendar-btn"
                >
                  <Download className="w-4 h-4 text-purple-400" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={`https://wa.me/${currentLocation.whatsapp}?text=Hi%20LUXORA,%20I%20just%20booked%20reference%20${createdBooking.reference}%20for%20${createdBooking.serviceName}%20on%20${createdBooking.date}%20at%20${createdBooking.time}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-xs font-medium text-emerald-300 flex items-center gap-2 transition-all shadow-sm"
                  id="whatsapp-share-booking-btn"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>

                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white uppercase tracking-wider transition-all shadow-md shadow-purple-900/40"
                  id="booking-finish-return-home-btn"
                >
                  <span>Return to Salon</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls (hidden on success) */}
        {currentStep !== 'success' && (
          <div className="p-4 sm:p-6 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between gap-3">
            <div>
              {currentStep !== 'service' ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                  id="booking-step-back-btn"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all"
                  id="booking-step-cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep !== 'review' ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-purple-900/40 transition-all"
                  id="booking-step-continue-btn"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmBooking}
                  className={`px-4 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-900/40 transition-all ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  id="booking-step-confirm-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>
                        Confirm <span className="hidden sm:inline">& Book Appointment</span>
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
