import React from 'react';
import { CalendarDays, ArrowLeft, CircleDollarSign, Hotel, Users, MessageCircle, BedDouble, Sparkles, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

const normalizePhone = (phone) => String(phone || '').replace(/\D/g, '').slice(-10);

export default function MyBookingsView() {
  const { bookings, userMobile, userName, userRole, navigateTo, generateWhatsAppLink } = useHotel();

  // If not logged in as user/guest, prompt to sign in
  if (!userRole) {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-slate-50 text-slate-800 px-4 py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-5 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
            <Hotel className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-serif-luxury font-black text-slate-900">Customer Access Required</h2>
            <p className="text-xs text-slate-500 mt-2">
              Please sign up or sign in as a Guest Member to view and manage your stay bookings.
            </p>
          </div>
          <button
            onClick={() => navigateTo('login')}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black py-3.5 rounded-xl shadow-md transition text-xs cursor-pointer"
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
    <main className="min-h-[calc(100vh-5rem)] bg-slate-50 text-slate-800 px-4 py-8 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigateTo('home')}
          className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-700 bg-white hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition shadow-sm group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Resort
        </button>

        {/* Hero Banner */}
        <div className="mb-8 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-400" /> Member Reservation Portal
              </span>
              <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-200 via-yellow-200 to-white bg-clip-text text-transparent">
                My Bookings & Stays
              </h1>
              <p className="mt-1 text-xs text-slate-300">
                Welcome, <strong>{userName || 'Guest Member'}</strong> ({userMobile}). Manage your reserved suites and stay details.
              </p>
            </div>
            <button
              onClick={() => navigateTo('booking')}
              className="w-fit bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black px-5 py-3 rounded-xl shadow-md transition text-xs flex items-center gap-2 cursor-pointer shrink-0"
            >
              <BedDouble className="w-4 h-4" /> Book Another Suite
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {myBookings.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <Hotel className="mx-auto h-12 w-12 text-slate-400" />
            <h2 className="mt-4 text-xl font-bold font-serif-luxury text-slate-800">No Reservations Found</h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-slate-500">
              You don't have any bookings under mobile number <strong>{userMobile}</strong> yet. Reserve a luxury suite to begin your luxury stay.
            </p>
            <button
              onClick={() => navigateTo('booking')}
              className="mt-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 px-6 py-3 text-xs font-black shadow-md transition cursor-pointer"
            >
              Explore Available Suites & Book Now
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {myBookings.map((booking) => {
              const statusColors = {
                Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
                Pending: 'bg-amber-50 text-amber-800 border-amber-200'
              };

              const StatusIcon = booking.status === 'Confirmed' ? CheckCircle2 : booking.status === 'Cancelled' ? XCircle : Clock;

              return (
                <article
                  key={booking.id}
                  className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 bg-slate-50/50">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                        Booking ID: <span className="font-mono text-slate-900">{booking.id}</span>
                      </p>
                      <h2 className="mt-0.5 text-xl font-black font-serif-luxury text-slate-900">
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
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                        title="Contact Support on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Support
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-5 text-sm sm:grid-cols-4 sm:px-7">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 h-5 w-5 text-amber-600 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Stay Dates</p>
                        <p className="mt-0.5 font-bold text-slate-900 text-xs">{booking.checkIn} → {booking.checkOut}</p>
                        <p className="text-[11px] text-slate-500">{booking.nights} day(s) stay</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-5 w-5 text-amber-600 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Guests</p>
                        <p className="mt-0.5 font-bold text-slate-900 text-xs">{booking.guests || 2} Guest(s)</p>
                        <p className="text-[11px] text-slate-500">{booking.customerName || 'Registered Guest'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CircleDollarSign className="mt-0.5 h-5 w-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Amount</p>
                        <p className="mt-0.5 font-black text-amber-700 font-outfit text-base">
                          ₹{Number(booking.totalPrice || 0).toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-slate-500">Taxes Included</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Special Requests</p>
                      <p className="mt-0.5 text-xs text-slate-700 italic">
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
