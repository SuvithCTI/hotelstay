import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function MobileGalleryView() {
  const { gallery } = useHotel();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Presidential', 'Ocean Suites', 'Deluxe Rooms', 'Family Suites', 'Executive Club'];

  const filteredItems = activeCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen pb-24 space-y-3 pt-2">
      
      {/* HEADER BANNER */}
      <div className="px-3">
        <div className="bg-[#140f06] p-4 rounded-3xl border border-amber-500/30 shadow-xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Visual Showcase
          </span>
          <h2 className="text-xl font-black font-serif-luxury text-white">Resort Gallery & Suites</h2>
          <p className="text-xs text-amber-100/70">Explore our luxury suites, beachfront jacuzzis, and ocean sunrise balconies.</p>
          
          {/* CATEGORY CHIPS */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-2">
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
                {cat === 'All' ? 'All Photos' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2-COL PHOTO GRID */}
      <main className="px-3">
        <div className="grid grid-cols-2 gap-2.5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="relative h-48 rounded-2xl overflow-hidden bg-[#140f06] border border-amber-500/30 cursor-pointer shadow-md group active:scale-95 transition"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0803]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <span className="text-[8px] font-black text-amber-400 uppercase tracking-wider">{item.category}</span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FULLSCREEN TOUCH LIGHTBOX */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-[#0c0803]/95 backdrop-blur-md flex flex-col justify-between p-4">
          <div className="flex justify-between items-center text-white">
            <span className="text-[10px] font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-3 py-1 rounded-full uppercase">
              {filteredItems[lightboxIndex].category}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="w-9 h-9 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-auto flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[60vh] w-auto rounded-2xl object-contain shadow-2xl border-2 border-amber-500/40"
            />
            <h3 className="text-lg font-bold text-white font-serif-luxury mt-4 text-center">
              {filteredItems[lightboxIndex].title}
            </h3>
            <p className="text-xs text-amber-100/70 text-center max-w-xs mt-1">
              {filteredItems[lightboxIndex].description}
            </p>
          </div>

          <div className="flex justify-between items-center pb-2">
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
              className="bg-[#1c1508] border border-amber-500/30 text-amber-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
              className="bg-[#1c1508] border border-amber-500/30 text-amber-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
