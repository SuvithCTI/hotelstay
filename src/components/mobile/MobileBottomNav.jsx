import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { Home, BedDouble, Calendar, Images, Phone } from 'lucide-react';

export default function MobileBottomNav() {
  const { activeTab, navigateTo } = useHotel();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-[#140f06]/95 backdrop-blur-md border-t border-amber-500/30 py-2 px-3 flex justify-around items-center shadow-lg shadow-amber-950/40">
      <button
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center gap-0.5 transition ${activeTab === 'home' ? 'text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-amber-100/60 hover:text-amber-300'}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => navigateTo('rooms')}
        className={`flex flex-col items-center gap-0.5 transition ${activeTab === 'rooms' ? 'text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-amber-100/60 hover:text-amber-300'}`}
      >
        <BedDouble className="w-5 h-5" />
        <span className="text-[10px]">Rooms</span>
      </button>

      <button
        onClick={() => navigateTo('booking')}
        className="flex flex-col items-center gap-0.5"
      >
        <div className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/40 font-bold">
          <Calendar className="w-5 h-5 stroke-[2.5]" />
        </div>
        <span className={`text-[10px] font-bold ${activeTab === 'booking' ? 'text-amber-300' : 'text-amber-200/80'}`}>Book</span>
      </button>

      {userRole === 'user' ? (
        <button
          onClick={() => navigateTo('my-bookings')}
          className={`flex flex-col items-center gap-0.5 transition ${activeTab === 'my-bookings' ? 'text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-amber-100/60 hover:text-amber-300'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px]">Bookings</span>
        </button>
      ) : userRole === 'admin' ? (
        <button
          onClick={() => navigateTo('admin')}
          className={`flex flex-col items-center gap-0.5 transition ${activeTab === 'admin' ? 'text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-amber-100/60 hover:text-amber-300'}`}
        >
          <BedDouble className="w-5 h-5" />
          <span className="text-[10px]">Admin</span>
        </button>
      ) : (
        <button
          onClick={() => navigateTo('gallery')}
          className={`flex flex-col items-center gap-0.5 transition ${activeTab === 'gallery' ? 'text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-amber-100/60 hover:text-amber-300'}`}
        >
          <Images className="w-5 h-5" />
          <span className="text-[10px]">Gallery</span>
        </button>
      )}

      <button
        onClick={() => navigateTo('contact')}
        className={`flex flex-col items-center gap-0.5 transition ${activeTab === 'contact' ? 'text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-amber-100/60 hover:text-amber-300'}`}
      >
        <Phone className="w-5 h-5" />
        <span className="text-[10px]">Contact</span>
      </button>
    </nav>
  );
}
