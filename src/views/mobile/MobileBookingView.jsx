import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Calendar, CalendarCheck, CheckCircle2, MessageCircle, Send, Sparkles } from 'lucide-react';
import { sanitizeText, sanitizePhone, isValidPhone, isValidEmail } from '../../utils/security';

export default function MobileBookingView() {
  const { rooms, selectedRoomId, setSelectedRoomId, addBooking, generateWhatsAppLink, navigateTo, userMobile, userName, userRole } = useHotel();

  const todayStr = new Date().toISOString().split('T')[0];
  const defaultCheckOutStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  })();

  const [name, setName] = useState(userName || '');
  const [phone, setPhone] = useState(userMobile || '');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('2');
  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(defaultCheckOutStr);
  const [requests, setRequests] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  const handleCheckInChange = (newCheckIn) => {
    setCheckIn(newCheckIn);
    if (new Date(newCheckIn) >= new Date(checkOut)) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleCheckOutChange = (newCheckOut) => {
    if (new Date(newCheckOut) <= new Date(checkIn)) {
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    } else {
      setCheckOut(newCheckOut);
    }
  };

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  let nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
  if (isNaN(nights) || nights < 1) nights = 1;

  const roomPrice = currentRoom?.price || 1499;
  const subtotal = roomPrice * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const cleanName = sanitizeText(name);
    const cleanEmail = email.trim();
    const cleanPhone = sanitizePhone(phone);
    const cleanRequests = sanitizeText(requests);

    if (!cleanName) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!isValidPhone(cleanPhone)) {
      setFormError('Please enter a valid 10-digit mobile number starting with 6-9.');
      return;
    }

    const newBooking = addBooking({
      customerName: cleanName,
      customerEmail: cleanEmail,
      customerPhone: cleanPhone,
      roomId: currentRoom.id,
      roomName: currentRoom.name,
      checkIn: checkIn,
      checkOut: checkOut,
      nights: nights,
      guests: parseInt(guests),
      specialRequests: cleanRequests,
      totalPrice: total
    });
    setConfirmedBooking(newBooking);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-28 p-3 space-y-4 pt-3">
      
      {/* HEADER BANNER */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" /> Direct Reservation
        </span>
        <h2 className="text-xl font-black font-serif-luxury text-slate-900">Book Your Luxury Stay</h2>
        <p className="text-xs text-slate-500">Best rate guaranteed • Free in-room breakfast • No booking fees</p>
      </div>

      {formError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3.5 rounded-2xl">
          {formError}
        </div>
      )}

      {/* ROOM SELECTOR */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <label className="block text-[11px] font-bold text-amber-700 uppercase tracking-wider">Select Luxury Suite</label>
        <select
          value={currentRoom?.id}
          onChange={(e) => setSelectedRoomId(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none cursor-pointer focus:border-amber-500"
        >
          {rooms.map(r => (
            <option key={r.id} value={r.id}>
              {r.name} - ₹{r.price.toLocaleString('en-IN')}/night ({r.category})
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <img src={currentRoom?.image} alt={currentRoom?.name} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">{currentRoom?.category}</span>
            <h4 className="text-xs font-black text-slate-900 leading-tight mt-0.5">{currentRoom?.name}</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-sm font-black text-amber-700 font-outfit">₹{currentRoom?.price.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-500">/night</span>
            </div>
            <span className="text-[10px] text-slate-600">{currentRoom?.bed} • {currentRoom?.capacity}</span>
          </div>
        </div>
      </div>

      {/* DATES & GUESTS */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <label className="block text-[11px] font-bold text-amber-700 uppercase tracking-wider">Dates & Guest Count</label>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-600" /> Check-in
            </span>
            <input
              type="date"
              min={todayStr}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-900 outline-none w-full cursor-pointer"
            />
          </div>
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1">
              <CalendarCheck className="w-3 h-3 text-amber-600" /> Check-out
            </span>
            <input
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-900 outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
          <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5+ Guests</option>
          </select>
        </div>
      </div>

      {/* CONTACT & SUBMIT FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <label className="block text-[11px] font-bold text-amber-700 uppercase tracking-wider">Guest Details</label>
          
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name *"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:bg-white transition"
          />
          
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="WhatsApp / Mobile Number *"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:bg-white transition"
          />
          
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address *"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:bg-white transition"
          />

          <textarea
            rows={2}
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            placeholder="Special requests (e.g. airport pickup, early check-in, dietary preferences)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:bg-white transition"
          />
        </div>

        {/* Total Price Breakdown */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm text-xs space-y-2">
          <div className="flex justify-between text-slate-600">
            <span>Duration:</span>
            <span className="text-slate-900 font-bold">{nights} Night{nights > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Room Charges ({nights} × ₹{roomPrice.toLocaleString('en-IN')}):</span>
            <span className="text-slate-900 font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>GST & Luxury Hotel Taxes (12%):</span>
            <span className="text-slate-900 font-bold">₹{taxes.toLocaleString('en-IN')}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
            <span className="font-bold text-slate-900">Total Price:</span>
            <span className="text-2xl font-black text-amber-700 font-outfit">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black py-4 rounded-2xl text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
        >
          <Send className="w-4 h-4 stroke-[2.5]" /> Submit Room Booking Enquiry
        </button>
      </form>

      {/* SUCCESS CONFIRMATION MODAL */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl w-full max-w-sm text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full">
                Enquiry Registered
              </span>
              <h3 className="text-lg font-black text-slate-900 font-serif-luxury mt-2">Thank You for Choosing Us!</h3>
              <p className="text-xs text-slate-500 mt-1">Our concierge team will reach out within 30 minutes.</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between"><span className="text-slate-500">Reference ID:</span><span className="font-mono font-bold text-amber-700">{confirmedBooking.id}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Suite:</span><span className="font-bold text-slate-900">{confirmedBooking.roomName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Stay Dates:</span><span className="font-bold text-slate-900">{confirmedBooking.checkIn} → {confirmedBooking.checkOut}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Total Amount:</span><span className="font-black text-amber-700 font-outfit text-sm">₹{confirmedBooking.totalPrice.toLocaleString('en-IN')}</span></div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={generateWhatsAppLink(`Hi Lumina Grand! I submitted booking enquiry #${confirmedBooking.id} for ${confirmedBooking.roomName} (${confirmedBooking.checkIn} to ${confirmedBooking.checkOut}). Total: ₹${confirmedBooking.totalPrice.toLocaleString('en-IN')}. Name: ${confirmedBooking.customerName}.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> Send Details on WhatsApp Now
              </a>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  navigateTo(userRole === 'admin' ? 'admin' : (userRole === 'user' ? 'my-bookings' : 'home'));
                }}
                className="block w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs cursor-pointer"
              >
                {userRole === 'admin' ? 'View in Admin Portal' : (userRole === 'user' ? 'View in My Bookings' : 'Return to Home')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
