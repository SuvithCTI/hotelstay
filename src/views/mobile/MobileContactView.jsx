import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { PhoneCall, MessageCircle, Send, MapPin, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MobileContactView() {
  const { hotelInfo, generateWhatsAppLink } = useHotel();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Room Booking Enquiry');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-24 p-3 space-y-4 pt-3">
      
      {/* HEADER BANNER */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" /> 24/7 Concierge & Support
        </span>
        <h2 className="text-xl font-black font-serif-luxury text-slate-900">Contact Lumina Grand</h2>
        <p className="text-xs text-slate-500">Our dedicated hospitality team is available round-the-clock to assist with your reservations.</p>
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={`tel:${hotelInfo.phone}`}
          className="bg-white border border-slate-200/90 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 active:scale-95 transition shadow-sm hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
            <PhoneCall className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-900">Call Direct</span>
          <span className="text-[9px] text-amber-700 font-mono font-bold">{hotelInfo.phone}</span>
        </a>

        <a
          href={generateWhatsAppLink("Hello Lumina Grand, I have a quick question regarding my luxury stay.")}
          target="_blank"
          rel="noreferrer"
          className="bg-white border border-emerald-200 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 active:scale-95 transition shadow-sm hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-900">WhatsApp Chat</span>
          <span className="text-[9px] text-emerald-700 font-bold">Instant Concierge</span>
        </a>
      </div>

      {/* ENQUIRY FORM */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900 font-serif-luxury">Send Direct Message</h3>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Full Name"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:bg-white transition"
          />
          
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:bg-white transition"
          />
          
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 outline-none cursor-pointer focus:border-amber-500"
          >
            <option value="General Room Booking Enquiry">General Room Booking Enquiry</option>
            <option value="Presidential Ocean Penthouse Suite">Presidential Ocean Penthouse Suite</option>
            <option value="Grand Ocean View King Suite">Grand Ocean View King Suite</option>
            <option value="Executive Club Business Room">Executive Club Business Room</option>
            <option value="Deluxe Garden Veranda Room">Deluxe Garden Veranda Room</option>
            <option value="Interconnected Family Suite">Interconnected Family Suite</option>
            <option value="Group / Multi-Room Booking">Group / Multi-Room Booking</option>
            <option value="Early Check-in & Special Requests">Early Check-in & Special Requests</option>
          </select>

          <textarea
            rows={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us your preferences or questions..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:bg-white transition"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.5]" /> Send Enquiry Message
          </button>
        </form>

        {isSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-xl text-center shadow-sm flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Message sent to Lumina Grand Concierge!
          </div>
        )}
      </div>

      {/* LOCATION MAP */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-amber-700 uppercase flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600" /> Resort Location
          </h3>
          <span className="text-[10px] text-slate-500 font-medium">Coastal Promenade</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">{hotelInfo.address}</p>
        <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-200 mt-2">
          <iframe
            src={hotelInfo.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Mobile Resort Map"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center space-y-0.5 shadow-sm">
        <div className="text-xs font-bold text-slate-800">Lumina Grand Concierge Desk</div>
        <p className="text-[10px] text-slate-500">24/7 Fast Assistance & Direct Reservations</p>
      </div>

    </div>
  );
}
