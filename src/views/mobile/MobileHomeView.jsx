import React, { useState, useEffect } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Award, Eye, MessageCircle, Calendar, Users, Search, Waves, UtensilsCrossed, Sparkles, ShieldCheck, Star, Shield, Coffee, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MobileHomeView() {
  const { rooms, navigateTo, generateWhatsAppLink } = useHotel();
  const [checkIn, setCheckIn] = useState(() => new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState('2');
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const testimonials = [
    {
      name: "Devendra Singhania",
      location: "Mumbai, India",
      room: "Penthouse Suite",
      rating: 5,
      comment: "Breathtaking oceanfront sunset and private heated jacuzzi! Rates under ₹5,000 for this level of luxury are unmatched.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Vikram Malhotra",
      location: "Bengaluru, India",
      room: "Executive Club Suite",
      rating: 5,
      comment: "Ultra-fast fiber WiFi, gorgeous room aesthetics, and seamless check-in. The WhatsApp concierge was instant.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Sneha Kapoor",
      location: "Delhi NCR, India",
      room: "Family Living Suite",
      rating: 5,
      comment: "The master bedrooms and in-room dining gave us the perfect family comfort. Exceptional cleanliness and hospitality.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Ananya Deshmukh",
      location: "Pune, India",
      room: "Horizon Suite",
      rating: 5,
      comment: "Waking up to floor-to-ceiling turquoise ocean views was pure magic. The complimentary breakfast was incredible.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSearch = (e) => {
    e?.preventDefault();
    navigateTo('booking');
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-24 space-y-5 pt-3">
      
      {/* 1. LUXURY HERO BANNER */}
      <div className="relative min-h-[440px] overflow-hidden mx-3 rounded-3xl border border-slate-200 shadow-xl flex flex-col justify-end p-5">
        <img
          src="/images/hero_resort.jpg"
          alt="Lumina Grand Luxury Resort"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-black/30" />

        <div className="relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full shadow-md mx-auto">
            <Award className="w-3.5 h-3.5 text-amber-400" /> ★ 5-Star Oceanfront Suites
          </div>
          
          <h1 className="text-2xl font-black font-serif-luxury text-white leading-tight">
            Where Pure Elegance Meets <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">Ocean Serenity</span>
          </h1>
          
          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-light">
            Panoramic sea balconies, heated horizon jacuzzis, and 24/7 dedicated butler service under ₹5,000/night.
          </p>

          {/* Centered Metrics Badges */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="bg-slate-950/80 backdrop-blur-md border border-white/20 p-2 rounded-xl text-center shadow-md">
              <div className="text-xs font-bold text-amber-400 font-outfit">4.99 ★</div>
              <div className="text-[9px] text-slate-300">1.2k+ Reviews</div>
            </div>
            <div className="bg-slate-950/80 backdrop-blur-md border border-white/20 p-2 rounded-xl text-center shadow-md">
              <div className="text-xs font-bold text-teal-300 font-outfit">100%</div>
              <div className="text-[9px] text-slate-300">Sea Balconies</div>
            </div>
            <div className="bg-slate-950/80 backdrop-blur-md border border-white/20 p-2 rounded-xl text-center shadow-md">
              <div className="text-xs font-bold text-amber-300 font-outfit">24/7</div>
              <div className="text-[9px] text-slate-300">VIP Butler</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              onClick={() => navigateTo('rooms')}
              className="flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black py-3 rounded-xl text-center text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" /> Explore 8 Suites
            </button>
            <a
              href={generateWhatsAppLink("Hello Lumina Grand, I am interested in booking a luxury room.")}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl text-xs flex items-center justify-center shadow-lg shadow-emerald-600/20 active:scale-95 transition"
              title="WhatsApp Concierge"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. QUICK AVAILABILITY SEARCH */}
      <div className="px-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900">
            <span className="flex items-center gap-1.5 text-amber-900"><Calendar className="w-3.5 h-3.5 text-amber-600" /> Check Availability</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">Best Rate Guaranteed</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Check-in</span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-900 outline-none w-full cursor-pointer"
              />
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Check-out</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-900 outline-none w-full cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Guests</span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer active:scale-95 transition"
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" /> Check Room Availability
          </button>
        </div>
      </div>

      {/* 3. SIGNATURE IN-ROOM PRIVILEGES */}
      <section className="px-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" /> 5-Star Indulgence
            </span>
            <h3 className="text-base font-black text-slate-900 font-serif-luxury mt-0.5">Signature Experiences</h3>
          </div>
          <span className="text-[10px] text-amber-800 bg-amber-100 font-bold px-2.5 py-1 rounded-full border border-amber-200">
            ✨ All 8 Suites
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Cyan/Blue Horizon */}
          <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-white p-3.5 rounded-2xl border border-cyan-100 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 mb-2">
              <Waves className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Sea Balconies</h4>
            <span className="text-[10px] text-slate-600 leading-tight block mt-0.5">100% Ocean Sunrise</span>
            <div className="mt-2 inline-block text-[9px] font-bold text-cyan-800 bg-cyan-100 border border-cyan-200 px-2 py-0.5 rounded-md">
              🌊 Sea Facing
            </div>
          </div>

          {/* Pink/Rose Dining */}
          <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-white p-3.5 rounded-2xl border border-pink-100 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-pink-500/20 mb-2">
              <UtensilsCrossed className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">In-Room Dining</h4>
            <span className="text-[10px] text-slate-600 leading-tight block mt-0.5">Bespoke Breakfast</span>
            <div className="mt-2 inline-block text-[9px] font-bold text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-md">
              🍳 In-Bed Menu
            </div>
          </div>

          {/* Teal/Emerald Jacuzzis */}
          <div className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-white p-3.5 rounded-2xl border border-teal-100 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20 mb-2">
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Suite Jacuzzis</h4>
            <span className="text-[10px] text-slate-600 leading-tight block mt-0.5">Heated Hydro Spa</span>
            <div className="mt-2 inline-block text-[9px] font-bold text-teal-800 bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-md">
              ✨ Heated Spa
            </div>
          </div>

          {/* Amber/Gold Butler */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-white p-3.5 rounded-2xl border border-amber-100 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 mb-2">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">24/7 VIP Butler</h4>
            <span className="text-[10px] text-slate-600 leading-tight block mt-0.5">Express Concierge</span>
            <div className="mt-2 inline-block text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-md">
              👑 Dedicated VIP
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPOTLIGHT SUITE BANNER */}
      <section className="px-3">
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm space-y-0">
          <div className="relative h-48">
            <img
              src="/images/bedroom_penthouse.jpg"
              alt="Royal Presidential Penthouse"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full shadow-lg">
              ★ Crown Jewel Suite
            </div>
            <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md text-amber-300 font-black text-sm px-3 py-1 rounded-xl border border-white/20">
              ₹4,999<span className="text-[10px] text-slate-300 font-normal"> /night</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Flagship Master Suite</span>
              <h4 className="text-base font-black text-slate-900 font-serif-luxury mt-0.5">Royal Presidential Penthouse</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">1,450 sq.ft top-floor residence with heated horizon jacuzzi & cathedral teak ceiling.</p>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Expansive master residence with dual king beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Private heated jacuzzi & seaside balcony</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('booking', 'rm-101')}
              className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black py-3 rounded-xl text-xs shadow-md shadow-amber-500/20 active:scale-95 transition cursor-pointer"
            >
              Book Penthouse Suite Now
            </button>
          </div>
        </div>
      </section>

      {/* 5. DIRECT BOOKING PRIVILEGES */}
      <section className="px-3 space-y-3">
        <div>
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Official Direct Advantage</span>
          <h3 className="text-base font-black text-slate-900 font-serif-luxury">Why Book Directly With Us?</h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Indigo Rate Guarantee */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white p-3.5 rounded-2xl border border-indigo-100 space-y-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Shield className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Best Rate Lock</h4>
            <p className="text-[10px] text-slate-600 leading-tight">All suites strictly under ₹5,000</p>
          </div>

          {/* Pink Free Breakfast */}
          <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-white p-3.5 rounded-2xl border border-pink-100 space-y-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Coffee className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Free Breakfast</h4>
            <p className="text-[10px] text-slate-600 leading-tight">Gourmet in-room morning treats</p>
          </div>

          {/* Teal Free Changes */}
          <div className="bg-gradient-to-br from-teal-50 via-emerald-50 to-white p-3.5 rounded-2xl border border-teal-100 space-y-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Clock className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Free Changes</h4>
            <p className="text-[10px] text-slate-600 leading-tight">Modify stay up to 24h prior</p>
          </div>

          {/* Emerald WhatsApp VIP */}
          <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-white p-3.5 rounded-2xl border border-emerald-100 space-y-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">WhatsApp VIP</h4>
            <p className="text-[10px] text-slate-600 leading-tight">&lt;3 min concierge response</p>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE ROOMS SHOWCASE */}
      <section className="px-3 py-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm space-y-4 text-center">
        <div>
          <span className="text-amber-800 font-bold text-[10px] uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Exclusive Suites
          </span>
          <h3 className="text-lg font-black text-slate-900 font-serif-luxury mt-2">Signature Rooms Showcase</h3>
          <p className="text-xs text-slate-500 mt-0.5">Tap on any suite to view details & book</p>
        </div>

        {/* Scrollable Pill Row */}
        <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 no-scrollbar justify-start">
          {rooms.slice(0, 5).map((room) => (
            <div
              key={room.id}
              onClick={() => navigateTo('rooms')}
              className="group relative w-36 h-64 rounded-[80px] overflow-hidden cursor-pointer shadow-md shrink-0 bg-slate-100 border-2 border-amber-400/50"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-white pt-3 pb-4 px-2 flex flex-col items-center justify-center rounded-b-[80px] shadow-md">
                <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0 animate-pulse"></span>
                  <span className="truncate max-w-[100px]">{room.name.split(' ')[0]} {room.name.split(' ')[1]}</span>
                </div>
                <span className="text-[9px] text-slate-800 font-bold font-outfit mt-0.5">
                  ₹{room.price.toLocaleString('en-IN')}/n
                </span>
                <span className="text-[8px] text-indigo-600 font-bold mt-0.5">View Details →</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={() => navigateTo('rooms')}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black px-6 py-2.5 rounded-full shadow-md shadow-amber-500/20 text-xs inline-flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
          >
            View All 8 Rooms →
          </button>
        </div>
      </section>

      {/* 7. VERIFIED REVIEWS CAROUSEL */}
      <section className="px-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-serif-luxury">Guest Reviews</h3>
            <span className="text-[10px] text-amber-700 font-bold">4.99 ★ (1,248+ Verified Stays)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveReviewIndex((activeReviewIndex - 1 + testimonials.length) % testimonials.length)}
              className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs shadow-sm cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveReviewIndex((activeReviewIndex + 1) % testimonials.length)}
              className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs shadow-sm cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spotlight Review Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3 relative overflow-hidden transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(testimonials[activeReviewIndex].rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Verified Stay
            </span>
          </div>

          <p className="text-xs text-slate-700 italic leading-relaxed font-serif-luxury min-h-[50px]">
            "{testimonials[activeReviewIndex].comment}"
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-sm">
                {testimonials[activeReviewIndex].name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{testimonials[activeReviewIndex].name}</h4>
                <span className="text-[9px] text-slate-500 block">{testimonials[activeReviewIndex].location} • <span className="text-amber-700 font-bold">{testimonials[activeReviewIndex].room}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`cursor-pointer rounded-full transition-all ${
                    activeReviewIndex === idx ? 'w-4 h-1.5 bg-amber-500' : 'w-1.5 h-1.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="px-4 py-6 text-center text-xs text-slate-400 space-y-1">
        <div className="text-slate-700 font-bold text-xs">Lumina Grand Luxury Hotel & Suites</div>
        <p className="text-[10px]">© {new Date().getFullYear()} Lumina Grand Luxury Hotel & Suites. All rights reserved.</p>
      </div>

    </div>
  );
}
