import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function DesktopGalleryView() {
  const { gallery } = useHotel();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Presidential', 'Ocean Suites', 'Deluxe Rooms', 'Family Suites', 'Executive Club'];

  const filteredItems = activeCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="bg-slate-50 text-slate-800 pb-20">
      
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white py-14 px-6 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 space-y-3">
          <span className="text-pink-400 font-bold text-xs uppercase tracking-widest bg-pink-500/10 px-3 py-1 rounded-full border border-pink-400/20">
            Visual Impressions
          </span>
          <h1 className="text-4xl lg:text-5xl font-black font-serif-luxury">
            A Glimpse into Room Luxury
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Explore our panoramic ocean suites, master king bedrooms, private sea balconies, and bespoke hotel accommodations.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 py-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-bold text-xs px-5 py-2.5 rounded-xl transition ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Photos' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* PHOTO GRID */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover-lift cursor-pointer bg-slate-900"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition"></div>
              
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                {item.category}
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-lg font-bold font-serif-luxury">{item.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">{item.description}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:translate-x-1 transition">
                  <Maximize2 className="w-3.5 h-3.5" /> Click to enlarge
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center relative">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
            />
            <div className="text-center mt-4 text-white space-y-1">
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="text-xl font-bold font-serif-luxury">{filteredItems[lightboxIndex].title}</h3>
              <p className="text-slate-300 text-xs max-w-md mx-auto">{filteredItems[lightboxIndex].description}</p>
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
}
