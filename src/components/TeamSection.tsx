import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Star, 
  RotateCw, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { Staff } from '../types';

interface TeamSectionProps {
  staffList: Staff[];
  onBookWithStaff: (staffId: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  staffList,
  onBookWithStaff,
}) => {
  // Track flipped state for mobile tap support
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#09080e]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Master Artisans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight uppercase mb-4">
            THE LUXORA{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              COLLECTIVE
            </span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed font-sans">
            Trained in international ateliers. Dedicated to anatomical precision, hair geometry, and tailored grooming.
          </p>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffList.map((member) => {
            const isFlipped = !!flippedCards[member.id];
            return (
              <div
                key={member.id}
                className="h-[430px] [perspective:1000px] cursor-pointer group"
                onClick={() => toggleCard(member.id)}
                id={`staff-card-${member.id}`}
              >
                <div
                  className={`relative w-full h-full duration-500 [transform-style:preserve-3d] transition-transform ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden glass-panel border border-purple-500/20 [backface-visibility:hidden] flex flex-col justify-between shadow-xl">
                    <div className="relative h-64 w-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12101e] via-transparent to-transparent" />
                      
                      {/* Rating pill */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 border border-purple-500/30 text-purple-300 text-xs font-mono backdrop-blur-md">
                        <Star className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
                        <span>{member.rating}</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-heading text-white">
                          {member.name}
                        </h3>
                        <p className="text-xs text-purple-300 font-sans mb-2">
                          {member.role}
                        </p>
                        <p className="text-[11px] font-mono text-zinc-400">
                          {member.experience}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 group-hover:text-purple-300 transition-colors">
                        <span className="font-mono text-[11px]">View Specialties</span>
                        <RotateCw className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl p-6 glass-panel border border-purple-400/40 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between bg-[#120f22] shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
                        <div>
                          <h4 className="text-base font-bold font-heading text-white">
                            {member.name}
                          </h4>
                          <span className="text-[11px] text-purple-300 font-mono">
                            {member.role}
                          </span>
                        </div>
                        <RotateCw className="w-4 h-4 text-zinc-500" />
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed mb-4 font-sans line-clamp-3">
                        {member.bio}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block">
                          Master Specialties
                        </span>
                        {member.specialties.map((spec, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 text-xs text-zinc-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookWithStaff(member.id);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-purple-900/40 transition-all"
                        id={`book-with-staff-${member.id}`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book With Me</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
