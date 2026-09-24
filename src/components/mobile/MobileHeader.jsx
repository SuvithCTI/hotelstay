import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { Hotel, MessageCircle, UserRound, LogOut } from 'lucide-react';

export default function MobileHeader({ title }) {
  const { navigateTo, userRole, userName, signOut } = useHotel();

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#140f06]/95 via-[#1c1409]/95 to-[#140f06]/95 backdrop-blur-lg border-b border-amber-500/30 px-4 py-3 flex items-center justify-between shadow-md shadow-amber-950/20">
      <div onClick={() => navigateTo('home')} className="flex items-center gap-2.5 cursor-pointer">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
          <Hotel className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-sm font-black font-outfit bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent tracking-tight leading-none">
            {title || "LUMINA GRAND"}
          </h1>
          <span className="text-[9px] tracking-widest text-amber-400 font-bold uppercase">Hotel & Suites</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://wa.me/919845012345"
          target="_blank"
          rel="noreferrer"
          className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center justify-center shadow-md hover:bg-amber-500 hover:text-slate-950 transition"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
        <button
          onClick={() => navigateTo(userRole === 'user' ? 'my-bookings' : userRole === 'admin' ? 'admin' : 'login')}
          aria-label={userRole ? `Signed in as ${userRole}` : 'Sign in'}
          title={userRole ? `Signed in as ${userRole}` : 'Sign in'}
          className={`relative rounded-xl flex items-center justify-center gap-1.5 shadow-md transition ${
            userRole
              ? 'bg-[#211706] border border-amber-500/50 text-amber-300 px-2.5 py-2'
              : 'w-8 h-8 bg-amber-950/80 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950'
          }`}
        >
          <UserRound className="w-4 h-4 stroke-[2.5]" />
          {userRole && <span className="text-[10px] font-black tracking-wide">{userRole === 'admin' ? 'Admin' : (userName ? userName.split(' ')[0] : 'Account')}</span>}
          {userRole && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#140f06]"></span>
          )}
        </button>
      </div>
    </header>
  );
}
