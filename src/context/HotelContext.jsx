import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_ROOMS, DEFAULT_BOOKINGS, GALLERY_ITEMS, HOTEL_INFO } from '../data/hotelData';

const HotelContext = createContext();

const STORAGE_KEYS = {
  ROOMS: 'hotel_stay_rooms_v11_budget',
  BOOKINGS: 'hotel_stay_bookings_v11_budget',
  VIEW_MODE: 'hotel_stay_device_view'
};

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
      localStorage.removeItem(STORAGE_KEYS.VIEW_MODE);
    } catch (e) {}
  }, []);

  // Responsive Device View Mode: automatically tracks viewport size
  const [deviceMode, setDeviceMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 'mobile' : 'desktop';
    }
    return 'desktop';
  });

  // Responsive auto-switch on screen resize (mobile for < 768px, desktop for >= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setDeviceMode(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Accounts State (User and Admin Accounts)
  const DEFAULT_ACCOUNTS = [
    { id: 'usr-1', name: 'Guest Member', mobile: '9123456780', password: 'User@123', role: 'user' },
    { id: 'adm-1', name: 'Hotel Administrator', mobile: '9876543210', password: 'Admin@123', role: 'admin' }
  ];

  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('hotel_stay_accounts_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_ACCOUNTS; }
    }
    return DEFAULT_ACCOUNTS;
  });

  useEffect(() => {
    localStorage.setItem('hotel_stay_accounts_v1', JSON.stringify(accounts));
  }, [accounts]);

  // Current Active Page / View: 'home', 'rooms', 'booking', 'gallery', 'contact', 'privacy', 'terms', 'admin', 'login'
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState(() => sessionStorage.getItem('hotel_user_role') || null);
  const [userMobile, setUserMobile] = useState(() => sessionStorage.getItem('hotel_user_mobile') || '');
  const [userName, setUserName] = useState(() => sessionStorage.getItem('hotel_user_name') || '');

  // Rooms Data State (Defaults to all 8 luxury rooms)
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROOMS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 8) {
          return parsed;
        }
      } catch (e) {}
    }
    return DEFAULT_ROOMS;
  });

  // Bookings Data State
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_BOOKINGS; }
    }
    return DEFAULT_BOOKINGS;
  });

  // Preselected room for booking
  const [selectedRoomId, setSelectedRoomId] = useState(DEFAULT_ROOMS[0].id);
  // Detailed modal room
  const [activeModalRoom, setActiveModalRoom] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  // Actions
  const toggleDeviceMode = (mode) => {
    setDeviceMode(mode);
  };

  const navigateTo = (tab, roomId = null) => {
    setActiveTab(tab);
    if (roomId) setSelectedRoomId(roomId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const signIn = (role, mobile, name = '') => {
    setUserRole(role);
    setUserMobile(mobile);
    setUserName(name);
    sessionStorage.setItem('hotel_user_role', role);
    sessionStorage.setItem('hotel_user_mobile', mobile);
    sessionStorage.setItem('hotel_user_name', name);
  };

  const signUp = ({ name, mobile, password, role }) => {
    const existing = accounts.find(a => a.mobile === mobile);
    if (existing) {
      return { success: false, message: 'An account with this mobile number already exists.' };
    }
    const newAcc = {
      id: 'acc-' + Date.now(),
      name: name.trim() || (role === 'admin' ? 'Hotel Administrator' : 'Guest Member'),
      mobile,
      password,
      role
    };
    setAccounts(prev => [...prev, newAcc]);
    signIn(role, mobile, newAcc.name);
    return { success: true, user: newAcc };
  };

  const signOut = () => {
    setUserRole(null);
    setUserMobile('');
    setUserName('');
    sessionStorage.removeItem('hotel_user_role');
    sessionStorage.removeItem('hotel_user_mobile');
    sessionStorage.removeItem('hotel_user_name');
    setActiveTab('login');
  };

  const addBooking = (bookingData) => {
    const newEnquiry = {
      id: 'ENQ-' + Math.floor(1000 + Math.random() * 9000),
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
      ...bookingData
    };
    setBookings(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const saveRoom = (roomData) => {
    setRooms(prev => {
      const idx = prev.findIndex(r => r.id === roomData.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], ...roomData };
        return updated;
      } else {
        const newRoom = {
          id: roomData.id || 'rm-' + Date.now().toString().slice(-4),
          ...roomData
        };
        return [...prev, newRoom];
      }
    });
  };

  const deleteRoom = (id) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const toggleRoomAvailability = (id) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, available: !r.available } : r));
  };

  const resetDemoData = () => {
    setRooms(DEFAULT_ROOMS);
    setBookings(DEFAULT_BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.ROOMS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
  };

  const generateWhatsAppLink = (message) => {
    const phone = HOTEL_INFO.whatsappPhone;
    const text = encodeURIComponent(message || "Hello Lumina Grand Resort, I want to make a luxury room enquiry.");
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <HotelContext.Provider value={{
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
    }}>
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  return useContext(HotelContext);
}
