import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { Home, BedDouble, Calendar, Images, Phone } from 'lucide-react';

export default function MobileBottomNav() {
  const { activeTab, navigateTo, userRole } = useHotel();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-2 px-3 flex justify-around items-center shadow-lg shadow-slate-900/10">
      <button
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${activeTab === 'home' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-amber-600'}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => navigateTo('rooms')}
        className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${activeTab === 'rooms' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-amber-600'}`}
      >
        <BedDouble className="w-5 h-5" />
        <span className="text-[10px]">Rooms</span>
      </button>

      <button
        onClick={() => navigateTo('booking')}
        className="flex flex-col items-center gap-0.5 cursor-pointer"
      >
        <div className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 font-bold">
          <Calendar className="w-5 h-5 stroke-[2.5]" />
        </div>
        <span className={`text-[10px] font-bold ${activeTab === 'booking' ? 'text-amber-600' : 'text-slate-600'}`}>Book</span>
      </button>

      {userRole === 'user' ? (
        <button
          onClick={() => navigateTo('my-bookings')}
          className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${activeTab === 'my-bookings' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-amber-600'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px]">Bookings</span>
        </button>
      ) : userRole === 'admin' ? (
        <button
          onClick={() => navigateTo('admin')}
          className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${activeTab === 'admin' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-amber-600'}`}
        >
          <BedDouble className="w-5 h-5" />
          <span className="text-[10px]">Admin</span>
        </button>
      ) : (
        <button
          onClick={() => navigateTo('gallery')}
          className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${activeTab === 'gallery' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-amber-600'}`}
        >
          <Images className="w-5 h-5" />
          <span className="text-[10px]">Gallery</span>
        </button>
      )}

      <button
        onClick={() => navigateTo('contact')}
        className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${activeTab === 'contact' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-amber-600'}`}
      >
        <Phone className="w-5 h-5" />
        <span className="text-[10px]">Contact</span>
      </button>
    </nav>
  );
}
