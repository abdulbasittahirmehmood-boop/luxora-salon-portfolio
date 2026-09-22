import React, { useState } from 'react';
import { 
  Gift, 
  Tag, 
  Clock, 
  Calendar, 
  Check, 
  Copy, 
  X, 
  ArrowRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { Offer } from '../types';

interface OffersSectionProps {
  offers: Offer[];
  onBookWithOffer: (offer: Offer) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  offers,
  onBookWithOffer,
}) => {
  const [selectedOfferModal, setSelectedOfferModal] = useState<Offer | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Support Escape key to close offer modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedOfferModal) {
        setSelectedOfferModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOfferModal]);

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="offers" className="py-24 relative overflow-hidden bg-[#08080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Gift className="w-3.5 h-3.5 text-purple-400" />
            <span>Privileges & Memberships</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight uppercase mb-4">
            EXCLUSIVE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              INVITATIONS
            </span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed font-sans">
            Curated grooming packages and introductory benefits crafted for first-time guests and VIP members.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => {
            const isExpired = offer.expired;
            return (
              <div
                key={offer.id}
                className={`rounded-3xl overflow-hidden glass-panel border flex flex-col justify-between transition-all duration-300 ${
                  isExpired
                    ? 'opacity-60 border-zinc-800 bg-zinc-950/50'
                    : 'border-purple-500/20 hover:border-purple-400/50 shadow-xl group'
                }`}
                id={`offer-card-${offer.id}`}
              >
                {/* Image & Category */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      !isExpired ? 'group-hover:scale-105' : 'grayscale'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100d1c] via-transparent to-transparent" />
                  
                  {/* Status Tag */}
                  <div className="absolute top-3 left-3">
                    {isExpired ? (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-zinc-900/90 border border-zinc-700 text-zinc-400 backdrop-blur-md flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        Expired
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-purple-950/90 border border-purple-500/40 text-purple-300 backdrop-blur-md">
                        {offer.category}
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  {!isExpired && (
                    <div className="absolute bottom-2 right-3">
                      <span className="px-3 py-1 rounded-xl bg-purple-600/90 text-white font-mono font-bold text-xs shadow-md">
                        {offer.discountPercent
                          ? `${offer.discountPercent}% OFF`
                          : `$${offer.discountAmount} OFF`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Offer Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-heading text-white mb-1.5">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-4 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Validity & Code pill */}
                    <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-zinc-800">
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {offer.validUntil}
                      </span>

                      {!isExpired && (
                        <button
                          onClick={(e) => handleCopyCode(offer.code, e)}
                          className="flex items-center gap-1 text-[11px] text-purple-300 hover:text-white bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/30"
                          title="Copy Promo Code"
                        >
                          {copiedCode === offer.code ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-300">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{offer.code}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setSelectedOfferModal(offer)}
                        className="py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-800 transition-colors"
                        id={`view-offer-btn-${offer.id}`}
                      >
                        View Offer
                      </button>

                      {isExpired ? (
                        <button
                          disabled
                          className="py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-600 text-xs font-medium cursor-not-allowed"
                          title="This promotion has expired"
                        >
                          Concluded
                        </button>
                      ) : (
                        <button
                          onClick={() => onBookWithOffer(offer)}
                          className="py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1 shadow-md shadow-purple-900/30 transition-all"
                          id={`book-offer-btn-${offer.id}`}
                        >
                          <span>Book Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VIEW OFFER MODAL */}
      {selectedOfferModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          id="view-offer-modal"
          onClick={() => setSelectedOfferModal(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0e0c18] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedOfferModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
              id="close-offer-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase bg-purple-950/60 border border-purple-500/40 text-purple-300 mb-3">
              {selectedOfferModal.category}
            </div>

            <h3 className="text-2xl font-bold font-heading text-white mb-2">
              {selectedOfferModal.title}
            </h3>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans">
              {selectedOfferModal.description}
            </p>

            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 mb-6 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 font-mono">Offer Code:</span>
                <span className="font-mono font-bold text-purple-300 text-sm">
                  {selectedOfferModal.code}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 font-mono">Validity Window:</span>
                <span className="text-zinc-200">{selectedOfferModal.validUntil}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 font-mono">Status:</span>
                <span className={selectedOfferModal.expired ? 'text-rose-400' : 'text-emerald-400'}>
                  {selectedOfferModal.expired ? 'Expired / Inactive' : 'Active for Online Booking'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setSelectedOfferModal(null)}
                className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs font-medium"
              >
                Close
              </button>

              {!selectedOfferModal.expired && (
                <button
                  onClick={() => {
                    const offer = selectedOfferModal;
                    setSelectedOfferModal(null);
                    onBookWithOffer(offer);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-purple-900/40"
                  id="book-from-offer-modal-btn"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book With This Offer</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
