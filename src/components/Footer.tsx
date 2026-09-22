import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  Layers, 
  Sliders 
} from 'lucide-react';
import { SalonLocation } from '../types';

interface FooterProps {
  currentLocation: SalonLocation;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenWixGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLocation,
  onOpenBooking,
  onOpenAdmin,
  onOpenWixGuide,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050408] border-t border-zinc-900 text-zinc-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center font-heading font-bold text-white text-base">
                L
              </div>
              <span className="font-heading text-lg font-bold tracking-widest text-white">
                LUXORA
              </span>
            </div>
            <p className="text-zinc-400 font-sans leading-relaxed">
              Futuristic luxury salon & barber studio. Bespoke hair cutting, skin therapies, and master grooming ceremonies.
            </p>
            <p className="font-mono text-[11px] text-purple-400">
              Style. Reimagined.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-widest text-white text-xs">
              Studio Navigation
            </h4>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">
                  Service Menu
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-purple-300 transition-colors">
                  3D Virtual Studio
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-purple-300 transition-colors">
                  Visual Archive
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-purple-300 transition-colors">
                  Master Artisans
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-purple-300 transition-colors">
                  VIP Privileges
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-widest text-white text-xs">
              Direct Contact
            </h4>
            <ul className="space-y-2 font-sans">
              <li className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">{currentLocation.address}</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <a href={`tel:${currentLocation.phone}`} className="hover:underline">
                  {currentLocation.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <a href={`mailto:${currentLocation.email}`} className="hover:underline">
                  {currentLocation.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Prototype & Architecture Portals */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-widest text-white text-xs">
              Platform Architecture
            </h4>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              Explore the two-phase implementation master plan for rapid launch and custom SaaS expansion.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onOpenWixGuide}
                className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 text-purple-300 text-xs flex items-center justify-between transition-all"
                id="footer-wix-guide-btn"
              >
                <span>Phase 1: Wix Launch Blueprint</span>
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 text-zinc-300 text-xs flex items-center justify-between transition-all"
                id="footer-admin-btn"
              >
                <span>Phase 2: SaaS Admin Suite</span>
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} LUXORA Salon & Barber Inc. All rights reserved. Zero dead clicks guaranteed.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-purple-300 transition-colors text-xs font-mono"
            id="scroll-to-top-btn"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
