import React from 'react';
import { useHotel } from './context/HotelContext';

// Desktop Components & Views
import DesktopNavbar from './components/desktop/DesktopNavbar';
import DesktopFooter from './components/desktop/DesktopFooter';
import RoomDetailsModal from './components/desktop/RoomDetailsModal';
import DesktopHomeView from './views/desktop/DesktopHomeView';
import DesktopRoomsView from './views/desktop/DesktopRoomsView';
import DesktopBookingView from './views/desktop/DesktopBookingView';
import DesktopGalleryView from './views/desktop/DesktopGalleryView';
import DesktopContactView from './views/desktop/DesktopContactView';
import DesktopAdminDashboard from './views/desktop/DesktopAdminDashboard';
import LegalView from './views/LegalView';
import LoginView from './views/LoginView';
import MyBookingsView from './views/MyBookingsView';

// Mobile Components & Views
import MobileHeader from './components/mobile/MobileHeader';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import MobileRoomSheet from './components/mobile/MobileRoomSheet';
import MobileHomeView from './views/mobile/MobileHomeView';
import MobileRoomsView from './views/mobile/MobileRoomsView';
import MobileBookingView from './views/mobile/MobileBookingView';
import MobileGalleryView from './views/mobile/MobileGalleryView';
import MobileContactView from './views/mobile/MobileContactView';
import MobileAdminDashboard from './views/mobile/MobileAdminDashboard';

export default function App() {
  const { deviceMode, activeTab, userRole } = useHotel();
  const canAccessAdmin = userRole === 'admin';
  const canAccessBookings = userRole === 'user';
  const visibleTab = (activeTab === 'admin' && !canAccessAdmin) || (activeTab === 'my-bookings' && !canAccessBookings) ? 'login' : activeTab;

  if (visibleTab === 'login') {
    return <LoginView />;
  }

  if (visibleTab === 'admin') {
    return deviceMode === 'mobile' ? (
      <div className="min-h-screen bg-slate-100">
        <MobileAdminDashboard />
      </div>
    ) : (
      <div className="min-h-screen bg-slate-100">
        <DesktopAdminDashboard />
      </div>
    );
  }

  if (deviceMode === 'mobile') {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center selection:bg-amber-500 selection:text-slate-950">
        <div className="w-full max-w-md bg-slate-50 min-h-screen relative shadow-2xl">
          <MobileHeader title={visibleTab === 'admin' ? 'Admin Pocket' : 'LUMINA GRAND'} />
          
          <main>
            {visibleTab === 'home' && <MobileHomeView />}
            {visibleTab === 'rooms' && <MobileRoomsView />}
            {visibleTab === 'booking' && <MobileBookingView />}
            {visibleTab === 'gallery' && <MobileGalleryView />}
            {visibleTab === 'contact' && <MobileContactView />}
            {visibleTab === 'privacy' && <LegalView type="privacy" />}
            {visibleTab === 'terms' && <LegalView type="terms" />}
            {visibleTab === 'login' && <LoginView />}
            {visibleTab === 'my-bookings' && <MyBookingsView />}
          </main>

          <MobileRoomSheet />
          <MobileBottomNav />
        </div>
      </div>
    );
  }

  // Desktop Experience
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <DesktopNavbar />
        
        <main>
          {visibleTab === 'home' && <DesktopHomeView />}
          {visibleTab === 'rooms' && <DesktopRoomsView />}
          {visibleTab === 'booking' && <DesktopBookingView />}
          {visibleTab === 'gallery' && <DesktopGalleryView />}
          {visibleTab === 'contact' && <DesktopContactView />}
          {visibleTab === 'privacy' && <LegalView type="privacy" />}
          {visibleTab === 'terms' && <LegalView type="terms" />}
          {visibleTab === 'login' && <LoginView />}
          {visibleTab === 'my-bookings' && <MyBookingsView />}
        </main>
      </div>

      <RoomDetailsModal />
      <DesktopFooter />
    </div>
  );
}
