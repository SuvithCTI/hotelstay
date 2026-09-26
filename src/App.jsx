import React, { Suspense, lazy } from 'react';
import { useHotel } from './context/HotelContext';

// Desktop Components
import DesktopNavbar from './components/desktop/DesktopNavbar';
import DesktopFooter from './components/desktop/DesktopFooter';
import RoomDetailsModal from './components/desktop/RoomDetailsModal';

// Mobile Components
import MobileHeader from './components/mobile/MobileHeader';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import MobileRoomSheet from './components/mobile/MobileRoomSheet';

// Eager/Primary Views for Instant LCP
import DesktopHomeView from './views/desktop/DesktopHomeView';
import MobileHomeView from './views/mobile/MobileHomeView';
import LoginView from './views/LoginView';

// Code-Split / Lazy Views for High Performance
const DesktopRoomsView = lazy(() => import('./views/desktop/DesktopRoomsView'));
const DesktopBookingView = lazy(() => import('./views/desktop/DesktopBookingView'));
const DesktopGalleryView = lazy(() => import('./views/desktop/DesktopGalleryView'));
const DesktopContactView = lazy(() => import('./views/desktop/DesktopContactView'));
const DesktopAdminDashboard = lazy(() => import('./views/desktop/DesktopAdminDashboard'));

const MobileRoomsView = lazy(() => import('./views/mobile/MobileRoomsView'));
const MobileBookingView = lazy(() => import('./views/mobile/MobileBookingView'));
const MobileGalleryView = lazy(() => import('./views/mobile/MobileGalleryView'));
const MobileContactView = lazy(() => import('./views/mobile/MobileContactView'));
const MobileAdminDashboard = lazy(() => import('./views/mobile/MobileAdminDashboard'));

const LegalView = lazy(() => import('./views/LegalView'));
const MyBookingsView = lazy(() => import('./views/MyBookingsView'));

// Fast Luxury Loading Skeleton
function LoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-10 h-10 border-3 border-amber-400/30 border-t-amber-500 rounded-full animate-spin" />
      <span className="text-xs font-bold text-slate-500 tracking-wider uppercase font-outfit">Loading Lumina Grand...</span>
    </div>
  );
}

export default function App() {
  const { deviceMode, activeTab, userRole } = useHotel();
  const canAccessAdmin = userRole === 'admin';
  const canAccessBookings = userRole === 'user';
  const visibleTab = (activeTab === 'admin' && !canAccessAdmin) || (activeTab === 'my-bookings' && !canAccessBookings) ? 'login' : activeTab;

  if (visibleTab === 'login') {
    return <LoginView />;
  }

  if (visibleTab === 'admin') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        {deviceMode === 'mobile' ? (
          <div className="min-h-screen bg-slate-100 flex justify-center">
            <div className="w-full max-w-md bg-slate-100 min-h-screen relative shadow-2xl">
              <MobileAdminDashboard />
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-slate-100">
            <DesktopAdminDashboard />
          </div>
        )}
      </Suspense>
    );
  }

  if (deviceMode === 'mobile') {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center selection:bg-amber-500 selection:text-slate-950">
        <div className="w-full max-w-md bg-slate-50 min-h-screen relative shadow-2xl border-x border-slate-200/60">
          <MobileHeader title={visibleTab === 'admin' ? 'Admin Pocket' : 'LUMINA GRAND'} />
          
          <main>
            <Suspense fallback={<LoadingFallback />}>
              {visibleTab === 'home' && <MobileHomeView />}
              {visibleTab === 'rooms' && <MobileRoomsView />}
              {visibleTab === 'booking' && <MobileBookingView />}
              {visibleTab === 'gallery' && <MobileGalleryView />}
              {visibleTab === 'contact' && <MobileContactView />}
              {visibleTab === 'privacy' && <LegalView type="privacy" />}
              {visibleTab === 'terms' && <LegalView type="terms" />}
              {visibleTab === 'login' && <LoginView />}
              {visibleTab === 'my-bookings' && <MyBookingsView />}
            </Suspense>
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
          <Suspense fallback={<LoadingFallback />}>
            {visibleTab === 'home' && <DesktopHomeView />}
            {visibleTab === 'rooms' && <DesktopRoomsView />}
            {visibleTab === 'booking' && <DesktopBookingView />}
            {visibleTab === 'gallery' && <DesktopGalleryView />}
            {visibleTab === 'contact' && <DesktopContactView />}
            {visibleTab === 'privacy' && <LegalView type="privacy" />}
            {visibleTab === 'terms' && <LegalView type="terms" />}
            {visibleTab === 'login' && <LoginView />}
            {visibleTab === 'my-bookings' && <MyBookingsView />}
          </Suspense>
        </main>
      </div>

      <RoomDetailsModal />
      <DesktopFooter />
    </div>
  );
}
