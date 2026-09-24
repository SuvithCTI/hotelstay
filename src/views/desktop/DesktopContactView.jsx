import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { PhoneCall, MessageCircle, Mail, ChevronRight, ChevronDown, MapPin, Send, CheckCircle } from 'lucide-react';

export default function DesktopContactView() {
  const { hotelInfo, generateWhatsAppLink } = useHotel();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Room Booking Enquiry');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const faqs = [
    {
      q: "What are standard check-in and check-out timings?",
      a: "Standard check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged complimentary based on daily suite availability."
    },
    {
      q: "How does the direct WhatsApp booking assistance work?",
      a: "When you send a message or request online, our reservation concierge receives your chosen dates, guest preferences, and room selection to instantly confirm availability and special welcome amenities."
    },
    {
      q: "Is complimentary breakfast included in my stay?",
      a: "Yes! All direct bookings include our signature Michelin-curated buffet breakfast with organic local delicacies at Aura Restaurant."
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 pb-20">
      
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-14 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full border border-teal-400/20">
            Always Here For You
          </span>
          <h1 className="text-4xl lg:text-5xl font-black font-serif-luxury">
            Get in Touch & Visit Us
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Have a question, special event enquiry, or require customized transportation? Our dedicated concierge is available 24 hours a day.
          </p>
        </div>
      </section>

      {/* 3 TOP CONTACT CARDS */}
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 py-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Direct Hotline */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover-lift flex items-center gap-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Direct Hotline</span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5 truncate">{hotelInfo.phone}</h3>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">Toll-free 24/7 guest assistance.</p>
              <a href={`tel:${hotelInfo.phone}`} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 mt-2 hover:underline">
                Call Now <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Concierge */}
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 shadow-sm hover-lift flex items-center gap-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Instant Chat</span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5 truncate">WhatsApp Concierge</h3>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">Average response under 3 minutes.</p>
              <a
                href={generateWhatsAppLink("Hello Lumina Grand, I have a general enquiry.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-2 hover:underline"
              >
                Open WhatsApp <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Email Enquiries */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover-lift flex items-center gap-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Enquiries</span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5 truncate">{hotelInfo.email}</h3>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">Corporate & event bookings.</p>
              <a href={`mailto:${hotelInfo.email}`} className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 mt-2 hover:underline">
                Send Email <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* FORM & MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Send a Message</span>
              <h2 className="text-2xl font-black font-serif-luxury text-slate-900 mt-1 mb-6">General Enquiry Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rachel@example.com"
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Subject / Room Enquiry</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="General Room Booking Enquiry">General Room Booking Enquiry</option>
                      <option value="Presidential Ocean Penthouse Suite">Presidential Ocean Penthouse Suite</option>
                      <option value="Grand Ocean View King Suite">Grand Ocean View King Suite</option>
                      <option value="Executive Club Business Room">Executive Club Business Room</option>
                      <option value="Deluxe Garden Veranda Room">Deluxe Garden Veranda Room</option>
                      <option value="Interconnected Family Suite">Interconnected Family Suite</option>
                      <option value="Deluxe Ocean Panorama Room">Deluxe Ocean Panorama Room</option>
                      <option value="Group & Multi-Room Reservation">Group & Multi-Room Reservation</option>
                      <option value="Early Check-in & In-Room Amenities">Early Check-in & In-Room Amenities</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can assist your luxurious vacation..."
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-normal focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>

            {isSuccess && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been sent to our concierge desk.</span>
              </div>
            )}
          </div>

          {/* Map & Location */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Resort Location</span>
              <h2 className="text-2xl font-black font-serif-luxury text-slate-900 mt-1 mb-2">How to Reach Us</h2>
              <p className="text-xs text-slate-500 flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                {hotelInfo.address}
              </p>

              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
                <iframe
                  src={hotelInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Resort Google Map"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">International Airport</span>
                <span className="font-bold text-slate-800">25 Mins (Limousine Available)</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Private Beach Access</span>
                <span className="font-bold text-slate-800">Direct 20-Meter Walkway</span>
              </div>
            </div>
          </div>

        </div>

        {/* FAQS */}
        <section className="bg-slate-100/70 p-8 lg:p-10 rounded-3xl border border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Got Questions?
            </span>
            <h2 className="text-2xl font-black font-serif-luxury mt-2 text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center font-bold text-sm text-slate-900">
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-indigo-600 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {openFaq === index && (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}
