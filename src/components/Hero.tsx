import React from 'react';
import { 
  Calendar, 
  Compass, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { SalonLocation } from '../types';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreSalon: () => void;
  currentLocation: SalonLocation;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreSalon,
  currentLocation,
}) => {
  return (
    <section
      id="hero"
      data-section="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <div id="home" className="absolute top-0 left-0" />
      {/* Cinematic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-purple-900/30 via-violet-800/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 left-10 w-96 h-96 bg-purple-950/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-950/20 blur-[130px] pointer-events-none rounded-full" />

      {/* Subtle Geometric Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a3a0a_1px,transparent_1px),linear-gradient(to_bottom,#1f1a3a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Micro-badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-6 shadow-inner shadow-purple-500/10 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>Haute Grooming & Hair Architecture</span>
        </div>

        {/* Brand Name */}
        <div className="mb-3">
          <span className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.25em] text-purple-200 uppercase block">
            LUXORA
          </span>
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 block mt-1">
            Salon & Barber
          </span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase font-heading max-w-5xl mx-auto leading-[1.08] mb-6">
          Style.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-purple-400">
            Reimagined.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Step into a new kind of salon experience.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/60 flex items-center justify-center gap-2 group"
            id="hero-book-now-btn"
          >
            <Calendar className="w-4 h-4 text-purple-200 transition-transform group-hover:scale-110" />
            <span>Book Appointment</span>
            <ArrowRight className="w-4 h-4 text-purple-200 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreSalon}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-200 hover:text-white border border-purple-500/20 hover:border-purple-500/40 font-medium text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm group"
            id="hero-explore-salon-btn"
          >
            <Compass className="w-4 h-4 text-purple-400 transition-transform group-hover:rotate-45" />
            <span>Explore Salon</span>
          </button>
        </div>

        {/* Proof & Real State Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {/* Studio Location */}
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                Selected Studio
              </p>
              <p className="text-sm font-semibold text-white truncate">
                {currentLocation.name}
              </p>
            </div>
          </div>

          {/* Real-time Availability */}
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                Next Opening
              </p>
              <p className="text-sm font-semibold text-white">
                Today at 02:30 PM
              </p>
            </div>
          </div>

          {/* Client Satisfaction */}
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
              <Star className="w-5 h-5 fill-purple-400 text-purple-400" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                Studio Rating
              </p>
              <p className="text-sm font-semibold text-white flex items-center gap-1">
                4.98 / 5.0 <span className="text-xs text-zinc-400 font-normal">(420+ Reviews)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onExploreSalon}
          aria-label="Scroll down to 3D Experience"
          className="mt-14 inline-flex flex-col items-center gap-1 text-zinc-500 hover:text-purple-400 transition-colors focus:outline-none"
          id="hero-scroll-indicator"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">
            Virtual Tour
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
