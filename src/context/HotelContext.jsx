import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { DEFAULT_ROOMS, DEFAULT_BOOKINGS, GALLERY_ITEMS, HOTEL_INFO } from '../data/hotelData';
import { sanitizeText, sanitizePhone, isValidPhone, isValidEmail, sanitizePrice, safeStorage } from '../utils/security';

const HotelContext = createContext();

const STORAGE_KEYS = {
  ROOMS: 'hotel_stay_rooms_v11_budget',
  BOOKINGS: 'hotel_stay_bookings_v11_budget',
  ACCOUNTS: 'hotel_stay_accounts_v2_secure'
};

const DEFAULT_ACCOUNTS = [
  { id: 'usr-1', name: 'Guest Member', mobile: '9123456780', password: 'User@123', role: 'user' },
  { id: 'adm-1', name: 'Hotel Administrator', mobile: '9876543210', password: 'Admin@123', role: 'admin' }
];

export function HotelProvider({ children }) {
  // Clear old legacy room & view storage if present
  useEffect(() => {
    try {
      localStorage.removeItem('hotel_stay_rooms_v1');
      localStorage.removeItem('hotel_stay_rooms_v2');
      localStorage.removeItem('hotel_stay_rooms_v3');
      localStorage.removeItem('hotel_stay_rooms_v8_luxury');
      localStorage.removeItem('hotel_stay_rooms_v9_distinct');
      localStorage.removeItem('hotel_stay_rooms_v10_coastal');
      localStorage.removeItem('hotel_stay_device_view');
    } catch (e) {}
  }, []);

  // Responsive Device View Mode: automatically tracks viewport size
  const [deviceMode, setDeviceMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 'mobile' : 'desktop';
    }
    return 'desktop';
  });

  // Responsive auto-switch on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setDeviceMode(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Secure Accounts State
  const [accounts, setAccounts] = useState(() => {
    return safeStorage.getItem(STORAGE_KEYS.ACCOUNTS, DEFAULT_ACCOUNTS);
  });

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.ACCOUNTS, accounts);
  }, [accounts]);

  // Current Active Page / View
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState(() => {
    try { return sessionStorage.getItem('hotel_user_role') || null; } catch (e) { return null; }
  });
  const [userMobile, setUserMobile] = useState(() => {
    try { return sessionStorage.getItem('hotel_user_mobile') || ''; } catch (e) { return ''; }
  });
  const [userName, setUserName] = useState(() => {
    try { return sessionStorage.getItem('hotel_user_name') || ''; } catch (e) { return ''; }
  });

  // Rooms Data State
  const [rooms, setRooms] = useState(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.ROOMS);
    if (Array.isArray(saved) && saved.length >= 8) {
      return saved;
    }
    return DEFAULT_ROOMS;
  });

  // Bookings Data State
  const [bookings, setBookings] = useState(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (Array.isArray(saved)) {
      return saved;
    }
    return DEFAULT_BOOKINGS;
  });

  // Preselected room for booking
  const [selectedRoomId, setSelectedRoomId] = useState(DEFAULT_ROOMS[0].id);
  // Detailed modal room
  const [activeModalRoom, setActiveModalRoom] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.ROOMS, rooms);
  }, [rooms]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  // Actions
  const toggleDeviceMode = useCallback((mode) => {
    setDeviceMode(mode);
  }, []);

  const navigateTo = useCallback((tab, roomId = null) => {
    setActiveTab(tab);
    if (roomId) setSelectedRoomId(roomId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const signIn = useCallback((role, mobile, name = '') => {
    const safeMobile = sanitizePhone(mobile);
    const safeName = sanitizeText(name);
    setUserRole(role);
    setUserMobile(safeMobile);
    setUserName(safeName);
    try {
      sessionStorage.setItem('hotel_user_role', role);
      sessionStorage.setItem('hotel_user_mobile', safeMobile);
      sessionStorage.setItem('hotel_user_name', safeName);
    } catch (e) {}
  }, []);

  const signUp = useCallback(({ name, mobile, password, role }) => {
    const cleanMobile = sanitizePhone(mobile);
    const cleanName = sanitizeText(name) || (role === 'admin' ? 'Hotel Administrator' : 'Guest Member');
    
    if (!isValidPhone(cleanMobile)) {
      return { success: false, message: 'Please provide a valid 10-digit mobile number starting with 6, 7, 8, or 9.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    const existing = accounts.find(a => a.mobile === cleanMobile);
    if (existing) {
      return { success: false, message: 'An account with this mobile number already exists.' };
    }

    const newAcc = {
      id: 'acc-' + Date.now(),
      name: cleanName,
      mobile: cleanMobile,
      password: String(password),
      role: role === 'admin' ? 'admin' : 'user'
    };

    setAccounts(prev => [...prev, newAcc]);
    signIn(newAcc.role, newAcc.mobile, newAcc.name);
    return { success: true, user: newAcc };
  }, [accounts, signIn]);

  const signOut = useCallback(() => {
    setUserRole(null);
    setUserMobile('');
    setUserName('');
    try {
      sessionStorage.removeItem('hotel_user_role');
      sessionStorage.removeItem('hotel_user_mobile');
      sessionStorage.removeItem('hotel_user_name');
    } catch (e) {}
    setActiveTab('login');
  }, []);

  const addBooking = useCallback((bookingData) => {
    const safeCustomerName = sanitizeText(bookingData.customerName || 'Registered Guest');
    const safeEmail = sanitizeText(bookingData.customerEmail || '');
    const safePhone = sanitizePhone(bookingData.customerPhone || '');
    const safeRequests = sanitizeText(bookingData.specialRequests || '');
    
    const newEnquiry = {
      id: 'ENQ-' + Math.floor(1000 + Math.random() * 9000),
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
      ...bookingData,
      customerName: safeCustomerName,
      customerEmail: safeEmail,
      customerPhone: safePhone,
      specialRequests: safeRequests,
      totalPrice: Number(bookingData.totalPrice || 0)
    };

    setBookings(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  }, []);

  const updateBookingStatus = useCallback((id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  }, []);

  const deleteBooking = useCallback((id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  }, []);

  const saveRoom = useCallback((roomData) => {
    const safeName = sanitizeText(roomData.name);
    const safeTagline = sanitizeText(roomData.tagline || '');
    const safeDesc = sanitizeText(roomData.description || '');
    const safePrice = sanitizePrice(roomData.price, 999, 4999);

    setRooms(prev => {
      const idx = prev.findIndex(r => r.id === roomData.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          ...roomData,
          name: safeName,
          tagline: safeTagline,
          description: safeDesc,
          price: safePrice,
          originalPrice: Math.round(safePrice * 1.25)
        };
        return updated;
      } else {
        const newRoom = {
          id: roomData.id || 'rm-' + Date.now().toString().slice(-4),
          ...roomData,
          name: safeName,
          tagline: safeTagline,
          description: safeDesc,
          price: safePrice,
          originalPrice: Math.round(safePrice * 1.25)
        };
        return [...prev, newRoom];
      }
    });
  }, []);

  const deleteRoom = useCallback((id) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  }, []);

  const toggleRoomAvailability = useCallback((id) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, available: !r.available } : r));
  }, []);

  const resetDemoData = useCallback(() => {
    setRooms(DEFAULT_ROOMS);
    setBookings(DEFAULT_BOOKINGS);
    safeStorage.removeItem(STORAGE_KEYS.ROOMS);
    safeStorage.removeItem(STORAGE_KEYS.BOOKINGS);
  }, []);

  const generateWhatsAppLink = useCallback((message) => {
    const phone = HOTEL_INFO.whatsappPhone;
    const cleanMsg = sanitizeText(message || "Hello Lumina Grand Resort, I want to make a luxury room enquiry.");
    const text = encodeURIComponent(cleanMsg);
    return `https://wa.me/${phone}?text=${text}`;
  }, []);

  const contextValue = useMemo(() => ({
    deviceMode,
    toggleDeviceMode,
    activeTab,
    userRole,
    userMobile,
    userName,
    accounts,
    signIn,
    signUp,
    signOut,
    setActiveTab,
    navigateTo,
    rooms,
    bookings,
    gallery: GALLERY_ITEMS,
    hotelInfo: HOTEL_INFO,
    selectedRoomId,
    setSelectedRoomId,
    activeModalRoom,
    setActiveModalRoom,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    saveRoom,
    deleteRoom,
    toggleRoomAvailability,
    resetDemoData,
    generateWhatsAppLink
  }), [
    deviceMode,
    toggleDeviceMode,
    activeTab,
    userRole,
    userMobile,
    userName,
    accounts,
    signIn,
    signUp,
    signOut,
    navigateTo,
    rooms,
    bookings,
    selectedRoomId,
    activeModalRoom,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    saveRoom,
    deleteRoom,
    toggleRoomAvailability,
    resetDemoData,
    generateWhatsAppLink
  ]);

  return (
    <HotelContext.Provider value={contextValue}>
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
}
