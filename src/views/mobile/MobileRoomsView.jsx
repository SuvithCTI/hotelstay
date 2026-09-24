import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Search, Eye, MessageCircle, Users, Bed, Maximize, Star, RotateCcw } from 'lucide-react';

export default function MobileRoomsView() {
  const { rooms, navigateTo, setActiveModalRoom, generateWhatsAppLink } = useHotel();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);

  const categories = ['all', 'Presidential', 'Ocean Suites', 'Executive', 'Family Suites', 'Deluxe'];

  const resetFilters = () => {
    setSearch('');
    setActiveCategory('all');
    setMaxPrice(5000);
  };

  const filteredRooms = rooms.filter(r => {
    const matchCat = activeCategory === 'all' || r.category === activeCategory;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                        r.bed.toLowerCase().includes(search.toLowerCase()) ||
                        (r.tagline && r.tagline.toLowerCase().includes(search.toLowerCase()));
    const matchPrice = r.price <= maxPrice;
    return matchCat && matchSearch && matchPrice;
  });

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen pb-24 space-y-4 pt-2">
      
      {/* SEARCH & FILTER CONTROLS */}
      <div className="px-3 space-y-3">
        <div className="bg-[#140f06] p-4 rounded-3xl border border-amber-500/30 shadow-xl space-y-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search suites, amenities, beds..."
              className="w-full pl-10 pr-3 py-2.5 bg-[#1c1508] border border-amber-500/30 rounded-xl text-xs text-white placeholder-amber-200/40 outline-none focus:border-amber-400"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md font-bold'
                    : 'bg-[#1c1508] text-amber-200/70 border border-amber-500/20'
                }`}
              >
                {cat === 'all' ? 'All Suites' : cat}
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="bg-[#1c1508] px-3.5 py-2 rounded-2xl border border-amber-500/20">
            <div className="flex justify-between text-[11px] font-bold text-amber-200 mb-1">
              <span>Max Price / Night</span>
              <span className="text-amber-400 font-black font-outfit">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="5000"
              step="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Count & Reset */}
          <div className="flex items-center justify-between text-xs text-amber-200/70 pt-1">
            <span>{filteredRooms.length} Luxury Suites Available</span>
            {(search || activeCategory !== 'all' || maxPrice < 5000) && (
              <button
                onClick={resetFilters}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ROOM LIST */}
      <main className="px-3 space-y-4">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-14 text-amber-200/60 text-xs bg-[#140f06] rounded-3xl border border-amber-500/30 p-6 space-y-3">
            <p>No luxury suites match your filter criteria.</p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredRooms.map(room => (
            <div
              key={room.id}
              className="bg-[#140f06] rounded-3xl overflow-hidden border border-amber-500/30 shadow-xl flex flex-col transition"
            >
              {/* Image & Badges */}
              <div className="relative h-52 cursor-pointer" onClick={() => setActiveModalRoom(room)}>
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140f06] via-transparent to-black/30" />
                
                <div className={`absolute top-3 left-3 bg-gradient-to-r ${room.badgeColor} text-white font-black text-[10px] px-3 py-1 rounded-full shadow-md`}>
                  {room.badge}
                </div>
                
                <div className={`absolute top-3 right-3 ${room.available ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-rose-600 text-white font-bold'} text-[10px] px-2.5 py-1 rounded-full shadow-md`}>
                  {room.available ? '● Available' : '● Reserved'}
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-amber-500/30 text-right">
                  <span className="text-[10px] text-slate-400 line-through block">₹{room.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-base font-black text-amber-400 font-outfit">₹{room.price.toLocaleString('en-IN')}</span>
                  <span className="text-[9px] text-slate-300 font-medium"> /night</span>
                </div>

                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border border-amber-500/20">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {room.rating} ({room.reviewsCount})
                </div>
              </div>

              {/* Room Content */}
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{room.category}</span>
                  <h3 className="text-base font-black text-white font-serif-luxury mt-0.5">{room.name}</h3>
                  <p className="text-xs text-amber-100/70 mt-0.5 line-clamp-2 leading-relaxed">{room.tagline}</p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-1.5 text-[11px] text-amber-100/80 bg-[#1c1508] p-2.5 rounded-xl border border-amber-500/20 text-center">
                  <div className="flex items-center justify-center gap-1"><Users className="w-3.5 h-3.5 text-amber-400 shrink-0" /> <span className="truncate">{room.capacity}</span></div>
                  <div className="flex items-center justify-center gap-1"><Maximize className="w-3.5 h-3.5 text-amber-400 shrink-0" /> <span className="truncate">{room.size}</span></div>
                  <div className="flex items-center justify-center gap-1"><Bed className="w-3.5 h-3.5 text-amber-400 shrink-0" /> <span className="truncate">{room.bed}</span></div>
                </div>

                {/* Amenities Pills */}
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 3).map((a, i) => (
                    <span key={i} className="bg-amber-950/60 border border-amber-500/30 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {typeof a === 'string' ? a : a.name}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="bg-[#1c1508] border border-amber-500/20 text-amber-200/60 text-[10px] px-1.5 py-0.5 rounded-md">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveModalRoom(room)}
                    className="bg-[#1c1508] hover:bg-[#251c0b] text-amber-300 font-bold text-xs p-3 rounded-xl flex items-center justify-center border border-amber-500/30 active:scale-95 transition cursor-pointer"
                    title="View full room details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTo('booking', room.id)}
                    className="flex-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs py-3 rounded-xl text-center shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
                  >
                    Book This Suite
                  </button>
                  <a
                    href={generateWhatsAppLink(`Hi Lumina Grand, I want to reserve the ${room.name} (₹${room.price.toLocaleString('en-IN')}/night)`)}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl flex items-center justify-center shadow-md active:scale-95 transition"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

    </div>
  );
}
