import React from 'react';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

const DOCUMENTS = {
  privacy: {
    title: 'Privacy Policy',
    label: 'Your privacy matters',
    icon: ShieldCheck,
    intro: 'This policy explains how Lumina Grand collects, uses, and protects information shared through our hotel booking and enquiry services.',
    sections: [
      {
        heading: 'Information we collect',
        body: 'We may collect your name, contact details, booking preferences, stay dates, guest count, and messages when you make an enquiry or reservation.'
      },
      {
        heading: 'How we use your information',
        body: 'We use this information to manage reservations, respond to requests, provide concierge support, improve our services, and send service-related updates.'
      },
      {
        heading: 'Sharing and security',
        body: 'We do not sell personal information. Information may be shared with trusted service providers only when needed to operate the booking or communication service. We use reasonable safeguards to protect it.'
      },
      {
        heading: 'Your choices',
        body: 'You may request access to, correction of, or deletion of your personal information by contacting our concierge team.'
      }
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    label: 'Booking terms',
    icon: FileText,
    intro: 'These terms outline the conditions that apply when you use the Lumina Grand website, submit an enquiry, or make a stay reservation.',
    sections: [
      {
        heading: 'Reservations and payment',
        body: 'A reservation is subject to availability and confirmation by Lumina Grand. Rates, taxes, payment requirements, and inclusions are shown or confirmed during the booking process.'
      },
      {
        heading: 'Check-in and stay requirements',
        body: 'Guests must provide valid identification at check-in and follow resort safety, occupancy, and conduct requirements. Special requests are fulfilled subject to availability.'
      },
      {
        heading: 'Changes and cancellations',
        body: 'Cancellation and modification terms depend on the selected room and rate. Please contact the concierge as soon as possible if your plans change.'
      },
      {
        heading: 'Website information',
        body: 'We make reasonable efforts to keep room descriptions, rates, and availability accurate. Amenities and services may change when required by operations, safety, or maintenance.'
      }
    ]
  }
};

export default function LegalView({ type }) {
  const { navigateTo } = useHotel();
  const document = DOCUMENTS[type] || DOCUMENTS.privacy;
  const Icon = document.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 md:pb-16">
      <section className="bg-slate-950 text-white px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-amber-300 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>
          <div className="flex items-center gap-3 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Icon className="w-5 h-5" /> {document.label}
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-serif-luxury mt-4">{document.title}</h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mt-4">{document.intro}</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-200">
          {document.sections.map((section) => (
            <section key={section.heading} className="p-5 md:p-7">
              <h2 className="text-base md:text-lg font-bold text-slate-900">{section.heading}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-8 text-xs font-bold">
          <button onClick={() => navigateTo('privacy')} className="text-indigo-600 hover:underline">Privacy Policy</button>
          <button onClick={() => navigateTo('terms')} className="text-indigo-600 hover:underline">Terms & Conditions</button>
          <button onClick={() => navigateTo('contact')} className="text-indigo-600 hover:underline">Contact Concierge</button>
        </div>
      </main>
    </div>
  );
}
