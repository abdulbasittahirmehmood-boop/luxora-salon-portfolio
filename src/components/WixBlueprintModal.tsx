import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  Palette, 
  MessageSquare, 
  Eye, 
  ShieldCheck 
} from 'lucide-react';

interface WixBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WixBlueprintModal: React.FC<WixBlueprintModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyCodeSnippet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Create a Dark Luxury Template on Wix Studio',
      desc: 'Sign in to Wix.com or Wix Studio. Choose a blank black canvas or luxury portfolio template. Set the global background color to #09080E (Deep Obsidian Black).',
      code: 'HEX Palette: #09080E (Background), #120F22 (Card Panels), #A855F7 (Electric Purple Accent), #FFFFFF (Typography)',
    },
    {
      title: '2. Install "Wix Bookings" From the App Market',
      desc: 'Add Wix Bookings. Under Dashboard > Services, create LUXORA’s primary services: "Signature Precision Haircut" ($65), "Royal Hot Towel Shave" ($50), "Architectural Restyle & Beard" ($110).',
      code: 'Configure each service with: Exact duration (45-60 min), Staff assignment (Marcus, Elena, Kai, Julian), and Buffer time (10 min).',
    },
    {
      title: '3. Add Floating WhatsApp Concierge',
      desc: 'Go to Add Elements > Quick Action Bar or embed custom HTML button fixed to the bottom right for instant customer queries.',
      code: '<a href="https://wa.me/14155550198?text=Hello%20LUXORA" target="_blank" style="position:fixed;bottom:24px;right:24px;background:#25D366;color:#fff;padding:12px 20px;border-radius:30px;font-family:sans-serif;text-decoration:none;z-index:9999;">Chat with Concierge</a>',
    },
    {
      title: '4. Embed the 3D Virtual Studio iFrame',
      desc: 'In the Wix editor, add an "HTML Embed" container in the 3D Experience section. Paste your hosted 3D WebGL / Spline model URL or embed widget.',
      code: '<iframe src="https://luxora-salon.web.app/#experience" width="100%" height="520" frameborder="0" style="border-radius:24px;border:1px solid #8b5cf6;"></iframe>',
    },
    {
      title: '5. Zero Dead Clicks Verification',
      desc: 'Before publishing, test every CTA button: Verify that "Book Now" opens the Wix calendar widget, phone numbers trigger native dialers, and gallery images expand into lightboxes.',
      code: 'Audit Checklist: [x] Header Call to Action [x] Service Cards [x] Artisan Flip Cards [x] Promo Code Copy Buttons',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      id="wix-blueprint-modal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0a15] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">
                Phase 1 — Wix Studio Rapid Launch Guide
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                Zero-coding implementation blueprint matching LUXORA's brand identity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            id="close-wix-guide-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs text-zinc-300 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">
                Dual-Phase Architecture Alignment
              </strong>
              This blueprint ensures your Phase 1 Wix site and Phase 2 custom Next.js application present the identical luxury visual presence, services, and booking experience to your patrons.
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-5">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-white text-sm">
                    {st.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-purple-300">
                    Step 0{i + 1}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {st.desc}
                </p>

                <div className="relative p-3 rounded-xl bg-black/70 border border-zinc-800 text-xs font-mono text-purple-300 flex items-center justify-between">
                  <span className="truncate pr-4">{st.code}</span>
                  <button
                    onClick={() => copyCodeSnippet(st.code, i)}
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors shrink-0"
                    title="Copy configuration snippet"
                  >
                    {copiedIndex === i ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">
            Phase 1 & Phase 2 Brand Parity Verified
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
