import React from 'react';
import { Calendar, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { SalonLocation } from '../types';

interface ClosingSectionProps {
  onOpenBooking: () => void;
  currentLocation: SalonLocation;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  onOpenBooking,
  currentLocation,
}) => {
  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-[#08080c] via-[#0e0a1b] to-[#06050a] border-t border-purple-500/20">
      {/* Cinematic Center Ambient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-800/25 via-indigo-700/20 to-purple-900/25 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>The Transformation Awaits</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-white tracking-tight uppercase mb-6 leading-tight">
          YOUR NEXT LOOK{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-indigo-300">
            STARTS HERE.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-zinc-300 font-light max-w-xl mx-auto mb-10 leading-relaxed font-sans">
          Step beyond the standard salon visit. Experience tailored hair architecture, restorative grooming, and master craftsmanship.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-purple-900/50 hover:shadow-purple-700/70 transition-all duration-300 group"
            id="closing-book-appointment-btn"
          >
            <Calendar className="w-4 h-4 text-purple-200 transition-transform group-hover:scale-110" />
            <span>Book Your Appointment</span>
            <ArrowRight className="w-4 h-4 text-purple-200 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={`https://wa.me/${currentLocation.whatsapp}?text=Hello%20LUXORA,%20I%20would%20like%20to%20speak%20with%20your%20concierge.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-purple-500/20 hover:border-purple-500/40 text-xs sm:text-sm font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            id="closing-whatsapp-btn"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Talk to Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
};
