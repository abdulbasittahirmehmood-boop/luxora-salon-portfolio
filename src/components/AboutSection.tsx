import React from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Eye, 
  Clock, 
  CheckCircle2,
  Sliders
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Anatomical Precision',
      desc: 'Every scissor cut and taper begins with structural head and jawline analysis to complement your natural contours.',
    },
    {
      icon: Cpu,
      title: 'Engineered Ergonomics',
      desc: 'Daylight-calibrated 5500K spectrum illumination and acoustic architecture eliminate eye fatigue and ambient chaos.',
    },
    {
      icon: ShieldCheck,
      title: 'Medical-Grade Purity',
      desc: 'Hospital-level ultraviolet tool sterilization, single-use botanical towel rituals, and dermatologically vetted treatments.',
    },
    {
      icon: Clock,
      title: 'Dedicated Hospitality',
      desc: 'Never rushed. Each booking reserves a dedicated time block so your stylist focuses exclusively on your transformation.',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#09080e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/20 shadow-2xl p-2">
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80"
                alt="LUXORA Salon Craftsmanship"
                className="w-full h-[480px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl" />
              
              {/* Floating Philosophy Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-purple-500/30">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 block mb-1">
                  Design Manifesto
                </span>
                <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                  "Where classic barbering disciplines intersect with architectural light, ergonomic comfort, and modern cosmetic chemistry."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>The Atelier Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight uppercase leading-tight">
              A SANCTUARY FOR{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                DISCERNING STYLE
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              LUXORA was conceived around a single conviction: grooming should be an immersive ritual of renewal rather than a hurried chore. We united seasoned master barbers, editorial colorists, and aesthetic skin specialists under an acoustically designed, technology-inspired studio environment.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed font-sans">
              From our Japanese recline stations and custom daylight illumination to our personalized digital hair diagnostics, every detail is engineered to ensure you leave with effortless confidence and enduring style.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold font-heading text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
