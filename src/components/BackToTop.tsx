import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the hero section or use window.innerHeight
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 100);
      } else {
        setIsVisible(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="p-3 sm:p-3.5 rounded-full glass-panel glass-panel-hover border border-purple-500/40 text-purple-200 hover:text-white shadow-xl shadow-purple-950/60 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer pointer-events-auto"
      aria-label="Back to Top"
      title="Return to Top"
      id="back-to-top-btn"
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 text-purple-300 group-hover:text-white" />
    </button>
  );
};
