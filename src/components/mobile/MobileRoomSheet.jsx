import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { X, MessageCircle, Bed, Users, Maximize, Check } from 'lucide-react';

export default function MobileRoomSheet() {
  const { activeModalRoom, setActiveModalRoom, navigateTo, generateWhatsAppLink } = useHotel();

  if (!activeModalRoom) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end justify-center">
      <div className="bg-white w-full max-w-md max-h-[88vh] rounded-t-[2rem] border-t-2 border-amber-500/80 p-5 space-y-4 overflow-y-auto text-slate-800 shadow-2xl">
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-1"></div>

        <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <img src={activeModalRoom.image} alt={activeModalRoom.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
          <button
            onClick={() => setActiveModalRoom(null)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 border border-white/20 text-white flex items-center justify-center cursor-pointer shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
          <div className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-0.5 rounded-full text-white bg-gradient-to-r ${activeModalRoom.badgeColor} shadow-md`}>
            {activeModalRoom.badge}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{activeModalRoom.category}</span>
              <h2 className="text-lg font-black text-slate-900 font-serif-luxury mt-0.5">{activeModalRoom.name}</h2>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-amber-700 font-outfit">₹{activeModalRoom.price.toLocaleString('en-IN')}</div>
              <span className="text-[9px] text-slate-500 font-medium">/ one day (taxes incl.)</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{activeModalRoom.description}</p>

          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-[10px] text-slate-700 my-3 border border-slate-200 text-center font-medium">
            <div><span className="text-slate-500 block">Capacity</span><strong>{activeModalRoom.capacity}</strong></div>
            <div><span className="text-slate-500 block">Bed Type</span><strong>{activeModalRoom.bed}</strong></div>
            <div><span className="text-slate-500 block">Suite Size</span><strong>{activeModalRoom.size}</strong></div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Included In-Room Privileges:</span>
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              {activeModalRoom.amenities.map((a, idx) => (
                <span key={idx} className="bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-emerald-600" /> {typeof a === 'string' ? a : a.name}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-2">
            <button
              onClick={() => {
                const id = activeModalRoom.id;
                setActiveModalRoom(null);
                navigateTo('booking', id);
              }}
              className="flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black py-3.5 rounded-xl text-center text-xs shadow-md shadow-amber-500/20 active:scale-95 transition cursor-pointer"
            >
              Book This Suite Now
            </button>
            <a
              href={generateWhatsAppLink(`Hi Lumina Grand, I want to book ${activeModalRoom.name}`)}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 p-3.5 rounded-xl text-white flex items-center justify-center shadow-sm active:scale-95 transition"
              title="WhatsApp Concierge"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
