import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Sliders, 
  Layers, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { SalonLocation } from '../types';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, staffId?: string) => void;
  onOpenAdmin: () => void;
  onOpenWixGuide: () => void;
  currentLocation: SalonLocation;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  onOpenWixGuide,
  currentLocation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: '3D Studio', href: '#experience' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Team', href: '#team' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Offers', href: '#offers' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09080e]/90 backdrop-blur-md border-b border-purple-500/20 py-3 shadow-lg shadow-black/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-900 p-[1px] shadow-lg shadow-purple-600/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0a0910] rounded-[11px] flex items-center justify-center">
                <span className="font-heading text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-300">
                  L
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl font-bold tracking-widest text-white group-hover:text-purple-300 transition-colors">
                  LUXORA
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  SALON & BARBER
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-sans tracking-widest uppercase">
                Style. Reimagined.
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs uppercase tracking-wider text-zinc-300 hover:text-purple-300 transition-colors py-1 relative group focus:outline-none"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Contact Icons */}
            <a
              href={`https://wa.me/${currentLocation.whatsapp}?text=Hello%20LUXORA,%20I%20would%20like%20to%20inquire%20about%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp"
              title="WhatsApp Concierge"
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-500/40 transition-all"
              id="nav-whatsapp-btn"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              href={`tel:${currentLocation.phone}`}
              aria-label="Call LUXORA"
              title={`Call ${currentLocation.phone}`}
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-purple-300 hover:bg-purple-950/40 hover:border-purple-500/40 transition-all"
              id="nav-phone-btn"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Phase Switcher / SaaS & Wix buttons */}
            <button
              onClick={onOpenWixGuide}
              className="px-2.5 py-1.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-purple-300 hover:bg-purple-900/40 text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Phase 1: Wix Fast Launch Master Guide"
              id="nav-wix-guide-btn"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden xl:inline">Phase 1:</span> Wix Guide
            </button>

            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-purple-500/40 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Phase 2: Next.js SaaS Multi-Salon Portal"
              id="nav-admin-portal-btn"
            >
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden xl:inline">SaaS</span> Admin
            </button>

            {/* Primary Book CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden px-4 py-2 rounded-lg font-sans text-xs uppercase tracking-wider font-semibold text-white transition-all duration-300 shadow-md shadow-purple-900/30 hover:shadow-purple-700/50"
              id="nav-book-appointment-btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-indigo-500 transition-all" />
              <div className="relative flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-200" />
                <span>Book Appointment</span>
              </div>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium flex items-center gap-1 shadow-md shadow-purple-900/40"
              id="nav-mobile-book-btn"
            >
              <Calendar className="w-3 h-3" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="nav-hamburger-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto animate-fadeIn"
          id="mobile-nav-drawer"
        >
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-purple-400 mb-2 px-2">
              Navigation Menu
            </div>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="w-full text-left py-3 px-4 rounded-xl text-base font-medium text-zinc-200 hover:text-white hover:bg-purple-950/30 border border-transparent hover:border-purple-500/20 flex items-center justify-between transition-all"
                id={`mobile-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-purple-400" />
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-800/80 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
              id="mobile-drawer-book-btn"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Online</span>
            </button>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <a
                href={`https://wa.me/${currentLocation.whatsapp}?text=Hello%20LUXORA,%20I%20would%20like%20to%20inquire%20about%20an%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5"
                id="mobile-drawer-wa-btn"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href={`tel:${currentLocation.phone}`}
                className="py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center justify-center gap-1.5"
                id="mobile-drawer-call-btn"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                Call Salon
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWixGuide();
                }}
                className="py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-purple-300 text-xs flex items-center justify-center gap-1"
                id="mobile-drawer-wix-btn"
              >
                <Layers className="w-3.5 h-3.5" />
                Wix Guide
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs flex items-center justify-center gap-1"
                id="mobile-drawer-admin-btn"
              >
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                Admin Suite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
