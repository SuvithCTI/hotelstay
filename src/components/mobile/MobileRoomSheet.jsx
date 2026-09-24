import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { X, MessageCircle } from 'lucide-react';

export default function MobileRoomSheet() {
  const { activeModalRoom, setActiveModalRoom, navigateTo, generateWhatsAppLink } = useHotel();

  if (!activeModalRoom) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end justify-center">
      <div className="bg-slate-900 w-full max-h-[85vh] rounded-t-3xl border-t border-slate-700 p-5 space-y-4 overflow-y-auto">
        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-1"></div>

        <div className="relative h-48 rounded-2xl overflow-hidden">
          <img src={activeModalRoom.image} alt={activeModalRoom.name} className="w-full h-full object-cover" />
          <button
            onClick={() => setActiveModalRoom(null)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${activeModalRoom.badgeColor}`}>
            {activeModalRoom.badge}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase">{activeModalRoom.category}</span>
              <h2 className="text-lg font-bold text-white font-serif-luxury">{activeModalRoom.name}</h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-amber-400 font-outfit">₹{activeModalRoom.price.toLocaleString('en-IN')}</div>
              <span className="text-[9px] text-slate-500">/night + 18% GST</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{activeModalRoom.description}</p>

          <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl text-[10px] text-slate-300 my-3">
            <div><span className="text-slate-500 block">Cap:</span><strong>{activeModalRoom.capacity}</strong></div>
            <div><span className="text-slate-500 block">Bed:</span><strong>{activeModalRoom.bed}</strong></div>
            <div><span className="text-slate-500 block">Size:</span><strong>{activeModalRoom.size}</strong></div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Amenities:</span>
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              {activeModalRoom.amenities.map((a, idx) => (
                <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                  ✓ {typeof a === 'string' ? a : a.name}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 flex gap-2">
            <button
              onClick={() => {
                const id = activeModalRoom.id;
                setActiveModalRoom(null);
                navigateTo('booking', id);
              }}
              className="flex-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-3.5 rounded-xl text-center text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition"
            >
              Book This Suite Now
            </button>
            <a
              href={generateWhatsAppLink(`Hi Lumina Grand, I want to book ${activeModalRoom.name}`)}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 p-3.5 rounded-xl text-white flex items-center justify-center shadow-md active:scale-95 transition"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
