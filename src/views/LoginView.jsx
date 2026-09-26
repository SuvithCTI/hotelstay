import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Hotel, LockKeyhole, Phone, ShieldCheck, UserRound, LogOut, CheckCircle2, Sparkles, UserPlus, LogIn, User } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { sanitizeText, sanitizePhone, isValidPhone } from '../utils/security';

export default function LoginView() {
  const { navigateTo, signIn, signUp, signOut, userRole, userMobile, userName, accounts } = useHotel();
  
  // Mode: 'signin' or 'signup'
  const [authMode, setAuthMode] = useState('signin');
  // Role: 'user' or 'admin'
  const [role, setRole] = useState('user');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const handleInputChange = (field, value) => {
    setError('');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const cleanMobile = sanitizePhone(formData.mobile);
    if (!cleanMobile || cleanMobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.password) {
      setError('Please enter your password.');
      return;
    }

    // Check existing registered accounts or default credentials
    const found = accounts.find(
      acc => acc.mobile === cleanMobile && acc.password === formData.password && acc.role === role
    );

    // Also verify built-in demo credentials
    const isBuiltInUser = role === 'user' && cleanMobile === '9123456780' && formData.password === 'User@123';
    const isBuiltInAdmin = role === 'admin' && cleanMobile === '9876543210' && formData.password === 'Admin@123';

    if (found || isBuiltInUser || isBuiltInAdmin) {
      const displayName = found ? found.name : (role === 'admin' ? 'Hotel Administrator' : 'Guest Member');
      signIn(role, cleanMobile, displayName);
      setToastMsg(`Welcome back, ${displayName}!`);
      setTimeout(() => {
        navigateTo(role === 'admin' ? 'admin' : 'home');
      }, 400);
    } else {
      setError(`Invalid credentials for ${role === 'admin' ? 'Administrator' : 'Guest Member'}. Please check your mobile number and password.`);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const cleanName = sanitizeText(formData.name);
    const cleanMobile = sanitizePhone(formData.mobile);

    if (!cleanName) {
      setError('Please enter your full name.');
      return;
    }
    if (!isValidPhone(cleanMobile)) {
      setError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const res = signUp({
      name: cleanName,
      mobile: cleanMobile,
      password: formData.password,
      role
    });

    if (res.success) {
      setToastMsg(`Account created! Welcome, ${cleanName}.`);
      setTimeout(() => {
        navigateTo(role === 'admin' ? 'admin' : 'home');
      }, 400);
    } else {
      setError(res.message || 'Failed to create account.');
    }
  };

  // If already logged in, show active session card
  if (userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c0802] via-[#160f05] to-[#080501] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative selection:bg-amber-500 selection:text-slate-950">
        {/* Top Header Navigation */}
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-amber-500/20">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-100 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30 px-4 py-2 rounded-xl transition shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resort
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 shadow-md">
              <Hotel className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-black font-outfit text-amber-300 tracking-wide">LUMINA GRAND</span>
          </div>
        </div>

        {/* Active Session Card */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-8 border-2 border-amber-500/40 shadow-2xl text-center space-y-6 animate-float">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
              {userRole === 'admin' ? <ShieldCheck className="w-8 h-8 stroke-[2.5]" /> : <UserRound className="w-8 h-8 stroke-[2.5]" />}
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full">
                ● Active Session
              </span>
              <h2 className="text-2xl font-black font-serif-luxury text-slate-950 mt-3">
                {userName || (userRole === 'admin' ? 'Hotel Administrator' : 'Guest Member')}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                You are currently signed in as <strong className="text-amber-700 uppercase font-bold">{userRole === 'admin' ? 'Administrator' : 'Guest Member'}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Account Role:</span>
                <span className="font-bold text-slate-900 capitalize">{userRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Registered Mobile:</span>
                <span className="font-bold font-mono text-slate-900">{userMobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Access Status:</span>
                <span className="font-bold text-emerald-700">{userRole === 'admin' ? 'Full Admin Portal' : 'Luxury Stay Reservations'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {userRole === 'admin' ? (
                <button
                  onClick={() => navigateTo('admin')}
                  className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-3 rounded-xl shadow-md transition text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" /> Go to Admin Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigateTo('home')}
                  className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-3 rounded-xl shadow-md transition text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Hotel className="w-4 h-4" /> Explore Luxury Resort & Suites
                </button>
              )}

              <button
                onClick={() => {
                  signOut();
                  setToastMsg('Signed out successfully.');
                }}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Sign Out from this Account
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] text-amber-200/50 py-2">
          © {new Date().getFullYear()} Lumina Grand Luxury Resort & Suites • 256-Bit Encrypted Portal
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0802] via-[#160f05] to-[#080501] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header Navigation (Dedicated without global navbar) */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-4 sm:pb-6 border-b border-amber-500/20">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-100 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30 px-3 sm:px-4 py-2 rounded-xl transition shadow-md group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Resort
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
            <Hotel className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black font-outfit bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent block leading-tight">
              LUMINA GRAND
            </span>
            <span className="text-[9px] tracking-widest text-amber-400 font-bold uppercase block leading-none">
              Luxury Hotel & Suites
            </span>
          </div>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="flex-1 flex items-center justify-center py-6">
        <div className="mx-auto grid min-h-[560px] max-w-4xl overflow-hidden rounded-[2.5rem] border-2 border-amber-500/30 bg-white shadow-2xl lg:grid-cols-[1fr_1.05fr] w-full text-slate-900">
          
          {/* LEFT BRAND SECTION (Desktop only) */}
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#181206] via-[#241a08] to-[#120d04] p-10 text-white lg:flex lg:flex-col lg:justify-between border-r border-amber-500/20">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
            
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-400" /> Exclusive Guest & Admin Portal
              </span>
              
              <h1 className="max-w-md font-serif-luxury text-3xl font-bold leading-tight text-white">
                Where Bespoke Luxury Meets Seamless Hospitality.
              </h1>
              
              <p className="mt-4 max-w-md text-xs leading-relaxed text-amber-100/70">
                Experience world-class hospitality, panoramic ocean balconies, heated horizon jacuzzis, and instant reservation management.
              </p>

              <div className="mt-8 space-y-3 bg-amber-950/40 p-4 rounded-2xl border border-amber-500/20 text-xs">
                <div className="flex items-center gap-2.5 text-amber-200">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span>Instant luxury room reservations & instant confirmations</span>
                </div>
                <div className="flex items-center gap-2.5 text-amber-200">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span>Exclusive in-room privileges & 24/7 dedicated butler</span>
                </div>
                <div className="flex items-center gap-2.5 text-amber-200">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span>Real-time occupancy control for hotel management</span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center gap-2 text-[11px] text-amber-200/60 pt-4">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              256-Bit SSL Encrypted Secure Session
            </div>
          </section>

          {/* RIGHT FORM SECTION (Sign In & Sign Up on the same page) */}
          <section className="flex items-center justify-center bg-white px-6 py-8 sm:px-10">
            <div className="w-full max-w-md">
              
              {/* Top Auth Mode Switcher (Sign In vs Sign Up) */}
              <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setError('');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    authMode === 'signin'
                      ? 'bg-white text-slate-950 shadow-md border border-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-600" /> Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setError('');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-white text-slate-950 shadow-md border border-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5 text-amber-600" /> Sign Up
                </button>
              </div>

              {/* Title & Description */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-black text-slate-950">
                {authMode === 'signin' ? 'Sign in to your account' : 'Create new account'}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {authMode === 'signin'
                  ? 'Select your role and enter your details to sign in.'
                  : 'Register a new guest or admin account for Lumina Grand.'}
              </p>

              {/* Role Switcher Tab (Guest Member vs Administrator) */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
                {[
                  { id: 'user', label: 'Guest Member', icon: UserRound },
                  { id: 'admin', label: 'Administrator', icon: ShieldCheck }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setRole(id);
                      setError('');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-black transition cursor-pointer ${
                      role === id
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md font-bold'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </button>
                ))}
              </div>

              {/* Form (Sign In or Sign Up) */}
              <form onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp} className="mt-4 space-y-3">
                
                {/* Name field for Sign Up */}
                {authMode === 'signup' && (
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">Full Name</span>
                    <div className="relative block">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </label>
                )}

                {/* Mobile Number field */}
                <label className="block">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">Mobile Number</span>
                  <div className="relative block">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </label>

                {/* Password field */}
                <label className="block">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">Password</span>
                  <div className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                      className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-11 pr-12 text-sm font-bold text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {/* Confirm Password for Sign Up */}
                {authMode === 'signup' && (
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">Confirm Password</span>
                    <div className="relative block">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-11 pr-12 text-sm font-bold text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>
                )}

                {/* Error Banner */}
                {error && (
                  <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-2.5 text-xs font-bold text-rose-700">
                    {error}
                  </div>
                )}

                {/* Toast Banner */}
                {toastMsg && (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-300 px-4 py-2.5 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {toastMsg}
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  {authMode === 'signin'
                    ? `Sign In as ${role === 'admin' ? 'Administrator' : 'Guest Member'}`
                    : `Create ${role === 'admin' ? 'Admin' : 'Guest'} Account`}
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </form>

              {/* Mode Toggle Footer Prompt */}
              <div className="mt-4 text-center text-xs text-slate-600">
                {authMode === 'signin' ? (
                  <span>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setError('');
                      }}
                      className="font-bold text-amber-700 hover:underline cursor-pointer"
                    >
                      Sign Up Now
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setError('');
                      }}
                      className="font-bold text-amber-700 hover:underline cursor-pointer"
                    >
                      Sign In Now
                    </button>
                  </span>
                )}
              </div>

              {/* Bottom Quick Links */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => navigateTo('home')}
                  className="font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                >
                  ← Return to Home
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Need Help? Contact Concierge
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="text-center text-[11px] text-amber-200/50 py-2">
        © {new Date().getFullYear()} Lumina Grand Luxury Hotel & Suites • Direct Reservation Portal
      </div>
    </div>
  );
}
