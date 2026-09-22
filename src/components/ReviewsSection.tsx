import React, { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, 
  Star, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Sparkles,
  User,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<number | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Support Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWriteModalOpen) {
        setIsWriteModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWriteModalOpen]);

  const filteredReviews = reviews.filter((r) =>
    selectedFilter === 'all' ? true : r.rating === selectedFilter
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!authorName.trim() || authorName.trim().length < 2) {
      setFormError('Please enter your full name or nickname (min 2 characters).');
      return;
    }

    if (!comment.trim() || comment.trim().length < 10) {
      setFormError('Please write at least 10 characters detailing your salon experience.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRev: Review = {
        id: `rev-${Date.now()}`,
        author: authorName.trim(),
        role: authorRole.trim() || 'Verified Guest',
        rating,
        comment: comment.trim(),
        date: 'Just now',
        verified: true,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      };

      onAddReview(newRev);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
        setIsWriteModalOpen(false);
        setAuthorName('');
        setAuthorRole('');
        setComment('');
        setRating(5);
      }, 1500);
    }, 800);
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-[#09080e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-zinc-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5 text-purple-400" />
              <span>Client Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight uppercase">
              THE PATRON{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                VERDICT
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-purple-900/30 transition-all"
              id="write-review-open-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Filter bar by star rating */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs font-mono text-zinc-400 mr-2 uppercase tracking-wider">
            Filter:
          </span>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedFilter === 'all'
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            id="filter-reviews-all"
          >
            All Ratings ({reviews.length})
          </button>
          {[5, 4].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedFilter(star)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all ${
                selectedFilter === star
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
              id={`filter-reviews-${star}star`}
            >
              <span>{star} Stars</span>
              <Star className="w-3 h-3 fill-current" />
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/15 flex flex-col justify-between"
              id={`review-card-${rev.id}`}
            >
              <div>
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-purple-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-purple-400 text-purple-400' : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Visit
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">
                      {rev.author}
                    </h4>
                    <p className="text-xs text-zinc-400 font-sans">{rev.role}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WRITE A REVIEW MODAL */}
      {isWriteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          id="write-review-modal"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0e0c18] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-0.5">
                  Guest Feedback
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  Write Your Review
                </h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
                id="close-write-review-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white font-heading">
                  Thank You For Your Review
                </h4>
                <p className="text-xs text-zinc-400">
                  Your testimony has been published to the LUXORA wall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Rating Stars Selector */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Your Rating <span className="text-rose-400">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-purple-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-purple-400' : 'text-zinc-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-purple-300 ml-2">
                      {rating} out of 5 stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Liam Anderson"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                    id="review-author-input"
                  />
                </div>

                {/* Role / Profession */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Profession or Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Film Editor / First-time Patron"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                    id="review-role-input"
                  />
                </div>

                {/* Comment Text */}
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">
                    Your Review <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your appointment, the barber/stylist, and the studio atmosphere..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none resize-none"
                    id="review-comment-input"
                  />
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-purple-900/40"
                    id="submit-review-btn"
                  >
                    {isSubmitting ? (
                      <span>Publishing...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
