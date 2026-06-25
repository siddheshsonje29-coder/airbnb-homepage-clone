import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, Phone, Lock, User, Apple, ArrowLeft, Shield } from 'lucide-react';
import { Logo } from '../../components/Logo/Logo';
import { motion } from 'framer-motion';

const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      fill="#EA4335"
      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.966 11.966 0 0 0 12 0C7.309 0 3.268 2.536 1.09 6.273l4.176 3.492z"
    />
    <path
      fill="#34A853"
      d="M16.04 15.345c-1.077.732-2.436 1.164-4.04 1.164-3.555 0-6.56-2.4-7.636-5.636L1.09 14.364C3.268 18.1 7.309 20.636 12 20.636c3.164 0 6.027-1.127 8.09-3.036l-4.05-2.255z"
    />
    <path
      fill="#4285F4"
      d="M23.89 12.273c0-.818-.082-1.609-.218-2.364H12v4.545h6.69A5.727 5.727 0 0 1 16.04 18.29l4.05 2.255c2.373-2.19 3.8-5.4 3.8-9.273z"
    />
    <path
      fill="#FBBC05"
      d="M4.364 12c0-.79.136-1.555.382-2.273L1.09 6.236A11.947 11.947 0 0 0 0 12c0 2.082.536 4.04 1.48 5.764l3.266-2.527a7.037 7.037 0 0 1-.382-3.236z"
    />
  </svg>
);

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);

export const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signUp, isAuthenticated } = useAuthStore();

  // Determine starting tab based on path
  const isSignUpPath = location.pathname.includes('signup');
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(isSignUpPath ? 'signup' : 'login');

  // Sync state if path changes
  useEffect(() => {
    setActiveTab(isSignUpPath ? 'signup' : 'login');
  }, [location.pathname, isSignUpPath]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: 'login' | 'signup') => {
    setError('');
    setActiveTab(tab);
    navigate(tab === 'login' ? '/login' : '/signup', { replace: true });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/profile');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone) {
      setError('All fields are required.');
      return;
    }

    setIsLoading(true);
    try {
      const success = await signUp(name, email, phone, password);
      if (success) {
        navigate('/profile');
      } else {
        setError('Sign up failed. Please try again.');
      }
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoUser = () => {
    setEmail('alex.travels@airstay.ai');
    setPassword('password');
    setError('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-bold text-zinc-555 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back
      </button>

      {/* Main card grid */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-zinc-200/60 dark:border-zinc-800"
      >
        {/* Left Side: Elegant Branding and Info */}
        <div className="md:col-span-5 bg-gradient-to-br from-rose-500 via-primary to-rose-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/10 blur-2xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-black/10 blur-3xl -ml-20 -mb-20" />

          <div className="relative z-10">
            <Logo className="h-10 w-10 text-white brightness-200" showText={false} />
            <h1 className="text-2xl font-black tracking-tight mt-6 leading-tight">
              Your journey starts here.
            </h1>
            <p className="text-xs text-rose-100 mt-2 leading-relaxed">
              Log in to unlock custom travel itineraries, manage wishlists, and communicate with hosts.
            </p>
          </div>

          <div className="relative z-10 space-y-4 pt-12 md:pt-0">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/10 p-1.5 mt-0.5">
                <Shield className="h-4 w-4 text-rose-200" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Secure Account Portal</h4>
                <p className="text-[10px] text-rose-100 mt-0.5 leading-normal">
                  All demo connections are encrypted and safe.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/20 text-[10px] text-rose-200 font-semibold tracking-wide uppercase">
            Airbnb Clone App v1.0
          </div>
        </div>

        {/* Right Side: Tabbed Form */}
        <div className="md:col-span-7 p-8 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Tab selection */}
            <div className="flex border-b border-zinc-100 dark:border-zinc-850 mb-6">
              <button
                onClick={() => handleTabChange('login')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'login'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => handleTabChange('signup')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'signup'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-650 dark:bg-rose-955/20 dark:border-rose-900/50 dark:text-rose-450">
                {error}
              </div>
            )}

            {activeTab === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="border border-zinc-250 dark:border-zinc-700 rounded-2xl overflow-hidden focus-within:border-primary dark:focus-within:border-primary transition-colors">
                  <div className="relative border-b border-zinc-250 dark:border-zinc-700 px-3.5 py-2.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-550 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Email address
                    </label>
                    <Mail className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>

                  <div className="relative px-3.5 py-2.5">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-555 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Password (optional for demo)
                    </label>
                    <Lock className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>
            ) : (
              /* SIGN UP FORM */
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div className="border border-zinc-250 dark:border-zinc-700 rounded-2xl overflow-hidden focus-within:border-primary dark:focus-within:border-primary transition-colors">
                  <div className="relative border-b border-zinc-250 dark:border-zinc-700 px-3.5 py-2.5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-555 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Full name
                    </label>
                    <User className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>

                  <div className="relative border-b border-zinc-250 dark:border-zinc-700 px-3.5 py-2.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-555 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Email address
                    </label>
                    <Mail className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>

                  <div className="relative border-b border-zinc-250 dark:border-zinc-700 px-3.5 py-2.5">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-555 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Phone number
                    </label>
                    <Phone className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>

                  <div className="relative px-3.5 py-2.5">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-555 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Password (optional)
                    </label>
                    <Lock className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            )}

            {/* Separator */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-150 dark:border-zinc-800" />
              </div>
              <span className="relative bg-white px-4 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:bg-zinc-900">
                or
              </span>
            </div>

            {/* Social options */}
            <div className="space-y-2.5">
              <button
                onClick={loadDemoUser}
                type="button"
                className="w-full flex items-center justify-center gap-3 rounded-2xl border border-zinc-250 px-4 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-750 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-955/20 text-[10px] font-black text-primary">
                  A
                </div>
                Quick Demo Login (Alex)
              </button>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => login('guest@airstay.ai')}
                  type="button"
                  className="flex items-center justify-center rounded-2xl border border-zinc-250 py-2.5 hover:bg-zinc-50 dark:border-zinc-750 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                  title="Google Log In"
                >
                  <GoogleIcon className="h-5 w-5" />
                </button>

                <button
                  onClick={() => login('apple.user@airstay.ai')}
                  type="button"
                  className="flex items-center justify-center rounded-2xl border border-zinc-250 py-2.5 hover:bg-zinc-50 dark:border-zinc-750 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                  title="Apple Log In"
                >
                  <Apple className="h-5 w-5 text-zinc-800 dark:text-zinc-100" />
                </button>

                <button
                  onClick={() => login('facebook.user@airstay.ai')}
                  type="button"
                  className="flex items-center justify-center rounded-2xl border border-zinc-250 py-2.5 hover:bg-zinc-50 dark:border-zinc-750 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                  title="Facebook Log In"
                >
                  <FacebookIcon className="h-5 w-5 text-[#1877F2]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
