import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { Hotel, MessageCircle, Phone, Mail, ChevronRight, CheckCircle2, Headphones } from 'lucide-react';

export default function DesktopFooter() {
  const { navigateTo } = useHotel();

  return (
    <footer className="bg-gradient-to-b from-[#140f06] via-[#1a1409] to-[#0d0a04] text-amber-100/70 pt-10 pb-6 border-t-2 border-amber-500/40 relative overflow-hidden">
      {/* Ambient golden top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-amber-500/20">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Hotel className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black font-outfit bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                LUMINA GRAND
              </span>
              <span className="block text-[9px] tracking-widest text-amber-400 font-bold uppercase">Luxury Hotel & Suites</span>
            </div>
          </div>
          <p className="text-xs text-amber-100/60 leading-relaxed">
            A luxury oceanfront hotel offering bespoke 5-star room & suite stays, private in-room jacuzzis, and around-the-clock room service.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://wa.me/919845012345" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition shadow-sm">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="tel:+919845012345" className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition shadow-sm">
              <Phone className="w-4 h-4" />
            </a>
            <a href="mailto:reservations@luminagrandhotel.com" className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition shadow-sm">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Quick Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => navigateTo('home')} className="text-amber-100/70 hover:text-amber-300 transition flex items-center gap-1.5 group">
                <ChevronRight className="w-3.5 h-3.5 text-amber-500/60 group-hover:translate-x-0.5 transition-transform" /> Home
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('rooms')} className="text-amber-100/70 hover:text-amber-300 transition flex items-center gap-1.5 group">
                <ChevronRight className="w-3.5 h-3.5 text-amber-500/60 group-hover:translate-x-0.5 transition-transform" /> Luxury Rooms & Suites
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('booking')} className="text-amber-100/70 hover:text-amber-300 transition flex items-center gap-1.5 group">
                <ChevronRight className="w-3.5 h-3.5 text-amber-500/60 group-hover:translate-x-0.5 transition-transform" /> Check Availability & Book
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('gallery')} className="text-amber-100/70 hover:text-amber-300 transition flex items-center gap-1.5 group">
                <ChevronRight className="w-3.5 h-3.5 text-amber-500/60 group-hover:translate-x-0.5 transition-transform" /> Room Photo Gallery
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="text-amber-100/70 hover:text-amber-300 transition flex items-center gap-1.5 group">
                <ChevronRight className="w-3.5 h-3.5 text-amber-500/60 group-hover:translate-x-0.5 transition-transform" /> Contact & Directions
              </button>
            </li>
          </ul>
        </div>

        {/* Amenities Highlights */}
        <div>
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Room Amenities
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Panoramic Ocean Balconies</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> California King Bedding</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> In-Suite Private Heated Jacuzzis</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 24/7 Dedicated Butler Service</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 1Gbps High Speed Optical WiFi</li>
          </ul>
        </div>

        {/* 24/7 Concierge Box */}
        <div className="bg-gradient-to-br from-amber-950/40 via-stone-900/90 to-amber-950/50 p-4 rounded-2xl border border-amber-500/30 space-y-2.5 shadow-lg shadow-amber-950/20">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Headphones className="w-4 h-4" /> 24/7 Concierge
          </div>
          <div className="text-white font-black text-base">Direct Assistance</div>
          <p className="text-[11px] text-amber-100/60 leading-relaxed">
            Need customized room preferences or group suite bookings?
          </p>
          <div className="pt-1">
            <button
              onClick={() => navigateTo('contact')}
              className="w-full text-center block bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs py-2 px-3 rounded-xl shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              Contact Concierge Desk
            </button>
          </div>
        </div>

      </div>

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 pt-5 flex flex-col md:flex-row justify-between items-center text-xs text-amber-200/50">
        <p>© 2026 Lumina Grand Luxury Hotel & Suites. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <button onClick={() => navigateTo('privacy')} className="hover:text-amber-300 transition">
            Privacy Policy
          </button>
          <button onClick={() => navigateTo('terms')} className="hover:text-amber-300 transition">
            Terms & Conditions
          </button>
        </div>
      </div>
    </footer>
  );
}
