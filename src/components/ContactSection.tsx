import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  Send, 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { SalonLocation } from '../types';
import { SALON_LOCATIONS } from '../data/mockData';

interface ContactSectionProps {
  currentLocation: SalonLocation;
  onSelectLocation: (loc: SalonLocation) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLocation,
  onSelectLocation,
}) => {
  // Inquiry message form states
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!senderName.trim() || senderName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!senderEmail.trim() || !emailRegex.test(senderEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!senderMessage.trim() || senderMessage.trim().length < 8) {
      setFormError('Please provide a message or inquiry detail (min 8 characters).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setSenderName('');
        setSenderEmail('');
        setSenderMessage('');
      }, 3000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#08080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Locations & Concierge</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight uppercase mb-4">
            CONNECT WITH{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              LUXORA
            </span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed font-sans">
            Direct communications with our studio concierge, telephone booking desk, and location directions.
          </p>
        </div>

        {/* Location Selector Tabs (Multi-Salon SaaS) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {SALON_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onSelectLocation(loc)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 ${
                currentLocation.id === loc.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 font-bold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
              id={`select-loc-${loc.id}`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{loc.name}</span>
            </button>
          ))}
        </div>

        {/* Main Grid: Studio Details & Quick Inquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Contact & Hours Card */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-1">
                  Active Atelier
                </span>
                <h3 className="text-2xl font-bold font-heading text-white">
                  {currentLocation.name}
                </h3>
                <p className="text-xs text-purple-300 font-mono mt-0.5">
                  {currentLocation.tagline}
                </p>
              </div>

              {/* Contact Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Telephone */}
                <a
                  href={`tel:${currentLocation.phone}`}
                  className="p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 flex items-center gap-3 transition-all group"
                  id="contact-call-link"
                >
                  <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-300 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Call Front Desk
                    </span>
                    <span className="text-xs font-semibold text-white truncate block">
                      {currentLocation.phone}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${currentLocation.whatsapp}?text=Hello%20LUXORA,%20I%20would%20like%20to%20connect%20with%20your%20studio%20concierge.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/30 flex items-center gap-3 transition-all group"
                  id="contact-whatsapp-link"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-900/60 text-emerald-300 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block">
                      WhatsApp Chat
                    </span>
                    <span className="text-xs font-semibold text-white truncate block">
                      Instant Concierge
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${currentLocation.email}?subject=Inquiry%20for%20LUXORA`}
                  className="p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 flex items-center gap-3 transition-all group"
                  id="contact-email-link"
                >
                  <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-300 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Direct Email
                    </span>
                    <span className="text-xs font-semibold text-white truncate block">
                      {currentLocation.email}
                    </span>
                  </div>
                </a>

                {/* Address & Navigation */}
                <a
                  href={currentLocation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 flex items-center gap-3 transition-all group"
                  id="contact-directions-link"
                >
                  <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-300 group-hover:scale-105 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Get Directions
                    </span>
                    <span className="text-xs font-semibold text-white truncate block">
                      {currentLocation.city}
                    </span>
                  </div>
                </a>
              </div>

              {/* Operating Hours Table */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                    <Clock className="w-4 h-4" />
                    <span>Studio Schedule</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                    Open Today
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-sans">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Monday – Friday</span>
                    <span className="font-mono text-white">{currentLocation.hours.weekdays}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Saturday</span>
                    <span className="font-mono text-white">{currentLocation.hours.saturday}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Sunday</span>
                    <span className="font-mono text-white">{currentLocation.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/80 mt-6 text-xs text-zinc-500 font-mono">
              Address: {currentLocation.address}, {currentLocation.city}
            </div>
          </div>

          {/* Right Column: Direct Concierge Message Form */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-1">
                Direct Inquiry
              </span>
              <h3 className="text-2xl font-bold font-heading text-white mb-2">
                Send a Note to Concierge
              </h3>
              <p className="text-xs text-zinc-400 mb-6 font-sans">
                Inquire about private bridal suite buyouts, custom grooming packages, or styling consultations.
              </p>

              {messageSent ? (
                <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white font-heading">
                    Inquiry Transmitted
                  </h4>
                  <p className="text-xs text-zinc-300">
                    Our lead concierge will review your message and reply via email or phone shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs text-zinc-300 block mb-1">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Julian Sterling"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none transition-all"
                      id="inquiry-name-input"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 block mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. jsterling@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none transition-all"
                      id="inquiry-email-input"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 block mb-1">
                      Message / Special Request <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share details regarding your request or schedule preferences..."
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none transition-all resize-none"
                      id="inquiry-message-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-purple-900/30 transition-all"
                    id="submit-inquiry-btn"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to Concierge</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
