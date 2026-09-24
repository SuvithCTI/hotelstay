import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Send, MessageCircle, Check } from 'lucide-react';

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
    const newBooking = addBooking({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      roomId: currentRoom.id,
      roomName: currentRoom.name,
      checkIn: checkIn,
      checkOut: checkOut,
      nights: nights,
      guests: parseInt(guests),
      specialRequests: requests,
      totalPrice: total
    });
    setConfirmedBooking(newBooking);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-28 p-4 space-y-4">
      
      {/* ROOM SELECTOR */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
        <label className="block text-[11px] font-bold text-slate-400 uppercase">Select Luxury Suite</label>
        <select
          value={currentRoom?.id}
          onChange={(e) => setSelectedRoomId(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white outline-none cursor-pointer"
        >
          {rooms.map(r => (
            <option key={r.id} value={r.id}>
              {r.name} (₹{r.price.toLocaleString('en-IN')}/n)
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <img src={currentRoom?.image} alt={currentRoom?.name} className="w-16 h-16 rounded-lg object-cover" />
          <div>
            <h4 className="text-xs font-bold text-white">{currentRoom?.name}</h4>
            <span className="text-xs font-black text-amber-400 font-outfit block">₹{currentRoom?.price.toLocaleString('en-IN')} / night</span>
            <span className="text-[10px] text-slate-400">{currentRoom?.bed} • {currentRoom?.capacity}</span>
          </div>
        </div>
      </div>

      {/* DATES & GUESTS */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
        <label className="block text-[11px] font-bold text-slate-400 uppercase">Dates & Guests</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-500 block">Check-in</span>
            <input
              type="date"
              min={todayStr}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none w-full"
            />
          </div>
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-500 block">Check-out</span>
            <input
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none w-full"
            />
          </div>
        </div>

        <div>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-white outline-none"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5+ Guests</option>
          </select>
        </div>
      </div>

      {/* CONTACT & SUBMIT */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <label className="block text-[11px] font-bold text-slate-400 uppercase">Guest Information</label>
          
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none"
          />
          
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="WhatsApp / Phone Number"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none"
          />
          
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none"
          />

          <textarea
            rows={2}
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            placeholder="Special requests (e.g. airport pickup, bed preferences)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>

        {/* Total calculation */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
          <div className="flex justify-between text-slate-400">
            <span>Stay Duration:</span>
            <span className="text-white font-bold">{nights} Night{nights > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Room Charges:</span>
            <span className="text-white font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>GST Taxes (12%):</span>
            <span className="text-white font-bold">₹{taxes.toLocaleString('en-IN')}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
            <span className="font-bold text-white">Total Amount:</span>
            <span className="text-2xl font-black text-amber-400 font-outfit">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-3.5 rounded-2xl text-xs shadow-lg flex items-center justify-center gap-1.5"
        >
          <Send className="w-4 h-4" /> Submit Room Booking Enquiry
        </button>
      </form>

      {/* MODAL */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-sm text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif-luxury">Enquiry Received!</h3>
              <p className="text-xs text-slate-400 mt-1">Our reservation concierge is ready to assist you.</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left text-xs space-y-1">
              <div className="flex justify-between"><span className="text-slate-500">Ref ID:</span><span className="font-bold text-indigo-400">{confirmedBooking.id}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Room:</span><span className="font-bold text-white">{confirmedBooking.roomName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Total:</span><span className="font-bold text-amber-400 font-outfit">₹{confirmedBooking.totalPrice.toLocaleString('en-IN')}</span></div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={generateWhatsAppLink(`Hi Lumina Grand! I submitted booking enquiry #${confirmedBooking.id} for ${confirmedBooking.roomName} (${confirmedBooking.checkIn} to ${confirmedBooking.checkOut}). Total: ₹${confirmedBooking.totalPrice.toLocaleString('en-IN')}. Name: ${confirmedBooking.customerName}.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp Now
              </a>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  navigateTo(userRole === 'admin' ? 'admin' : (userRole === 'user' ? 'my-bookings' : 'home'));
                }}
                className="block w-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
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
