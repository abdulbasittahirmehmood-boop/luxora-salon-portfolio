import React, { useEffect } from 'react';
import { X, Clock, DollarSign, Sparkles, CheckCircle2, Calendar } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  // Support Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      id="service-detail-modal-backdrop"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0f0d19] border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-950/40 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
        id="service-detail-modal-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-zinc-700/80 transition-all focus:outline-none"
          aria-label="Close details modal"
          id="close-service-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d19] via-[#0f0d19]/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-950/80 border border-purple-500/40 text-purple-300 backdrop-blur-sm">
              {service.category} Ritual
            </span>
          </div>
          <div className="absolute bottom-4 left-6 right-6">
            <h3
              id="service-modal-title"
              className="text-2xl sm:text-3xl font-bold font-heading text-white mb-1"
            >
              {service.name}
            </h3>
            <p className="text-zinc-300 text-sm font-sans line-clamp-1">
              {service.shortDesc}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metrics: Duration and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Duration
                </span>
                <span className="text-base font-semibold text-white font-mono">
                  {service.duration} Minutes
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Service Investment
                </span>
                <span className="text-base font-semibold text-white font-mono">
                  ${service.price} USD
                </span>
              </div>
            </div>
          </div>

          {/* Full Narrative Description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">
              Ritual Experience
            </h4>
            <p className="text-zinc-300 text-sm leading-relaxed font-sans">
              {service.fullDesc}
            </p>
          </div>

          {/* Features Included List */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-3">
              What Is Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-xs font-medium uppercase tracking-wider transition-all"
              id="modal-cancel-btn"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition-all"
              id="modal-book-this-service-btn"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
