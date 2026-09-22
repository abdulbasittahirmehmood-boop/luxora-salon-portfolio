import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Clock, 
  Search, 
  ChevronRight, 
  Calendar, 
  Info, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { Service, ServiceCategory } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  services: Service[];
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onBookService,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Hair Architecture' },
    { id: 'grooming', label: 'Beard & Grooming' },
    { id: 'beauty', label: 'Skin & Beauty' },
  ];

  // Filter services by category and search term
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchesCategory = activeCategory === 'all' || srv.category === activeCategory;
      const matchesSearch =
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [services, activeCategory, searchQuery]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#08080c]">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-950/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Master Service Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight uppercase mb-4">
            BESPOKE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              RITUALS
            </span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed font-sans">
            Engineered haircuts, restorative beard ceremonies, and illuminated aesthetic treatments.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
                id={`cat-filter-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-purple-500/60 focus:outline-none text-xs text-white placeholder-zinc-500 transition-all"
              id="service-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between border border-purple-500/15 group"
                id={`service-card-${service.id}`}
              >
                {/* Image & Micro-badge */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12101a] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-black/70 border border-purple-500/30 text-purple-300 backdrop-blur-md">
                      {service.category}
                    </span>
                  </div>

                  {/* Price & Duration Overlays */}
                  <div className="absolute bottom-3 right-4">
                    <span className="text-xl font-bold font-mono text-white tracking-tight bg-black/60 px-3 py-1 rounded-xl backdrop-blur-md border border-purple-500/30">
                      ${service.price}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-zinc-300 font-mono bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>{service.duration} mins</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed font-sans">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-800/80">
                    <button
                      onClick={() => setSelectedServiceForModal(service)}
                      className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                      id={`view-details-btn-${service.id}`}
                    >
                      <Info className="w-3.5 h-3.5 text-purple-400" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onBookService(service.id)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/30 transition-all"
                      id={`book-service-btn-${service.id}`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-purple-200" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State with Recovery */
          <div className="p-12 text-center rounded-3xl glass-panel max-w-md mx-auto border border-zinc-800">
            <SlidersHorizontal className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2 font-heading">
              No Services Found
            </h4>
            <p className="text-xs text-zinc-400 mb-6 font-sans">
              No rituals matched "{searchQuery}" in {activeCategory} category.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
              id="reset-service-filters-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookService={onBookService}
      />
    </section>
  );
};
