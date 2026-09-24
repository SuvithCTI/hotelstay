import React from 'react';
import { CalendarDays, ArrowLeft, CircleDollarSign, Hotel, Users, MessageCircle, BedDouble, Sparkles, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

const normalizePhone = (phone) => String(phone || '').replace(/\D/g, '').slice(-10);

export default function MyBookingsView() {
  const { bookings, userMobile, userName, userRole, navigateTo, generateWhatsAppLink } = useHotel();

  // If not logged in as user/guest, prompt to sign in
  if (!userRole) {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-[#0f0b04] text-white px-4 py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#181207] border border-amber-500/30 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Hotel className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-serif-luxury font-black text-amber-200">Customer Access Required</h2>
            <p className="text-xs text-amber-100/70 mt-2">
              Please sign up or sign in as a Guest Member to view and manage your stay bookings.
            </p>
          </div>
          <button
            onClick={() => navigateTo('login')}
            className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-3 rounded-xl shadow-lg transition text-xs cursor-pointer"
          >
            Sign In / Sign Up as Guest
          </button>
        </div>
      </main>
    );
  }

  const myBookings = bookings.filter((booking) => {
    if (!userMobile) return true;
    const bPhone = normalizePhone(booking.customerPhone || booking.phone);
    const uPhone = normalizePhone(userMobile);
    return bPhone === uPhone || !bPhone;
  });

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-[#0d0903] via-[#140e06] to-[#0d0903] text-white px-4 py-10 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigateTo('home')}
          className="mb-6 flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-100 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30 px-3.5 py-2 rounded-xl transition shadow-md group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Resort
        </button>

        {/* Hero Banner */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#1c1408] via-[#2a1d0b] to-[#181106] border border-amber-500/30 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-400" /> Member Reservation Portal
              </span>
              <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                My Bookings & Stays
              </h1>
              <p className="mt-1 text-xs text-amber-100/70">
                Welcome, <strong>{userName || 'Guest Member'}</strong> ({userMobile}). Manage your reserved suites and stay details.
              </p>
            </div>
            <button
              onClick={() => navigateTo('booking')}
              className="w-fit bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-5 py-3 rounded-xl shadow-lg transition text-xs flex items-center gap-2 cursor-pointer shrink-0"
            >
              <BedDouble className="w-4 h-4" /> Book Another Suite
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {myBookings.length === 0 ? (
          <div className="rounded-3xl border border-amber-500/20 bg-[#160f06]/80 backdrop-blur-md px-6 py-16 text-center shadow-xl">
            <Hotel className="mx-auto h-12 w-12 text-amber-400/50" />
            <h2 className="mt-4 text-xl font-bold font-serif-luxury text-amber-100">No Reservations Found</h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-amber-200/60">
              You don't have any bookings under mobile number <strong>{userMobile}</strong> yet. Reserve a luxury suite to begin your luxury stay.
            </p>
            <button
              onClick={() => navigateTo('booking')}
              className="mt-6 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-6 py-3 text-xs font-black shadow-lg transition cursor-pointer"
            >
              Explore Available Suites & Book Now
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {myBookings.map((booking) => {
              const statusColors = {
                Confirmed: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
                Cancelled: 'bg-rose-950/80 text-rose-300 border-rose-500/40',
                Pending: 'bg-amber-950/80 text-amber-300 border-amber-500/40'
              };

              const StatusIcon = booking.status === 'Confirmed' ? CheckCircle2 : booking.status === 'Cancelled' ? XCircle : Clock;

              return (
                <article
                  key={booking.id}
                  className="overflow-hidden rounded-3xl border border-amber-500/25 bg-[#171007]/90 backdrop-blur-md shadow-xl transition hover:border-amber-500/40"
                >
                  <div className="flex flex-col gap-3 border-b border-amber-500/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 bg-[#1c1409]/60">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                        Booking ID: <span className="font-mono text-white">{booking.id}</span>
                      </p>
                      <h2 className="mt-0.5 text-xl font-black font-serif-luxury text-white">
                        {booking.roomName}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold border ${statusColors[booking.status] || statusColors.Pending}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {booking.status || 'Pending'}
                      </span>
                      <a
                        href={generateWhatsAppLink(`Hello Lumina Grand! Inquiring regarding my reservation ID #${booking.id} for ${booking.roomName} (${booking.checkIn} to ${booking.checkOut}).`)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                        title="Contact Support on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Support
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-5 text-sm sm:grid-cols-4 sm:px-7">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 h-5 w-5 text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300/70">Stay Dates</p>
                        <p className="mt-0.5 font-bold text-white text-xs">{booking.checkIn} → {booking.checkOut}</p>
                        <p className="text-[11px] text-amber-200/60">{booking.nights} night(s) stay</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-5 w-5 text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300/70">Guests</p>
                        <p className="mt-0.5 font-bold text-white text-xs">{booking.guests || 2} Guest(s)</p>
                        <p className="text-[11px] text-amber-200/60">{booking.customerName || 'Registered Guest'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CircleDollarSign className="mt-0.5 h-5 w-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300/70">Total Amount</p>
                        <p className="mt-0.5 font-black text-emerald-400 font-outfit text-base">
                          ₹{Number(booking.totalPrice || 0).toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-emerald-200/60">Taxes Included</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300/70">Special Requests</p>
                      <p className="mt-0.5 text-xs text-amber-100/80 italic">
                        {booking.specialRequests ? `"${booking.specialRequests}"` : 'No special requests'}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
