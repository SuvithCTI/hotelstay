import React, { useState, useEffect } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Award, Eye, MessageCircle, Calendar, CalendarCheck, Users, Search, Waves, UtensilsCrossed, Sparkles, ShieldCheck, Star, CheckCircle2, Clock, Coffee, Shield, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DesktopHomeView() {
  const { rooms, navigateTo, generateWhatsAppLink, setActiveModalRoom } = useHotel();
  const [checkIn, setCheckIn] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState('2');

  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const testimonials = [
    {
      name: "Devendra & Priya Singhania",
      location: "Mumbai, India",
      room: "Royal Presidential Penthouse Suite",
      rating: 5,
      comment: "Our stay at Lumina Grand was beyond breathtaking! The oceanfront balcony sunset and in-room heated jacuzzi made our anniversary unforgettable. The WhatsApp concierge answered every request in seconds.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Vikram Malhotra",
      location: "Bengaluru, India",
      room: "Sunset Executive Club Suite",
      rating: 5,
      comment: "Superb room aesthetics, ultra-fast fiber WiFi for my work calls, and seamless check-in. The rates under ₹5,000 for this level of 5-star luxury are unmatched in India.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Sneha & Rajesh Kapoor",
      location: "Delhi NCR, India",
      room: "Sapphire Family Living Suite",
      rating: 5,
      comment: "Travelling with kids can be challenging, but the interconnected master bedrooms and in-room dining gave us the perfect mix of privacy and family comfort. Exceptional cleanliness and hospitality.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Ananya Deshmukh",
      location: "Pune, India",
      room: "Azure Panoramic Horizon Suite",
      rating: 5,
      comment: "Waking up to floor-to-ceiling turquoise ocean views was pure magic. The peaceful private balcony and complimentary in-room gourmet breakfast started every day in paradise.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Rohan & Meera Chawla",
      location: "Hyderabad, India",
      room: "Solara Oceanfront Grand Suite",
      rating: 5,
      comment: "From the express WhatsApp check-in to the master canopy bed and seaside jacuzzi, everything was flawless. Best resort luxury under ₹5,000 in India!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    navigateTo('booking');
  };

  return (
    <div className="bg-slate-50 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden pt-12 pb-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_resort.jpg"
            alt="Lumina Grand Luxury Hotel & Suites Resort"
            className="w-full h-full object-cover scale-105 transform motion-safe:animate-pulse [animation-duration:8s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-amber-300 text-sm font-medium shadow-md">
              <Award className="w-4 h-4 text-amber-400" /> ★ 5-Star Luxury Oceanfront Hotel & Suites
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif-luxury leading-tight tracking-tight text-white max-w-3xl mx-auto">
              Where Pure Elegance Meets <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">Ocean Serenity</span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-lg leading-relaxed font-light max-w-2xl mx-auto px-2">
              Discover opulent ocean-facing rooms and master suites with private sea balconies, handcrafted teak furnishings, heated horizon jacuzzis, and 24/7 bespoke butler service.
            </p>

            {/* Centered Metrics Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1 max-w-xl mx-auto">
              <div className="bg-slate-950/70 backdrop-blur-md border border-white/15 p-2 sm:p-3.5 rounded-2xl shadow-lg">
                <div className="text-lg sm:text-2xl font-bold text-amber-400 font-outfit">4.99 ★</div>
                <div className="text-[10px] sm:text-xs text-slate-300">1,200+ Reviews</div>
              </div>
              <div className="bg-slate-950/70 backdrop-blur-md border border-white/15 p-2 sm:p-3.5 rounded-2xl shadow-lg">
                <div className="text-lg sm:text-2xl font-bold text-teal-300 font-outfit">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-300">Sea Balconies</div>
              </div>
              <div className="bg-slate-950/70 backdrop-blur-md border border-white/15 p-2 sm:p-3.5 rounded-2xl shadow-lg">
                <div className="text-lg sm:text-2xl font-bold text-pink-300 font-outfit">24/7</div>
                <div className="text-[10px] sm:text-xs text-slate-300">VIP Concierge</div>
              </div>
            </div>

            {/* Centered Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3">
              <button
                onClick={() => navigateTo('rooms')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-105 transition-all flex items-center gap-2 text-base cursor-pointer"
              >
                <Eye className="w-5 h-5" /> Explore 8 Suites
              </button>
              <a
                href={generateWhatsAppLink("Hello Lumina Grand, I am interested in booking a luxury room.")}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-950/60 hover:bg-emerald-600/40 border border-emerald-400/50 text-emerald-300 hover:text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING AVAILABILITY SEARCH BAR */}
      <div className="relative z-30 max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 -mt-14">
        <div className="glass-card bg-white p-6 rounded-3xl shadow-2xl border border-indigo-100">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="w-full bg-transparent text-slate-800 font-semibold text-sm outline-none"
              />
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-indigo-600" /> Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full bg-transparent text-slate-800 font-semibold text-sm outline-none"
              />
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" /> Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-semibold text-sm outline-none cursor-pointer"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5" /> Check Availability
            </button>
          </form>
        </div>
      </div>

      {/* 3. SIGNATURE EXPERIENCES (VIBRANT & ANIMATED) */}
      <section className="py-20 px-6 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-1.5 rounded-full border border-indigo-200 shadow-sm inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> World-Class Hospitality
          </span>
          <h2 className="text-3xl lg:text-4xl font-black font-serif-luxury mt-3 text-slate-900">
            Crafted for Pure Indulgence
          </h2>
          <p className="text-slate-600 mt-2 text-sm">
            Every detail at Lumina Grand is meticulously designed to immerse you in relaxation, opulence, and coastal splendor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Sea Horizon Balconies (Cyan/Blue) */}
          <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-white rounded-3xl p-7 border-2 border-cyan-200/70 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2.5 transition-all duration-500 group overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl group-hover:scale-150 transition duration-500 pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Waves className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 bg-cyan-100/90 px-2.5 py-1 rounded-full border border-cyan-200">
                  🌊 100% Sea Facing
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition">Sea Horizon Balconies</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Wake up to panoramic turquoise ocean horizons and breathe in the crisp coastal sea breeze directly from your bed.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-cyan-100/80 flex items-center gap-1 text-[11px] font-bold text-cyan-600">
              <span>Private Sun Deck</span> • <span>Glass Railing</span>
            </div>
          </div>

          {/* Card 2: In-Room Gourmet Dining (Pink/Rose) */}
          <div className="relative bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-white rounded-3xl p-7 border-2 border-pink-200/70 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2.5 transition-all duration-500 group overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl group-hover:scale-150 transition duration-500 pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <UtensilsCrossed className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-700 bg-pink-100/90 px-2.5 py-1 rounded-full border border-pink-200">
                  🍳 In-Bed Dining
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-pink-700 transition">In-Room Gourmet Dining</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Savour Michelin-curated in-room breakfast spreads and artisanal culinary treats freshly prepared by master chefs.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-pink-100/80 flex items-center gap-1 text-[11px] font-bold text-pink-600">
              <span>Fresh Bakery</span> • <span>24/7 Menu</span>
            </div>
          </div>

          {/* Card 3: Heated In-Suite Jacuzzis (Teal/Emerald) */}
          <div className="relative bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-white rounded-3xl p-7 border-2 border-teal-200/70 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2.5 transition-all duration-500 group overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl group-hover:scale-150 transition duration-500 pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-100/90 px-2.5 py-1 rounded-full border border-teal-200">
                  ✨ Heated Hydro Spa
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition">Heated In-Suite Jacuzzis</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Unwind in private temperature-controlled whirlpool spas overlooking golden shoreline sunsets.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-teal-100/80 flex items-center gap-1 text-[11px] font-bold text-teal-600">
              <span>Hydro Jets</span> • <span>Sunset Vistas</span>
            </div>
          </div>

          {/* Card 4: 24/7 VIP Butler Service (Amber/Orange) */}
          <div className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white rounded-3xl p-7 border-2 border-amber-200/70 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2.5 transition-all duration-500 group overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:scale-150 transition duration-500 pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-full border border-amber-200">
                  👑 24/7 VIP Service
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition">24/7 VIP Butler Service</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Personalized itinerary planning, instant WhatsApp concierge, express check-in, and round-the-clock attentive care.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-100/80 flex items-center gap-1 text-[11px] font-bold text-amber-700">
              <span>Instant WhatsApp</span> • <span>Bespoke Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPOTLIGHT SUITE BANNER */}
      <section className="py-12 px-6 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative h-80 lg:h-[440px] overflow-hidden">
              <img
                src="/images/bedroom_penthouse.jpg"
                alt="Royal Presidential Penthouse Suite"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-slate-900"></div>
              <div className="absolute top-6 left-6 bg-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg">
                ★ Crown Jewel Suite
              </div>
            </div>

            <div className="lg:col-span-5 p-8 lg:p-12 text-white space-y-6">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
                Flagship Experience
              </span>
              <h3 className="text-3xl lg:text-4xl font-black font-serif-luxury leading-tight">
                Royal Presidential Penthouse Suite
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Perched on the highest floor with exposed teak cathedral beams, private heated horizon jacuzzi, and full 360-degree ocean and sunrise vistas.
              </p>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1,450 sq.ft expansive master residence with dual king beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Private heated jacuzzi & panoramic seaside balcony</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated 24/7 in-suite personal butler & limousine pickup</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 block line-through">₹6,499</span>
                  <div className="text-3xl font-black text-amber-400 font-outfit">
                    ₹4,999<span className="text-xs text-slate-300 font-normal"> /night</span>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('booking', 'rm-101')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  Book Penthouse
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIRECT BOOKING PRIVILEGES (COLORFUL & ANIMATED) */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm inline-flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Direct Booking Benefits
            </span>
            <h2 className="text-3xl lg:text-4xl font-black font-serif-luxury mt-3 text-slate-900">
              Why Book Directly With Us?
            </h2>
            <p className="text-slate-600 mt-2 text-xs">
              Exclusive privileges guaranteed when you reserve directly through our official hotel site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Benefit 1: Best Rate Guaranteed (Indigo) */}
            <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-white p-7 rounded-3xl border-2 border-indigo-200/80 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-300 text-center space-y-3 group overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black text-indigo-700 bg-indigo-100/90 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  ✓ Price Lock
                </span>
                <h4 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition">Best Rate Guaranteed</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every luxury suite is strictly priced under ₹5,000 without hidden agent surcharges or commission markups.
              </p>
            </div>

            {/* Benefit 2: Free In-Room Breakfast (Pink) */}
            <div className="relative bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-white p-7 rounded-3xl border-2 border-pink-200/80 hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 transition-all duration-300 text-center space-y-3 group overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
                <Coffee className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black text-pink-700 bg-pink-100/90 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  ☕ Daily Included
                </span>
                <h4 className="font-bold text-slate-900 text-base group-hover:text-pink-600 transition">Free In-Room Breakfast</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enjoy complimentary artisanal morning breakfast spreads served fresh directly in your master bedroom.
              </p>
            </div>

            {/* Benefit 3: Flexible Free Changes (Teal) */}
            <div className="relative bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-white p-7 rounded-3xl border-2 border-teal-200/80 hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2 transition-all duration-300 text-center space-y-3 group overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-500/30 group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black text-teal-700 bg-teal-100/90 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  ⏱ 24h Free Flexibility
                </span>
                <h4 className="font-bold text-slate-900 text-base group-hover:text-teal-600 transition">Flexible Free Changes</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Modify or adjust your booking dates hassle-free up to 24 hours prior to check-in with zero penalty fees.
              </p>
            </div>

            {/* Benefit 4: WhatsApp VIP Concierge (Emerald/Gold) */}
            <div className="relative bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-white p-7 rounded-3xl border-2 border-emerald-200/80 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-300 text-center space-y-3 group overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:-rotate-3 transition duration-300">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  💬 &lt;3 Min Response
                </span>
                <h4 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition">WhatsApp Concierge</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct 1-on-1 reservation care with instant responses, early check-in assistance, and personalized stays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 OVAL / ARCH PILL ROOMS SHOWCASE (CLICK FOR DETAILS) */}
      <section className="py-12 bg-[#f4f7f2] border-b border-slate-200 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 text-center">
          <div className="max-w-2xl mx-auto mb-6">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100/80 px-4 py-1.5 rounded-full border border-emerald-200">
              Exclusive Suites Showcase
            </span>
            <h2 className="text-3xl lg:text-4xl font-black font-serif-luxury mt-2 text-slate-900">
              Explore Our Signature Stays
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Hover or touch any suite to view details, or click to explore the full catalogue.
            </p>
          </div>

          {/* Oval Pill Row */}
          <div className="flex items-center justify-center gap-4 lg:gap-6 overflow-x-auto py-4 px-2 no-scrollbar">
            {rooms.slice(0, 5).map((room) => (
              <div
                key={room.id}
                onClick={() => navigateTo('rooms')}
                className="group relative w-40 sm:w-48 md:w-56 h-72 sm:h-88 md:h-[400px] rounded-[100px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 shrink-0 bg-white border-4 border-white"
              >
                {/* Full Room Image */}
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Top Rating Badge on Hover */}
                <div className="absolute top-5 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                  <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                    ★ {room.rating} Rating
                  </span>
                </div>

                {/* Bottom White Details Container - ONLY ON HOVER / TOUCH */}
                <div className="absolute bottom-0 inset-x-0 bg-white h-[42%] flex flex-col items-center justify-center px-3 rounded-b-[100px] opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl pointer-events-none group-hover:pointer-events-auto">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-xs sm:text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shrink-0 animate-pulse"></span>
                    <span className="truncate max-w-[140px] font-outfit font-bold">{room.name.split(' ')[0]} {room.name.split(' ')[1]}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium mt-1 font-outfit">
                    ₹{room.price.toLocaleString('en-IN')}/night
                  </span>
                  <span className="text-[9px] text-indigo-600 font-semibold mt-1.5 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Pill View All Button */}
          <div className="mt-6">
            <button
              onClick={() => navigateTo('rooms')}
              className="bg-[#78b13f] hover:bg-[#689d34] text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-emerald-600/20 hover:scale-105 transition-all text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              View All Rooms →
            </button>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED GUEST REVIEWS (CLEAN & ANIMATED) */}
      <section className="pt-10 pb-12 px-6 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <span className="text-pink-600 font-bold text-xs uppercase tracking-widest bg-pink-50 px-3.5 py-1.5 rounded-full border border-pink-100 inline-block mb-2">
              ★ 4.99 Rating from 1,200+ Guests
            </span>
            <h2 className="text-3xl lg:text-4xl font-black font-serif-luxury text-slate-900">
              Loved by Luxury Travelers
            </h2>
          </div>

          {/* Clean Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveReviewIndex((activeReviewIndex - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveReviewIndex((activeReviewIndex + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Animated Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((offset) => {
            const index = (activeReviewIndex + offset) % testimonials.length;
            const t = testimonials[index];
            return (
              <div
                key={index}
                className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Stay
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition">
                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{t.name}</h4>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {t.location} • <span className="text-indigo-600 font-semibold">{t.room.split(' ')[0]} {t.room.split(' ')[1]}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

