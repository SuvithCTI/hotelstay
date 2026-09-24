import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Inbox, Clock, BadgeDollarSign, BedDouble, ListChecks, Bed, RefreshCw, PlusCircle, Check, X, MessageCircle, Trash2, Edit3, ShieldCheck, Store } from 'lucide-react';

export default function DesktopAdminDashboard() {
  const { rooms, bookings, updateBookingStatus, deleteBooking, saveRoom, deleteRoom, toggleRoomAvailability, resetDemoData, generateWhatsAppLink, navigateTo } = useHotel();

  const [adminTab, setAdminTab] = useState('enquiries');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  // Form State for Room
  const [roomName, setRoomName] = useState('');
  const [roomCat, setRoomCat] = useState('Presidential');
  const [roomPrice, setRoomPrice] = useState(399);
  const [roomCapacity, setRoomCapacity] = useState('3 Adults');
  const [roomBed, setRoomBed] = useState('1 California King Bed');
  const [roomImage, setRoomImage] = useState('');
  const [roomDesc, setRoomDesc] = useState('');

  // Stats
  const totalEnquiries = bookings.length;
  const pendingEnquiries = bookings.filter(b => b.status === 'Pending').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);
  const activeRooms = rooms.length;

  const filteredBookings = statusFilter === 'All'
    ? bookings
    : bookings.filter(b => b.status === statusFilter);

  const openAddModal = () => {
    setEditingRoom(null);
    setRoomName('');
    setRoomCat('Presidential');
    setRoomPrice(399);
    setRoomCapacity('3 Adults');
    setRoomBed('1 King Bed');
    setRoomImage('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80');
    setRoomDesc('Ultra-luxury comfort with panoramic views and bespoke amenities.');
    setIsModalOpen(true);
  };

  const openEditModal = (room) => {
    setEditingRoom(room);
    setRoomName(room.name);
    setRoomCat(room.category);
    setRoomPrice(room.price);
    setRoomCapacity(room.capacity);
    setRoomBed(room.bed);
    setRoomImage(room.image);
    setRoomDesc(room.description);
    setIsModalOpen(true);
  };

  const handleSaveRoom = (e) => {
    e.preventDefault();
    const roomData = {
      id: editingRoom ? editingRoom.id : undefined,
      name: roomName,
      category: roomCat,
      tagline: editingRoom ? editingRoom.tagline : 'Luxury comfort and premier seaside views',
      price: parseFloat(roomPrice),
      originalPrice: Math.round(parseFloat(roomPrice) * 1.25),
      rating: editingRoom ? editingRoom.rating : 4.9,
      reviewsCount: editingRoom ? editingRoom.reviewsCount : 60,
      capacity: roomCapacity,
      bed: roomBed,
      size: editingRoom ? editingRoom.size : '800 sq.ft',
      badge: editingRoom ? editingRoom.badge : 'Exclusive',
      badgeColor: editingRoom ? editingRoom.badgeColor : 'from-indigo-500 to-purple-600',
      available: editingRoom ? editingRoom.available : true,
      image: roomImage,
      description: roomDesc,
      amenities: editingRoom ? editingRoom.amenities : [
        'Free Ultra WiFi',
        'Complimentary Breakfast',
        'Climate Control AC'
      ]
    };
    saveRoom(roomData);
    setIsModalOpen(false);
  };

  return (
    <div className="admin-dashboard bg-slate-50 text-slate-800 min-h-screen pb-20">
      
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-12 xl:px-16 py-8 space-y-8">
        
        {/* BANNER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full text-amber-800 text-xs font-black uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Hotel Stay Administration
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-serif-luxury text-slate-950">
              Control Center & Reservation Analytics
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage customer booking requests, modify room rates, and toggle live availability.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-xs font-black text-white shadow-md shadow-indigo-500/20 hover:from-indigo-700 hover:to-purple-700 transition"
            >
              <Store className="h-4 w-4" /> Visit Store
            </button>
            <div className="flex items-center gap-3 bg-emerald-50 border-2 border-emerald-200 px-4 py-2.5 rounded-2xl shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">System Status</span>
                <div className="text-xs font-black text-emerald-800 mt-0.5">Online & Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border-2 border-indigo-100 shadow-sm hover:shadow-md transition flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Enquiries</span>
              <div className="text-3xl font-black text-slate-900 font-outfit mt-1">{totalEnquiries}</div>
              <span className="text-xs text-indigo-700 font-bold mt-1 block">Live Guest Submissions</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center border border-indigo-200">
              <Inbox className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-sm hover:shadow-md transition flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Actions</span>
              <div className="text-3xl font-black text-amber-600 font-outfit mt-1">{pendingEnquiries}</div>
              <span className="text-xs text-amber-700 font-bold mt-1 block">Awaiting Confirmation</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100 shadow-sm hover:shadow-md transition flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Booking Value</span>
              <div className="text-3xl font-black text-emerald-700 font-outfit mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
              <span className="text-xs text-emerald-700 font-bold mt-1 block">From All Enquiries</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <BadgeDollarSign className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-purple-100 shadow-sm hover:shadow-md transition flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Rooms</span>
              <div className="text-3xl font-black text-purple-800 font-outfit mt-1">{activeRooms}</div>
              <span className="text-xs text-purple-700 font-bold mt-1 block">Managed in Catalog</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center border border-purple-200">
              <BedDouble className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* TABS HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAdminTab('enquiries')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                adminTab === 'enquiries'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200 shadow-sm'
              }`}
            >
              <ListChecks className="w-4 h-4 stroke-[2.5]" /> Booking Enquiries & Requests
            </button>
            <button
              onClick={() => setAdminTab('rooms')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                adminTab === 'rooms'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200 shadow-sm'
              }`}
            >
              <Bed className="w-4 h-4 stroke-[2.5]" /> Room Catalog & Pricing
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Reset all room and enquiry demo data?")) {
                resetDemoData();
                alert("Demo data reset successfully!");
              }
            }}
            className="text-xs bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold px-4 py-2.5 rounded-xl border-2 border-slate-200 shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Demo State
          </button>
        </div>

        {/* TAB 1: ENQUIRIES */}
        {adminTab === 'enquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">Customer Booking Requests</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white text-slate-900 border-2 border-slate-300 text-xs rounded-xl px-3.5 py-2 font-black outline-none cursor-pointer shadow-sm hover:border-slate-400 transition"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-800 uppercase tracking-wider font-black border-b-2 border-slate-200">
                    <tr>
                      <th className="p-4">Ref ID</th>
                      <th className="p-4">Guest Details</th>
                      <th className="p-4">Room Selected</th>
                      <th className="p-4">Stay Dates</th>
                      <th className="p-4">Nights / Guests</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-10 text-slate-500 font-bold text-sm">
                          No enquiries found matching selected criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map(b => (
                        <tr key={b.id} className="hover:bg-indigo-50/40 transition">
                          <td className="p-4">
                            <span className="font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg text-xs">
                              {b.id}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-black text-slate-950 text-sm">{b.customerName}</div>
                            <div className="text-xs font-semibold text-slate-700 mt-0.5">{b.customerPhone}</div>
                            <div className="text-[11px] text-slate-500">{b.customerEmail}</div>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg inline-block text-xs">
                              {b.roomName}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-slate-900 bg-amber-50/80 border border-amber-200/80 px-2.5 py-1 rounded-md inline-block">
                              {b.checkIn} → {b.checkOut}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-black text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md inline-block">
                              {b.nights} N • {b.guests} G
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-black text-emerald-700 font-outfit text-base">
                              ₹{b.totalPrice.toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
                              b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                              b.status === 'Cancelled' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                              'bg-amber-100 text-amber-900 border-amber-300'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                b.status === 'Confirmed' ? 'bg-emerald-600' :
                                b.status === 'Cancelled' ? 'bg-rose-600' :
                                'bg-amber-600'
                              }`}></span>
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {b.status !== 'Confirmed' && (
                                <button
                                  onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                                  title="Confirm Reservation"
                                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition hover:scale-105"
                                >
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </button>
                              )}
                              {b.status !== 'Cancelled' && (
                                <button
                                  onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                                  title="Cancel Enquiry"
                                  className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm transition hover:scale-105"
                                >
                                  <X className="w-4 h-4 stroke-[3]" />
                                </button>
                              )}
                              <a
                                href={generateWhatsAppLink(`Hi ${b.customerName}, regarding your enquiry #${b.id} for ${b.roomName} at Lumina Grand Resort:`)}
                                target="_blank"
                                rel="noreferrer"
                                title="Reply via WhatsApp"
                                className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm transition hover:scale-105"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete enquiry ${b.id}?`)) deleteBooking(b.id);
                                }}
                                title="Delete record"
                                className="p-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 border border-slate-300 rounded-xl transition hover:scale-105"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ROOMS */}
        {adminTab === 'rooms' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">Manage Hotel Suites & Pricing</h2>
                <p className="text-slate-600 text-xs">Update nightly rates, toggle availability status, or add new suites.</p>
              </div>
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" /> Add New Room
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map(room => (
                <div key={room.id} className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                  <div className="relative h-48">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => toggleRoomAvailability(room.id)}
                        className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${
                          room.available ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        }`}
                      >
                        {room.available ? '✓ Available' : '✕ Reserved'}
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md inline-block">
                        {room.category}
                      </span>
                      <h3 className="text-base font-black text-slate-950 mt-1.5">{room.name}</h3>
                      <div className="text-xs font-semibold text-slate-600 mt-1">{room.bed} • {room.capacity}</div>
                    </div>

                    <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 flex items-center justify-between">
                      <span className="text-xs text-slate-700 font-bold">Rate / Night:</span>
                      <div className="text-emerald-800 font-black text-base font-outfit">₹{room.price.toLocaleString('en-IN')}</div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <button
                        onClick={() => openEditModal(room)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Details
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${room.name}?`)) deleteRoom(room.id);
                        }}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT ROOM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 lg:p-8 border-2 border-slate-200 shadow-2xl text-slate-900 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center pb-3 border-b-2 border-slate-200">
              <h3 className="text-xl font-black text-slate-950">
                {editingRoom ? "Edit Room Details" : "Add New Luxury Suite"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveRoom} className="space-y-4 text-xs">
              <div>
                <label className="block font-black text-slate-800 uppercase mb-1">Room Name</label>
                <input
                  type="text"
                  required
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-900 font-bold focus:border-indigo-600 focus:bg-white outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-800 uppercase mb-1">Category</label>
                  <select
                    value={roomCat}
                    onChange={(e) => setRoomCat(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-900 font-bold focus:border-indigo-600 focus:bg-white outline-none transition"
                  >
                    <option value="Presidential">Presidential</option>
                    <option value="Ocean Suites">Ocean Suites</option>
                    <option value="Executive">Executive</option>
                    <option value="Family Suites">Family Suites</option>
                    <option value="Deluxe">Deluxe</option>
                  </select>
                </div>
                <div>
                  <label className="block font-black text-slate-800 uppercase mb-1">Price / Night (₹ INR)</label>
                  <input
                    type="number"
                    required
                    min="1000"
                    max="5000"
                    value={roomPrice}
                    onChange={(e) => setRoomPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-900 font-bold focus:border-indigo-600 focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-800 uppercase mb-1">Capacity</label>
                  <input
                    type="text"
                    required
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-900 font-bold focus:border-indigo-600 focus:bg-white outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-black text-slate-800 uppercase mb-1">Bedding</label>
                  <input
                    type="text"
                    required
                    value={roomBed}
                    onChange={(e) => setRoomBed(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-900 font-bold focus:border-indigo-600 focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black text-slate-800 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={roomImage}
                  onChange={(e) => setRoomImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-900 font-bold focus:border-indigo-600 focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label className="block font-black text-slate-800 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={roomDesc}
                  onChange={(e) => setRoomDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-900 font-semibold focus:border-indigo-600 focus:bg-white outline-none transition"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button type="submit" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-3.5 rounded-xl shadow-md transition">
                  Save Suite Details
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-xl transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
