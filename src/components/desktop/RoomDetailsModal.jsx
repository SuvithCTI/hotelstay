import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { X, Check, MessageCircle, Star, Users, Maximize, Bed } from 'lucide-react';

export default function RoomDetailsModal() {
  const { activeModalRoom, setActiveModalRoom, navigateTo, generateWhatsAppLink } = useHotel();

  if (!activeModalRoom) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col animate-float">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 shrink-0 overflow-hidden">
          <img src={activeModalRoom.image} alt={activeModalRoom.name} className="w-full h-full object-cover" />
          <button
            onClick={() => setActiveModalRoom(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-950 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className={`absolute top-4 left-4 bg-gradient-to-r ${activeModalRoom.badgeColor} text-white font-bold text-xs px-3 py-1 rounded-full shadow-md`}>
            {activeModalRoom.badge}
          </div>
          <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {activeModalRoom.rating} ({activeModalRoom.reviewsCount} reviews)
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{activeModalRoom.category}</span>
              <h2 className="text-2xl font-black text-slate-900 font-serif-luxury mt-1">{activeModalRoom.name}</h2>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-indigo-600 font-outfit">₹{activeModalRoom.price.toLocaleString('en-IN')}</div>
              <span className="text-xs text-slate-400">per night + 18% GST</span>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">{activeModalRoom.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase flex items-center gap-1">
                <Users className="w-3 h-3 text-indigo-600" /> Guest Capacity
              </span>
              <span className="font-bold text-slate-800">{activeModalRoom.capacity}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase flex items-center gap-1">
                <Maximize className="w-3 h-3 text-indigo-600" /> Room Size
              </span>
              <span className="font-bold text-slate-800">{activeModalRoom.size}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase flex items-center gap-1">
                <Bed className="w-3 h-3 text-indigo-600" /> Bed Configuration
              </span>
              <span className="font-bold text-slate-800">{activeModalRoom.bed}</span>
            </div>
          </div>

          {/* Amenities List */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Complimentary Amenities & Facilities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {activeModalRoom.amenities.map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-slate-700 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> {typeof item === 'string' ? item : item.name}
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                const id = activeModalRoom.id;
                setActiveModalRoom(null);
                navigateTo('booking', id);
              }}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold py-3.5 rounded-xl text-center shadow-lg transition"
            >
              Proceed to Book Room
            </button>
            <a
              href={generateWhatsAppLink(`Hi Lumina Grand, I am interested in booking the ${activeModalRoom.name} for ₹${activeModalRoom.price.toLocaleString('en-IN')}/night.`)}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition text-xs"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
