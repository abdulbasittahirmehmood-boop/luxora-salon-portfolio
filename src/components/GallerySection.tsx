import React, { useState, useEffect } from 'react';
import { 
  Images, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  Sparkles,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [imageErrorState, setImageErrorState] = useState<{ [key: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'hair', label: 'Hair Sculpting' },
    { id: 'grooming', label: 'Beard Precision' },
    { id: 'ambiance', label: 'Studio Interior' },
    { id: 'vip', label: 'VIP & Bridal' },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => ((prev! + 1) % filteredItems.length));
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => ((prev! - 1 + filteredItems.length) % filteredItems.length));
  };

  const currentLightboxItem: GalleryItem | undefined =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : undefined;

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#08080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Images className="w-3.5 h-3.5 text-purple-400" />
            <span>Visual Archive</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight uppercase mb-4">
            THE CRAFT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              EXHIBIT
            </span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed font-sans">
            A visual documentation of precision cuts, color dynamics, and luxury salon ambiance.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
              id={`gallery-cat-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, idx) => {
            const hasError = !!imageErrorState[item.id];
            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-purple-500/10 hover:border-purple-400/50 transition-all duration-300 shadow-lg"
                id={`gallery-item-${item.id}`}
              >
                {!hasError ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={() =>
                      setImageErrorState((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-4 text-center">
                    <AlertCircle className="w-8 h-8 text-purple-400 mb-2" />
                    <span className="text-xs text-zinc-400">Image unavailable</span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold font-heading text-white">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-zinc-300 line-clamp-1 mt-1 font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && currentLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          id="gallery-lightbox-overlay"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-20" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                {currentLightboxItem.category} Archive
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                {activeLightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-all focus:outline-none"
              aria-label="Close lightbox"
              id="gallery-lightbox-close-btn"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Display Stage */}
          <div className="relative flex-1 flex items-center justify-center py-4 my-auto">
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-purple-950/80 text-white border border-zinc-700/80 hover:border-purple-400 transition-all focus:outline-none"
              aria-label="Previous image"
              id="lightbox-prev-btn"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Current Image */}
            <div 
              className="max-w-4xl max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-purple-950/80 text-white border border-zinc-700/80 hover:border-purple-400 transition-all focus:outline-none"
              aria-label="Next image"
              id="lightbox-next-btn"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & Keyboard Tip */}
          <div className="z-20 text-center max-w-xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold font-heading text-white">
              {currentLightboxItem.title}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 font-sans">
              {currentLightboxItem.description}
            </p>
            <span className="text-[10px] font-mono text-zinc-500 mt-2 block">
              Use Left / Right arrow keys to navigate • Esc to exit
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
