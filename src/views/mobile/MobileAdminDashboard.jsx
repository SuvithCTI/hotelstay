import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { MessageCircle, Trash2, Store } from 'lucide-react';

export default function MobileAdminDashboard() {
  const { rooms, bookings, updateBookingStatus, deleteBooking, toggleRoomAvailability, resetDemoData, generateWhatsAppLink, navigateTo } = useHotel();

  const [mobTab, setMobTab] = useState('enquiries');
  const [filter, setFilter] = useState('All');

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const rev = bookings.reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);

  const filteredBookings = filter === 'All'
    ? bookings
    : bookings.filter(b => b.status === filter);

  return (
    <div className="admin-dashboard bg-slate-100 text-slate-800 min-h-screen pb-24 p-4 space-y-4">
      <button
        onClick={() => navigateTo('home')}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-xs font-black text-white shadow-md shadow-indigo-500/20"
      >
        <Store className="h-4 w-4" /> Visit Live Hotel Site
      </button>
      
      {/* KPI METRICS */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="bg-white p-3 rounded-2xl border-2 border-indigo-100 shadow-sm">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Enquiries</span>
          <span className="text-xl font-black text-slate-900 font-outfit mt-0.5 block">{bookings.length}</span>
        </div>
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Pending</span>
          <span className="text-xl font-black text-amber-600 font-outfit mt-0.5 block">{pendingCount}</span>
        </div>
        <div className="bg-white p-3 rounded-2xl border-2 border-emerald-100 shadow-sm">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Revenue</span>
          <span className="text-sm font-black text-emerald-700 font-outfit mt-1 block">₹{rev.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2">
        <button
          onClick={() => setMobTab('enquiries')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition ${
            mobTab === 'enquiries'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white text-slate-700 border-2 border-slate-200'
          }`}
        >
          Booking Enquiries
        </button>
        <button
          onClick={() => setMobTab('rooms')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition ${
            mobTab === 'rooms'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white text-slate-700 border-2 border-slate-200'
          }`}
        >
          Manage Rooms
        </button>
      </div>

      {/* ENQUIRIES */}
      {mobTab === 'enquiries' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-black text-slate-900">Guest Bookings ({filteredBookings.length})</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border-2 border-slate-300 text-xs font-black rounded-xl px-2.5 py-1.5 text-slate-900 outline-none shadow-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center text-slate-500 font-bold text-xs py-8 bg-white rounded-2xl border border-slate-200">
              No enquiries found.
            </div>
          ) : (
            filteredBookings.map(b => (
              <div key={b.id} className="bg-white p-4 rounded-2xl border-2 border-slate-200 space-y-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md inline-block mb-1">
                      #{b.id}
                    </span>
                    <h4 className="text-sm font-black text-slate-950">{b.customerName}</h4>
                    <span className="text-xs font-bold text-slate-600">{b.customerPhone}</span>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                    b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                    b.status === 'Cancelled' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                    'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1.5 text-slate-800 border border-slate-200">
                  <div><strong className="text-slate-900">Room:</strong> <span className="font-bold text-slate-800">{b.roomName}</span></div>
                  <div><strong className="text-slate-900">Dates:</strong> <span className="font-bold text-slate-800">{b.checkIn} → {b.checkOut} ({b.nights}d)</span></div>
                  <div><strong className="text-slate-900">Total:</strong> <span className="text-emerald-700 font-black font-outfit text-sm">₹{b.totalPrice.toLocaleString('en-IN')}</span></div>
                </div>

                <div className="flex gap-2 pt-1">
                  {b.status !== 'Confirmed' && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2 rounded-xl text-xs shadow-sm transition"
                    >
                      Confirm
                    </button>
                  )}
                  {b.status !== 'Cancelled' && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                      className="px-3 bg-rose-600 hover:bg-rose-700 text-white font-black py-2 rounded-xl text-xs shadow-sm transition"
                    >
                      Cancel
                    </button>
                  )}
                  <a
                    href={generateWhatsAppLink(`Hi ${b.customerName}, regarding your enquiry #${b.id} for ${b.roomName}:`)}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this enquiry?")) deleteBooking(b.id);
                    }}
                    className="bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 border border-slate-300 p-2 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ROOMS */}
      {mobTab === 'rooms' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-black text-slate-900">Room Rates & Availability</span>
          </div>

          {rooms.map(room => (
            <div key={room.id} className="bg-white p-3.5 rounded-2xl border-2 border-slate-200 flex items-center gap-3 shadow-sm">
              <img src={room.image} alt={room.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h4 className="text-xs font-black text-slate-950">{room.name}</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-black text-emerald-800 font-outfit">₹{room.price.toLocaleString('en-IN')} / one day</span>
                  <button
                    onClick={() => toggleRoomAvailability(room.id)}
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      room.available ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {room.available ? 'Available' : 'Reserved'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reset */}
      <div className="pt-4 text-center">
        <button
          onClick={() => {
            if (window.confirm("Reset demo data?")) resetDemoData();
          }}
          className="text-xs text-rose-600 font-bold hover:underline"
        >
          Reset to Sample Demo State
        </button>
      </div>

    </div>
  );
}
