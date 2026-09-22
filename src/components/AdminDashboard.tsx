import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Scissors, 
  Users, 
  MessageSquareQuote, 
  Gift, 
  Settings, 
  Database, 
  Search, 
  Check, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Plus, 
  Building2, 
  Shield, 
  Save, 
  ChevronRight,
  Filter,
  DollarSign,
  Clock
} from 'lucide-react';
import { Booking, Service, Staff, Review, Offer, SalonLocation } from '../types';
import { SALON_LOCATIONS } from '../data/mockData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  services: Service[];
  staffList: Staff[];
  reviews: Review[];
  offers: Offer[];
  onUpdateBookings: (bookings: Booking[]) => void;
  onUpdateServices: (services: Service[]) => void;
  onUpdateStaff: (staff: Staff[]) => void;
  onUpdateOffers: (offers: Offer[]) => void;
  onUpdateReviews: (reviews: Review[]) => void;
  currentLocation: SalonLocation;
  onSelectLocation: (loc: SalonLocation) => void;
}

type AdminTab = 'bookings' | 'services' | 'team' | 'reviews' | 'offers' | 'settings' | 'supabase';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  bookings,
  services,
  staffList,
  reviews,
  offers,
  onUpdateBookings,
  onUpdateServices,
  onUpdateStaff,
  onUpdateOffers,
  onUpdateReviews,
  currentLocation,
  onSelectLocation,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Deletion confirmation modal state
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: string; title: string } | null>(null);

  // Edit Service State
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Salon Settings state
  const [settingsPhone, setSettingsPhone] = useState(currentLocation.phone);
  const [settingsWhatsapp, setSettingsWhatsapp] = useState(currentLocation.whatsapp);
  const [settingsAddress, setSettingsAddress] = useState(currentLocation.address);
  const [settingsSaveState, setSettingsSaveState] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Support Escape key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (itemToDelete) {
          setItemToDelete(null);
        } else if (editingService) {
          setEditingService(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, itemToDelete, editingService, onClose]);

  if (!isOpen) return null;

  // Filter bookings for the selected multi-tenant salon
  const filteredBookings = bookings.filter((b) => {
    const matchesLocation = !b.locationId || b.locationId === currentLocation.id;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesLocation && matchesSearch && matchesStatus;
  });

  // Booking Actions
  const handleUpdateBookingStatus = (id: string, newStatus: any) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    onUpdateBookings(updated);
  };

  const confirmDeleteAction = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'booking') {
      onUpdateBookings(bookings.filter((b) => b.id !== itemToDelete.id));
    } else if (itemToDelete.type === 'review') {
      onUpdateReviews(reviews.filter((r) => r.id !== itemToDelete.id));
    } else if (itemToDelete.type === 'service') {
      onUpdateServices(services.filter((s) => s.id !== itemToDelete.id));
    }
    setItemToDelete(null);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const updated = services.map((s) => (s.id === editingService.id ? editingService : s));
    onUpdateServices(updated);
    setEditingService(null);
  };

  const handleSaveSalonSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaveState('saving');
    setTimeout(() => {
      currentLocation.phone = settingsPhone;
      currentLocation.whatsapp = settingsWhatsapp;
      currentLocation.address = settingsAddress;
      setSettingsSaveState('success');
      setTimeout(() => setSettingsSaveState('idle'), 2500);
    }, 600);
  };

  const navTabs: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: 'bookings', label: 'Bookings', icon: Calendar, count: filteredBookings.length },
    { id: 'services', label: 'Services', icon: Scissors, count: services.length },
    { id: 'team', label: 'Team Artisans', icon: Users, count: staffList.length },
    { id: 'reviews', label: 'Reviews', icon: MessageSquareQuote, count: reviews.length },
    { id: 'offers', label: 'Offers', icon: Gift, count: offers.length },
    { id: 'settings', label: 'Salon Settings', icon: Settings },
    { id: 'supabase', label: 'Supabase Architecture', icon: Database },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      id="admin-dashboard-modal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-[92vh] bg-[#0c0a15] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-zinc-950/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-heading text-white">
                  LUXORA Multi-Salon SaaS Portal
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 border border-purple-500/30 text-purple-300">
                  Phase 2 Architecture
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Tenant isolation and live studio operational controls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-Salon Tenant Switcher */}
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-1.5">
              <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
              <select
                value={currentLocation.id}
                onChange={(e) => {
                  const target = SALON_LOCATIONS.find((loc) => loc.id === e.target.value);
                  if (target) onSelectLocation(target);
                }}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-sans"
                id="admin-tenant-location-select"
              >
                {SALON_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-zinc-900 text-white">
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
              aria-label="Close admin dashboard"
              id="admin-dashboard-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="bg-zinc-950/40 px-6 border-b border-zinc-800/80 flex items-center gap-1 overflow-x-auto">
          {navTabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-xs font-medium uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-purple-500 text-white font-semibold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
                id={`admin-tab-${tab.id}`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-purple-900/60 text-purple-200' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: BOOKINGS MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {/* Search & Status Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, ref, service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                    id="admin-booking-search-input"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs text-zinc-400 font-mono">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                    id="admin-status-filter-select"
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Bookings Table */}
              {filteredBookings.length > 0 ? (
                <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950/40">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-900/80 font-mono uppercase text-zinc-400 border-b border-zinc-800">
                      <tr>
                        <th className="p-3.5">Reference</th>
                        <th className="p-3.5">Guest & Contact</th>
                        <th className="p-3.5">Ritual & Specialist</th>
                        <th className="p-3.5">Schedule</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-sans">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="p-3.5 font-mono text-purple-300 font-bold">
                            {b.reference}
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-white block">{b.customerName}</span>
                            <span className="text-zinc-400 text-[11px] block">{b.phone}</span>
                            <span className="text-zinc-500 text-[10px] block">{b.email}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-medium text-white block">{b.serviceName}</span>
                            <span className="text-purple-300 text-[11px] block">{b.staffName}</span>
                            <span className="text-zinc-500 text-[10px] block">${b.price} USD</span>
                          </td>
                          <td className="p-3.5 font-mono text-zinc-300">
                            <span className="block">{b.date}</span>
                            <span className="text-purple-400 text-[11px]">{b.time}</span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                                b.status === 'confirmed'
                                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                                  : b.status === 'completed'
                                  ? 'bg-blue-950/60 text-blue-400 border border-blue-500/30'
                                  : b.status === 'cancelled'
                                  ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                                  : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            {b.status !== 'confirmed' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                                className="px-2 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-[10px] font-mono"
                                title="Confirm Booking"
                              >
                                Approve
                              </button>
                            )}
                            {b.status !== 'cancelled' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                                className="px-2 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 text-[10px] font-mono"
                                title="Cancel Booking"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() =>
                                setItemToDelete({
                                  id: b.id,
                                  type: 'booking',
                                  title: `Booking ${b.reference} (${b.customerName})`,
                                })
                              }
                              className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-10 text-center rounded-2xl border border-zinc-800 bg-zinc-900/30">
                  <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold text-white">No Bookings Found</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    No reservations matched your search query in {currentLocation.name}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SERVICES CONFIGURATION */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 uppercase">
                  Active Service Catalog ({services.length} Rituals)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-heading font-bold text-white text-sm">
                          {srv.name}
                        </h4>
                        <span className="text-xs font-mono font-bold text-purple-300">
                          ${srv.price}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                        {srv.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
                      <span>{srv.duration} mins</span>
                      <button
                        onClick={() => setEditingService(srv)}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center gap-1"
                        id={`edit-srv-${srv.id}`}
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Price</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEAM / ARTISANS */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {staffList.map((st) => (
                <div
                  key={st.id}
                  className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm">{st.name}</h4>
                      <p className="text-xs text-purple-300">{st.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{st.bio}</p>
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>Rating: {st.rating} ★</span>
                    <span className="text-emerald-400">Active Duty</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{rev.author}</span>
                      <span className="text-xs text-purple-300 font-mono">({rev.role})</span>
                      <span className="text-xs text-amber-400 font-mono">{rev.rating} ★</span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 italic font-sans">
                      "{rev.comment}"
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setItemToDelete({
                        id: rev.id,
                        type: 'review',
                        title: `Review by ${rev.author}`,
                      })
                    }
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-800"
                    title="Remove Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: OFFERS CONFIGURATION */}
          {activeTab === 'offers' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offers.map((off) => (
                <div
                  key={off.id}
                  className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{off.title}</h4>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          off.expired
                            ? 'bg-zinc-800 text-zinc-500'
                            : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {off.expired ? 'Expired' : 'Active'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono mt-1">Code: {off.code}</p>
                    <p className="text-xs text-zinc-500">{off.validUntil}</p>
                  </div>

                  <button
                    onClick={() => {
                      const updated = offers.map((o) =>
                        o.id === off.id ? { ...o, expired: !o.expired } : o
                      );
                      onUpdateOffers(updated);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono ${
                      off.expired
                        ? 'bg-purple-900/60 text-purple-300 hover:bg-purple-800'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {off.expired ? 'Reactivate' : 'Expire'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: SALON SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto space-y-5">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-bold font-heading text-white">
                  Studio Settings: {currentLocation.name}
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Configure phone numbers, WhatsApp, and studio address
                </p>
              </div>

              {settingsSaveState === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Studio contact parameters saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSalonSettings} className="space-y-4 text-xs">
                <div>
                  <label className="text-zinc-300 block mb-1">Telephone Contact</label>
                  <input
                    type="text"
                    value={settingsPhone}
                    onChange={(e) => setSettingsPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono"
                    id="settings-phone-input"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1">WhatsApp Digits (International)</label>
                  <input
                    type="text"
                    value={settingsWhatsapp}
                    onChange={(e) => setSettingsWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono"
                    id="settings-whatsapp-input"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={settingsAddress}
                    onChange={(e) => setSettingsAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                    id="settings-address-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={settingsSaveState === 'saving'}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-purple-900/40"
                  id="save-salon-settings-btn"
                >
                  <Save className="w-4 h-4" />
                  <span>{settingsSaveState === 'saving' ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 7: SUPABASE ARCHITECTURE PREVIEW */}
          {activeTab === 'supabase' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-3">
                <Database className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    Phase 2 Supabase PostgreSQL + Row Level Security (RLS)
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed font-sans">
                    The schema below is formatted and ready to deploy to your Supabase project. Every salon location receives a strict tenant isolation policy (`salon_id`), ensuring Salon A can never read or mutate Salon B's confidential booking or financial data.
                  </p>
                </div>
              </div>

              {/* SQL Schema snippet display */}
              <div className="p-4 rounded-2xl bg-black/80 border border-zinc-800 font-mono text-[11px] text-purple-300 overflow-x-auto space-y-2">
                <div className="text-zinc-500">// 1. Salons Table (Multi-Tenant Master)</div>
                <div className="text-zinc-200">
                  CREATE TABLE salons ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, slug TEXT UNIQUE, phone TEXT, address TEXT );
                </div>
                <div className="text-zinc-500 pt-2">// 2. Bookings Table with Foreign Key & RLS</div>
                <div className="text-zinc-200">
                  CREATE TABLE bookings ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), salon_id UUID REFERENCES salons(id) ON DELETE CASCADE, reference TEXT UNIQUE NOT NULL, customer_name TEXT NOT NULL, phone TEXT NOT NULL, service_id TEXT NOT NULL, appointment_date DATE NOT NULL, appointment_time TEXT NOT NULL, status TEXT DEFAULT 'confirmed' );
                </div>
                <div className="text-zinc-500 pt-2">// 3. Row Level Security Policy</div>
                <div className="text-zinc-200">
                  ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;<br />
                  CREATE POLICY "Salons can only manage their own bookings" ON bookings FOR ALL USING (auth.jwt() -&gt;&gt; 'salon_id' = salon_id::text);
                </div>
              </div>

              <div className="text-xs text-zinc-400 space-y-1">
                <p>
                  <strong>Live Demo State:</strong> LUXORA currently operates on local browser session storage with instant reactivity. When connecting Supabase credentials, paste the schema above into your Supabase SQL editor.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Edit Service Modal */}
        {editingService && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#120f22] p-6 rounded-3xl border border-purple-500/40 w-full max-w-sm space-y-4">
              <h3 className="font-heading font-bold text-white text-base">
                Edit {editingService.name}
              </h3>
              <form onSubmit={handleSaveService} className="space-y-3 text-xs">
                <div>
                  <label className="text-zinc-300 block mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={editingService.price}
                    onChange={(e) =>
                      setEditingService({ ...editingService, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 block mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={editingService.duration}
                    onChange={(e) =>
                      setEditingService({ ...editingService, duration: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-3 py-1.5 rounded-xl border border-zinc-800 text-zinc-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-semibold"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {itemToDelete && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#120f22] p-6 rounded-3xl border border-rose-500/40 w-full max-w-sm space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-white text-base">
                Confirm Deletion
              </h3>
              <p className="text-xs text-zinc-300">
                Are you sure you want to delete <strong className="text-white">{itemToDelete.title}</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAction}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md"
                  id="confirm-delete-action-btn"
                >
                  Delete Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
