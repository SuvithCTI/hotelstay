import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Calendar, CalendarCheck, CheckCircle, MessageCircle, Headphones, Send } from 'lucide-react';

export default function DesktopBookingView() {
  const { rooms, selectedRoomId, setSelectedRoomId, addBooking, generateWhatsAppLink, navigateTo, userMobile, userName, userRole } = useHotel();

  const todayStr = new Date().toISOString().split('T')[0];
  const defaultCheckOutStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  })();

  const [name, setName] = useState(userName || '');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(userMobile || '');
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

  // Calculate pricing
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  let nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
  if (isNaN(nights) || nights < 1) nights = 1;

  const roomPrice = currentRoom?.price || 1499;
  const subtotal = roomPrice * nights;
  const taxes = Math.round(subtotal * 0.12);
  const totalPrice = subtotal + taxes;

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
      totalPrice: totalPrice
    });
    setConfirmedBooking(newBooking);
  };

  return (
    <div className="bg-slate-50 text-slate-800 py-12 px-6 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
          Seamless Reservation
        </span>
        <h1 className="text-3xl lg:text-4xl font-black font-serif-luxury mt-3 text-slate-900">
          Check Availability & Book Your Stay
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          Complete your details below for instant price estimation and automated booking enquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT FORM (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Guest Information & Dates
            </h2>
            <span className="text-xs text-rose-500 font-semibold">* Required fields</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Number of Guests <span className="text-rose-500">*</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Room / Suite Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={currentRoom?.id}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-indigo-950 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} - ₹{r.price.toLocaleString('en-IN')}/night ({r.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-100">
                <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Check-in Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={checkIn}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  required
                  className="w-full bg-white px-3 py-2 rounded-xl border border-indigo-200 text-sm font-bold text-slate-800 outline-none cursor-pointer"
                />
              </div>
              <div className="bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-100">
                <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 text-indigo-600" /> Check-out Date
                </label>
                <input
                  type="date"
                  min={checkIn}
                  value={checkOut}
                  onChange={(e) => handleCheckOutChange(e.target.value)}
                  required
                  className="w-full bg-white px-3 py-2 rounded-xl border border-indigo-200 text-sm font-bold text-slate-800 outline-none cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Special Requests & Preferences (Optional)
              </label>
              <textarea
                rows={3}
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="e.g. Extra pillows, airport luxury pickup, early check-in, dietary preferences..."
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <Send className="w-5 h-5" /> Submit Room Booking Enquiry
            </button>
          </form>
        </div>

        {/* RIGHT SUMMARY (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Reservation Summary</h3>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${currentRoom?.available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {currentRoom?.available ? '● Available for Stay' : '● Reserved / Limited'}
              </span>
            </div>

            <div className="my-4 flex gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <img src={currentRoom?.image} alt={currentRoom?.name} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{currentRoom?.category}</span>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">{currentRoom?.name}</h4>
                <div className="text-xs font-bold text-slate-700 mt-1">₹{currentRoom?.price.toLocaleString('en-IN')} / night</div>
                <span className="text-[11px] text-slate-500">{currentRoom?.bed} • {currentRoom?.capacity}</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs border-b border-slate-100 pb-4">
              <div className="flex justify-between text-slate-600">
                <span>Duration</span>
                <span className="font-bold text-slate-800">{nights} Night{nights > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Room Charge ({nights} × ₹{currentRoom?.price.toLocaleString('en-IN')})</span>
                <span className="font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST & Luxury Hotel Taxes (12%)</span>
                <span className="font-bold text-slate-800">₹{taxes.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-baseline">
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Total Estimated Amount</span>
                <span className="text-[10px] text-emerald-600 font-bold">✓ Best Direct Rate Guaranteed</span>
              </div>
              <div className="text-3xl font-black text-indigo-600 font-outfit">₹{totalPrice.toLocaleString('en-IN')}</div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href={generateWhatsAppLink(`Hello Lumina Grand! I want to reserve: ${currentRoom?.name} (${nights} nights, from ${checkIn} to ${checkOut}, ${guests} guests). Total: ₹${totalPrice.toLocaleString('en-IN')}.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
              >
                <MessageCircle className="w-4 h-4" /> Book Directly via WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-3xl shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300">Need Custom Group Booking?</div>
              <p className="text-[11px] text-slate-300 mt-0.5">Call our 24/7 dedicated concierge at +91 98450 12345</p>
            </div>
          </div>
        </div>

      </div>

      {/* SUCCESS CONFIRMATION MODAL */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-8 border border-slate-200 shadow-2xl text-center space-y-5 animate-float text-slate-800">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Enquiry Submitted Successfully</span>
              <h2 className="text-2xl font-black text-slate-900 font-serif-luxury mt-3">Thank You for Choosing Us!</h2>
              <p className="text-slate-600 text-xs mt-2">
                Your reservation request has been registered. Our concierge team will reach out within 30 minutes.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="font-black text-indigo-600">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Room:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dates:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.checkIn} to {confirmedBooking.checkOut} ({confirmedBooking.nights} nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Price:</span>
                <span className="font-black text-slate-900 font-outfit text-sm">₹{confirmedBooking.totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={generateWhatsAppLink(`Hi Lumina Grand! I submitted booking enquiry #${confirmedBooking.id} for ${confirmedBooking.roomName} from ${confirmedBooking.checkIn} to ${confirmedBooking.checkOut}. Total: ₹${confirmedBooking.totalPrice.toLocaleString('en-IN')}. Name: ${confirmedBooking.customerName}.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs"
              >
                <MessageCircle className="w-4 h-4" /> Send Details on WhatsApp Now
              </a>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  navigateTo(userRole === 'admin' ? 'admin' : (userRole === 'user' ? 'my-bookings' : 'home'));
                }}
                className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-3 rounded-xl transition text-xs cursor-pointer"
              >
                {userRole === 'admin' ? 'View in Admin Enquiry Portal' : (userRole === 'user' ? 'View in My Bookings' : 'Return to Home')}
              </button>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full text-slate-400 hover:text-slate-600 text-xs py-2"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
