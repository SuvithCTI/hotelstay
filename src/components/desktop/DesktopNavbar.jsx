import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { Hotel, Home, BedDouble, CalendarCheck, Images, MapPin, UserRound, LogOut } from 'lucide-react';

export default function DesktopNavbar() {
  const { activeTab, userRole, userName, signOut, navigateTo } = useHotel();

  return (
    <>
      {/* Main Desktop Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#140f06]/95 via-[#1c1409]/95 to-[#140f06]/95 backdrop-blur-md border-b border-amber-500/30 shadow-lg shadow-amber-950/30 transition-all">
        {/* Subtle top golden accent bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-amber-600/0 via-amber-400/80 to-amber-600/0" />
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => navigateTo('home')} className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <Hotel className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black font-outfit tracking-tight bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                LUMINA GRAND
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-amber-400 uppercase">
                Luxury Hotel & Suites
              </span>
            </div>
          </div>

          {/* Nav Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm">
            <button
              onClick={() => navigateTo('home')}
              className={`font-bold transition pb-1 flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'text-amber-300 border-b-2 border-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                  : 'text-amber-100/70 hover:text-amber-300'
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </button>

            <button
              onClick={() => navigateTo('rooms')}
              className={`font-bold transition pb-1 flex items-center gap-1.5 ${
                activeTab === 'rooms'
                  ? 'text-amber-300 border-b-2 border-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                  : 'text-amber-100/70 hover:text-amber-300'
              }`}
            >
              <BedDouble className="w-4 h-4" /> Rooms & Suites
            </button>

            <button
              onClick={() => navigateTo('booking')}
              className={`font-bold transition pb-1 flex items-center gap-1.5 ${
                activeTab === 'booking'
                  ? 'text-amber-300 border-b-2 border-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                  : 'text-amber-100/70 hover:text-amber-300'
              }`}
            >
              <CalendarCheck className="w-4 h-4" /> Book Stay
            </button>

            <button
              onClick={() => navigateTo('gallery')}
              className={`font-bold transition pb-1 flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'text-amber-300 border-b-2 border-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                  : 'text-amber-100/70 hover:text-amber-300'
              }`}
            >
              <Images className="w-4 h-4" /> Gallery
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`font-bold transition pb-1 flex items-center gap-1.5 ${
                activeTab === 'contact'
                  ? 'text-amber-300 border-b-2 border-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                  : 'text-amber-100/70 hover:text-amber-300'
              }`}
            >
              <MapPin className="w-4 h-4" /> Contact
            </button>

            {/* My Bookings (Only visible after signup / signin as customer) */}
            {userRole === 'user' && (
              <button
                onClick={() => navigateTo('my-bookings')}
                className={`font-bold transition pb-1 flex items-center gap-1.5 ${
                  activeTab === 'my-bookings'
                    ? 'text-amber-300 border-b-2 border-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    : 'text-amber-100/70 hover:text-amber-300'
                }`}
              >
                <CalendarCheck className="w-4 h-4" /> My Bookings
              </button>
            )}

            {/* Admin Dashboard (Only visible when signed in as admin) */}
            {userRole === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className={`font-bold transition pb-1 flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'text-amber-300 border-b-2 border-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    : 'text-amber-100/70 hover:text-amber-300'
                }`}
              >
                <CalendarCheck className="w-4 h-4" /> Admin Dashboard
              </button>
            )}

            {/* User Profile / Auth Action */}
            {userRole ? (
              <button
                onClick={() => navigateTo('login')}
                className="bg-amber-950/40 hover:bg-amber-950/80 border border-amber-500/30 text-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-sm"
                title="View Account Profile"
              >
                <UserRound className="w-4 h-4 text-amber-400" />
                <span className="max-w-[120px] truncate">{userRole === 'admin' ? 'Admin Portal' : (userName ? userName.split(' ')[0] : 'My Account')}</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className={`font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'login' ? 'text-amber-300 font-black' : 'text-amber-100/70 hover:text-amber-300'
                }`}
              >
                <UserRound className="w-4 h-4" /> Sign In
              </button>
            )}
          </nav>

          {/* CTA Book Now (Desktop) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('booking')}
              className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-slate-950 font-black px-4 sm:px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 stroke-[2.5]" /> <span className="hidden sm:inline">Check Availability</span><span className="sm:hidden">Book</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
