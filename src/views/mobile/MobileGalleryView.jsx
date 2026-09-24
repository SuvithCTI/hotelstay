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
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-24 space-y-4 pt-3">
      
      {/* HEADER BANNER */}
      <div className="px-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" /> Visual Showcase
          </span>
          <h2 className="text-xl font-black font-serif-luxury text-slate-900">Resort Gallery & Suites</h2>
          <p className="text-xs text-slate-500">Explore our luxury suites, beachfront jacuzzis, and ocean sunrise balconies.</p>
          
          {/* CATEGORY CHIPS */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 shadow-sm font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
              className="relative h-48 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm cursor-pointer group active:scale-95 transition"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <span className="text-[8px] font-black text-amber-300 uppercase tracking-wider">{item.category}</span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FULLSCREEN TOUCH LIGHTBOX */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4">
          <div className="flex justify-between items-center text-white">
            <span className="text-[10px] font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-3 py-1 rounded-full uppercase">
              {filteredItems[lightboxIndex].category}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="w-9 h-9 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-auto flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[60vh] w-auto rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <h3 className="text-lg font-bold text-white font-serif-luxury mt-4 text-center">
              {filteredItems[lightboxIndex].title}
            </h3>
            <p className="text-xs text-slate-300 text-center max-w-xs mt-1">
              {filteredItems[lightboxIndex].description}
            </p>
          </div>

          <div className="flex justify-between items-center pb-2">
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
              className="bg-slate-900 border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
              className="bg-slate-900 border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
