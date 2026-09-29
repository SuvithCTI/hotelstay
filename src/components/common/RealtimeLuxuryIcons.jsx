import React from 'react';

/**
 * Real-Time 3D Luxury Visual Icons for Lumina Grand Resort
 * High-definition, multi-layered realistic graphics with specular highlights,
 * realistic depth, vibrant gradients, and subtle ambient motion.
 */

// ==========================================
// 1. SIGNATURE EXPERIENCES REAL-TIME ICONS
// ==========================================

// 1.1 REAL-TIME SEA HORIZON BALCONY ICON
export function RealtimeSeaBalconyIcon({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 p-0.5 shadow-xl shadow-cyan-500/30 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="seaSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="40%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
          </radialGradient>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="railGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#skyGrad)" />
        <circle cx="32" cy="24" r="10" fill="url(#seaSun)" className="animate-pulse" />
        <circle cx="32" cy="24" r="14" stroke="#FEF08A" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
        <path d="M0 32 Q16 28 32 32 T64 32 L64 64 L0 64 Z" fill="#0369A1" opacity="0.9" />
        <path d="M0 37 C12 34 20 40 32 37 C44 34 52 40 64 37 L64 64 L0 64 Z" fill="url(#waveGrad2)" />
        <path d="M0 37 C12 34 20 40 32 37 C44 34 52 40 64 37" stroke="#E0F2FE" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
        <path d="M0 45 C14 41 22 48 36 44 C48 41 54 46 64 43 L64 64 L0 64 Z" fill="url(#waveGrad1)" />
        <path d="M0 45 C14 41 22 48 36 44 C48 41 54 46 64 43" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <rect x="10" y="47" width="44" height="13" rx="2" fill="url(#railGrad)" stroke="#FFFFFF" strokeWidth="0.8" />
        <line x1="18" y1="48" x2="18" y2="59" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
        <line x1="27" y1="48" x2="27" y2="59" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
        <line x1="37" y1="48" x2="37" y2="59" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
        <line x1="46" y1="48" x2="46" y2="59" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
        <rect x="8" y="46" width="48" height="2.5" rx="1.2" fill="#FFFFFF" />
        <path d="M6 8 Q32 2 58 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}

// 1.2 REAL-TIME IN-ROOM GOURMET DINING ICON
export function RealtimeGourmetDiningIcon({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-pink-600 to-red-700 p-0.5 shadow-xl shadow-pink-500/30 overflow-hidden group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="diningBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="50%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
          <linearGradient id="clocheDome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="35%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="silverPlatter" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#diningBg)" />
        <path d="M26 15 C24 12 28 9 26 6" stroke="#FFF1F2" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
        <path d="M32 13 C30 10 34 7 32 4" stroke="#FFF1F2" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" className="animate-pulse" />
        <path d="M38 15 C36 12 40 9 38 6" stroke="#FFF1F2" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
        <ellipse cx="32" cy="18" rx="3.5" ry="2" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
        <circle cx="32" cy="16.5" r="2" fill="#FEF08A" />
        <path d="M14 36 C14 23 22 19 32 19 C42 19 50 23 50 36 Z" fill="url(#clocheDome)" stroke="#D97706" strokeWidth="0.8" />
        <path d="M20 33 C20 25 25 22 32 22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
        <rect x="12" y="35" width="40" height="3" rx="1.5" fill="#FDE047" stroke="#B45309" strokeWidth="0.6" />
        <ellipse cx="32" cy="40" rx="24" ry="4" fill="url(#silverPlatter)" stroke="#FFFFFF" strokeWidth="0.8" />
        <ellipse cx="32" cy="40" rx="21" ry="2.5" fill="#F1F5F9" opacity="0.6" />
        <circle cx="48" cy="48" r="7" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
        <path d="M46 45 L47 51 M48 45 L48 51 M50 45 L49 51" stroke="#92400E" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="16" cy="48" r="7" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
        <path d="M14 46 C16 46 18 48 18 51 L14 51 Z" fill="#92400E" />
      </svg>
    </div>
  );
}

// 1.3 REAL-TIME HEATED IN-SUITE JACUZZI ICON
export function RealtimeHeatedJacuzziIcon({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 via-emerald-500 to-teal-700 p-0.5 shadow-xl shadow-teal-500/30 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="jacuzziBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#115E59" />
          </linearGradient>
          <radialGradient id="waterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </radialGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#jacuzziBg)" />
        <path d="M22 17 C20 13 24 10 22 6" stroke="#ECFDF5" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" className="animate-pulse" />
        <path d="M32 15 C30 11 34 8 32 4" stroke="#ECFDF5" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" className="animate-pulse" />
        <path d="M42 17 C40 13 44 10 42 6" stroke="#ECFDF5" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" className="animate-pulse" />
        <rect x="8" y="22" width="48" height="34" rx="8" fill="#F0FDF4" stroke="#CCFBF1" strokeWidth="1.5" />
        <ellipse cx="32" cy="36" rx="20" ry="11" fill="url(#waterGlow)" stroke="#FFFFFF" strokeWidth="1" />
        <ellipse cx="32" cy="36" rx="14" ry="7" stroke="#ECFDF5" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" style={{ transformOrigin: '32px 36px', animationDuration: '10s' }} />
        <circle cx="24" cy="34" r="2.2" fill="#FFFFFF" opacity="0.9" className="animate-bounce" />
        <circle cx="38" cy="33" r="2" fill="#FFFFFF" opacity="0.9" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        <circle cx="32" cy="38" r="2.8" fill="#FFFFFF" opacity="0.95" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
        <circle cx="28" cy="31" r="1.5" fill="#E0F2FE" opacity="0.8" />
        <circle cx="36" cy="39" r="1.2" fill="#E0F2FE" opacity="0.8" />
        <path d="M50 14 L52 18 L56 20 L52 22 L50 26 L48 22 L44 20 L48 18 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" className="animate-pulse" />
      </svg>
    </div>
  );
}

// 1.4 REAL-TIME 24/7 VIP BUTLER SERVICE ICON
export function RealtimeVIPButlerIcon({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 p-0.5 shadow-xl shadow-amber-500/30 overflow-hidden group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="butlerBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="goldCrown" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="tuxedoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#butlerBg)" />
        <path d="M18 20 L24 13 L32 18 L40 13 L46 20 L42 25 L22 25 Z" fill="url(#goldCrown)" stroke="#78350F" strokeWidth="0.8" />
        <circle cx="24" cy="13" r="1.5" fill="#FEF08A" />
        <circle cx="32" cy="18" r="1.8" fill="#FFFBEB" />
        <circle cx="40" cy="13" r="1.5" fill="#FEF08A" />
        <path d="M16 54 C16 40 22 30 32 30 C42 30 48 40 48 54 Z" fill="url(#tuxedoGrad)" stroke="#FEF08A" strokeWidth="1" />
        <path d="M26 30 L32 44 L38 30 Z" fill="#FFFFFF" />
        <path d="M29 34 L35 34 L32 37 Z" fill="#DC2626" />
        <circle cx="32" cy="40" r="1" fill="#FEF08A" />
        <circle cx="32" cy="45" r="1" fill="#FEF08A" />
        <rect x="18" y="47" width="28" height="10" rx="5" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
        <text x="32" y="54" fontSize="6.5" fontWeight="900" fill="#78350F" textAnchor="middle" fontFamily="sans-serif">24/7 VIP</text>
      </svg>
    </div>
  );
}

// ==========================================
// 2. DIRECT BOOKING PRIVILEGES REAL-TIME ICONS
// ==========================================

// 2.1 REAL-TIME BEST RATE GUARANTEED ICON (Indigo/Shield)
export function RealtimeBestRateIcon({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 p-0.5 shadow-xl shadow-indigo-500/30 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="rateBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
          <linearGradient id="goldShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="35%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#rateBg)" />
        <circle cx="32" cy="32" r="22" stroke="#C7D2FE" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" className="animate-pulse" />
        <path d="M32 10 L48 16 C48 30 40 44 32 52 C24 44 16 30 16 16 L32 10 Z" fill="url(#goldShield)" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M32 14 L44 19 C44 29 38 39 32 46 C26 39 20 29 20 19 L32 14 Z" fill="#4F46E5" opacity="0.9" />
        <text x="32" y="34" fontSize="16" fontWeight="900" fill="#FDE047" textAnchor="middle" fontFamily="sans-serif">₹</text>
        <circle cx="32" cy="41" r="2" fill="#4ADE80" />
      </svg>
    </div>
  );
}

// 2.2 REAL-TIME FREE IN-ROOM BREAKFAST ICON (Pink/Coffee)
export function RealtimeBreakfastIcon({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-pink-700 p-0.5 shadow-xl shadow-pink-500/30 overflow-hidden group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="bfastBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#9D174D" />
          </linearGradient>
          <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#bfastBg)" />
        <path d="M26 14 C24 10 28 8 26 4" stroke="#FFF1F2" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
        <path d="M32 12 C30 8 34 6 32 2" stroke="#FFF1F2" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" className="animate-pulse" />
        <path d="M38 14 C36 10 40 8 38 4" stroke="#FFF1F2" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
        <path d="M18 22 C18 36 24 42 34 42 C44 42 46 36 46 22 Z" fill="url(#cupGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
        <path d="M46 26 C51 26 53 29 53 33 C53 37 49 39 45 39" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="32" cy="22" rx="13.5" ry="3.5" fill="#78350F" />
        <ellipse cx="32" cy="22" rx="11" ry="2.5" fill="#D97706" opacity="0.8" />
        <ellipse cx="32" cy="46" rx="20" ry="3" fill="#FFFFFF" opacity="0.9" />
        <path d="M28 22 C28 20 36 20 36 22" stroke="#FEF08A" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 2.3 REAL-TIME FLEXIBLE FREE CHANGES ICON (Teal/Clock)
export function RealtimeFlexibleChangesIcon({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 via-emerald-500 to-teal-700 p-0.5 shadow-xl shadow-teal-500/30 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="flexBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#115E59" />
          </linearGradient>
          <linearGradient id="clockFace" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CCFBF1" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#flexBg)" />
        <circle cx="32" cy="32" r="18" fill="url(#clockFace)" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="32" cy="18" r="1.2" fill="#0F766E" />
        <circle cx="46" cy="32" r="1.2" fill="#0F766E" />
        <circle cx="32" cy="46" r="1.2" fill="#0F766E" />
        <circle cx="18" cy="32" r="1.2" fill="#0F766E" />
        <line x1="32" y1="32" x2="32" y2="21" stroke="#0F766E" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="32" y1="32" x2="41" y2="32" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="32" r="2.2" fill="#D97706" />
        <path d="M12 28 C14 18 24 10 36 10 C46 10 54 16 57 26" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
        <path d="M57 26 L59 20 M57 26 L52 23" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="18" y="47" width="28" height="7" rx="3.5" fill="#FEF08A" stroke="#78350F" strokeWidth="0.6" />
        <text x="32" y="52.5" fontSize="5.5" fontWeight="900" fill="#78350F" textAnchor="middle" fontFamily="sans-serif">24h FREE</text>
      </svg>
    </div>
  );
}

// 2.4 REAL-TIME WHATSAPP VIP CONCIERGE ICON (Emerald/Green)
export function RealtimeWhatsAppConciergeIcon({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 p-0.5 shadow-xl shadow-emerald-500/30 overflow-hidden group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="waBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="waBubble" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#waBg)" />
        <circle cx="32" cy="30" r="22" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" className="animate-pulse" />
        <path d="M32 14 C21 14 12 22 12 32 C12 36 13.5 39.5 16 42.5 L14 51 L23 48.5 C25.8 50 28.8 50.8 32 50.8 C43 50.8 52 42.8 52 32 C52 22 43 14 32 14 Z" fill="url(#waBubble)" stroke="#FFFFFF" strokeWidth="1.2" />
        <path d="M23 23 C22 24 21.5 26 23 29 C24.5 32 30 38.5 34.5 40.5 C37.5 42 39.5 41 40.5 39.5 L42.5 36.5 C43 35.8 42.5 35 41.5 34.5 L37 32.5 C36.2 32 35.5 32.2 35 32.8 L33.5 34.5 C33 35 32 34.8 30.5 33.5 C29 32.2 28.2 31 28.8 30.2 L30.2 28.5 C30.8 27.8 30.8 27 30.2 26.2 L27.5 22.5 C27 21.5 26 21.2 25.2 21.8 Z" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
        <path d="M43 11 L40 18 L45 18 L41 26 L47 16 L42 16 Z" fill="#FDE047" stroke="#B45309" strokeWidth="0.6" className="animate-bounce" />
        <circle cx="45" cy="45" r="4.5" fill="#22C55E" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ==========================================
// 3. CONTACT & HOTLINE REAL-TIME 3D ICONS
// ==========================================

// 3.1 REAL-TIME DIRECT HOTLINE PHONE ICON (Indigo / Gold)
export function RealtimeHotlineIcon({ className = "w-12 h-12" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 p-0.5 shadow-lg shadow-indigo-500/30 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="hotlineBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <linearGradient id="goldReceiver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#hotlineBg)" />
        <path d="M42 20 C46 24 46 32 42 36" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
        <path d="M48 15 C54 21 54 39 48 45" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" className="animate-pulse" />
        <path d="M54 10 C62 18 62 46 54 54" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" className="animate-pulse" />
        <path
          d="M17 17 C15.5 18.5 15 21 17 25 C19 29 26 39 33 42 C37 44 39.5 43.5 41 42 L44.5 38.5 C45.5 37.5 45.2 36 44 35.2 L38 31.5 C36.8 30.8 35.5 31.2 34.8 32.2 L33.5 34 C33 34.5 31.8 34.2 29.5 32.5 C27.2 30.8 26.5 29.5 27 29 L28.8 27.7 C29.8 27 30.2 25.7 29.5 24.5 L25.8 18.5 C25 17.3 23.5 17 22.5 18 L17 17 Z"
          fill="url(#goldReceiver)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        <path d="M21 21 C22 23 27 31 33 35" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="20" cy="48" r="4.5" fill="#FDE047" stroke="#78350F" strokeWidth="1" />
        <text x="20" y="50" fontSize="5" fontWeight="900" fill="#78350F" textAnchor="middle" fontFamily="sans-serif">★</text>
      </svg>
    </div>
  );
}

// 3.2 REAL-TIME WHATSAPP INSTANT CHAT ICON (Emerald / Green)
export function RealtimeWhatsAppChatIcon({ className = "w-12 h-12" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 p-0.5 shadow-lg shadow-emerald-500/30 overflow-hidden group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="waChatBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="waChatBubble" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#waChatBg)" />
        <circle cx="32" cy="31" r="20" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" className="animate-pulse" />
        <path d="M32 15 C22 15 14 22.5 14 31.5 C14 35 15.2 38.2 17.5 41 L15.5 48.5 L23.5 46.2 C26 47.5 28.8 48.2 32 48.2 C42 48.2 50 40.7 50 31.5 C50 22.5 42 15 32 15 Z" fill="url(#waChatBubble)" stroke="#FFFFFF" strokeWidth="1.2" />
        <path d="M24 24 C23.2 24.8 22.8 26.2 24 28.5 C25.2 30.8 29.5 36 33.2 37.5 C35.5 38.5 37 37.8 37.8 36.5 L39.2 34.2 C39.6 33.6 39.2 33 38.5 32.5 L35 31 C34.4 30.6 33.8 30.8 33.4 31.2 L32.2 32.5 C31.8 32.8 31.2 32.6 30 31.5 C28.8 30.5 28.2 29.5 28.6 28.8 L29.8 27.5 C30.2 27 30.2 26.4 29.8 25.8 L27.5 22.8 C27.2 22 26.4 21.8 25.8 22.2 Z" fill="#059669" stroke="#047857" strokeWidth="0.8" />
        <circle cx="44" cy="44" r="4" fill="#22C55E" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

// 3.3 REAL-TIME EMAIL ENQUIRIES ICON (Rose / Pink)
export function RealtimeEmailEnquiryIcon({ className = "w-12 h-12" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 via-pink-600 to-rose-700 p-0.5 shadow-lg shadow-pink-500/30 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none rounded-2xl" />
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="emailBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="50%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
          <linearGradient id="letterDoc" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="envelopeBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FFE4E6" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#emailBg)" />
        <rect x="18" y="14" width="28" height="24" rx="3" fill="url(#letterDoc)" stroke="#CBD5E1" strokeWidth="0.8" />
        <line x1="22" y1="20" x2="36" y2="20" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="25" x2="42" y2="25" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="22" y1="30" x2="38" y2="30" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 28 L32 42 L52 28 L52 50 C52 52 50 54 48 54 L16 54 C14 54 12 52 12 50 Z" fill="url(#envelopeBody)" stroke="#FFFFFF" strokeWidth="1.2" />
        <path d="M12 52 L28 39" stroke="#FDA4AF" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M52 52 L36 39" stroke="#FDA4AF" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="32" cy="42" r="5.5" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
        <circle cx="32" cy="42" r="3.5" fill="#D97706" />
        <text x="32" y="44" fontSize="4.5" fontWeight="900" fill="#FFFBEB" textAnchor="middle" fontFamily="serif">L</text>
        <path d="M47 12 L48 15 L51 16 L48 17 L47 20 L46 17 L43 16 L46 15 Z" fill="#FEF08A" className="animate-pulse" />
      </svg>
    </div>
  );
}
