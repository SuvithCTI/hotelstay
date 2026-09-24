import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Search, RotateCcw, Star, Users, Maximize, Bed, Wifi, Eye, Info } from 'lucide-react';

export default function DesktopRoomsView() {
  const { rooms, navigateTo, setActiveModalRoom } = useHotel();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setMaxPrice(5000);
  };

  const filteredRooms = rooms.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                        r.tagline.toLowerCase().includes(search.toLowerCase()) || 
                        r.bed.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || r.category === category;
    const matchPrice = r.price <= maxPrice;
    return matchSearch && matchCat && matchPrice;
  });

  return (
    <div className="bg-slate-50 text-slate-800 pb-20">
      
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-14 px-6 lg:px-12 xl:px-16 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Tailored Sanctuary
          </span>
          <h1 className="text-4xl lg:text-5xl font-black font-serif-luxury mt-3">
            Luxury Rooms & Suites
          </h1>
          <p className="text-slate-300 mt-2 max-w-2xl text-sm leading-relaxed">
            Discover your sanctuary with panoramic ocean views, private hot tubs, handcrafted furnishings, and around-the-clock bespoke amenities.
          </p>
        </div>
      </section>

      {/* FILTER CONTROL BAR */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 -mt-7 relative z-20">
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, bed, features..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category */}
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Room Categories</option>
                <option value="Presidential">Presidential Penthouse</option>
                <option value="Ocean Suites">Ocean Suites</option>
                <option value="Executive">Executive Club</option>
                <option value="Family Suites">Family Suites</option>
                <option value="Deluxe">Deluxe Rooms</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-200">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                <span>Max Price / Night</span>
                <span className="text-indigo-600 font-black">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Reset */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-500">{filteredRooms.length} Luxury Rooms</span>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-2 rounded-xl transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ROOMS GRID */}
      <section className="py-14 px-6 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <Info className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No rooms match your filter criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing search terms or raising the budget slider.</p>
            <button onClick={resetFilters} className="mt-4 bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-xl">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRooms.map(room => (
              <div key={room.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover-lift flex flex-col group transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className={`absolute top-3 left-3 bg-gradient-to-r ${room.badgeColor} text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-md`}>
                    {room.badge}
                  </div>
                  <div className={`absolute top-3 right-3 ${room.available ? 'bg-emerald-500' : 'bg-rose-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow`}>
                    {room.available ? '● Available' : '● Reserved'}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {room.rating} ({room.reviewsCount})
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">{room.category}</div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-1">{room.name}</h3>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">{room.tagline}</p>

                    <div className="grid grid-cols-2 gap-1.5 my-3 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-1"><Users className="w-3 h-3 text-indigo-600 shrink-0" /> <span className="truncate">{room.capacity}</span></div>
                      <div className="flex items-center gap-1"><Maximize className="w-3 h-3 text-indigo-600 shrink-0" /> <span className="truncate">{room.size}</span></div>
                      <div className="flex items-center gap-1 col-span-2"><Bed className="w-3 h-3 text-indigo-600 shrink-0" /> <span className="truncate">{room.bed}</span></div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {room.amenities.slice(0, 2).map((a, i) => (
                        <span key={i} className="bg-indigo-50 text-indigo-700 text-[10px] font-medium px-2 py-0.5 rounded-md truncate max-w-full">
                          {typeof a === 'string' ? a : a.name}
                        </span>
                      ))}
                      {room.amenities.length > 2 && (
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-medium px-1.5 py-0.5 rounded-md">
                          +{room.amenities.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 line-through block">₹{room.originalPrice.toLocaleString('en-IN')}</span>
                      <div className="text-xl font-black text-slate-900 font-outfit leading-none">
                        ₹{room.price.toLocaleString('en-IN')}<span className="text-[10px] text-slate-500 font-normal"> /n</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveModalRoom(room)}
                        className="text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl transition cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigateTo('booking', room.id)}
                        className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition cursor-pointer"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
