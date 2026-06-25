import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { X, Mail, Phone, Lock, User, Apple } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalTab, 
    closeAuthModal, 
    setAuthModalTab, 
    login, 
    signUp 
  } = useAuthStore();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleTabChange = (tab: 'login' | 'signup') => {
    setError('');
    setAuthModalTab(tab);
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
        // Modal closes automatically via store
        setEmail('');
        setPassword('');
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
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content Panel */}
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl transition-all dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-zinc-150 px-6 dark:border-zinc-800">
            <button
              onClick={closeAuthModal}
              className="rounded-full p-2 text-zinc-650 hover:bg-zinc-100 dark:text-zinc-350 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="text-sm font-black tracking-wide uppercase dark:text-white">
              {authModalTab === 'login' ? 'Log in' : 'Sign up'}
            </span>
            <div className="w-9" /> {/* Spacer to align title */}
          </div>

          {/* Body */}
          <div className="max-h-[80vh] overflow-y-auto p-6 scrollbar-thin">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Welcome to Airbnb Clone
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Discover beautiful stays, unique experiences, and plan your next gateway.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-650 dark:bg-rose-955/20 dark:border-rose-900/50 dark:text-rose-450">
                {error}
              </div>
            )}

            {/* Tab Switches */}
            <div className="flex border-b border-zinc-100 dark:border-zinc-800 mb-6">
              <button
                onClick={() => handleTabChange('login')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
                  authModalTab === 'login'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => handleTabChange('signup')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
                  authModalTab === 'signup'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {authModalTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="border border-zinc-250 dark:border-zinc-700 rounded-2xl overflow-hidden focus-within:border-primary dark:focus-within:border-primary transition-colors">
                  {/* Email Input */}
                  <div className="relative border-b border-zinc-250 dark:border-zinc-700 px-3.5 py-2.5 focus-within:z-10">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Email address
                    </label>
                    <Mail className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>

                  {/* Password Input */}
                  <div className="relative px-3.5 py-2.5">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
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
                    'Continue'
                  )}
                </button>
              </form>
            ) : (
              /* Sign Up Form */
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div className="border border-zinc-250 dark:border-zinc-700 rounded-2xl overflow-hidden focus-within:border-primary dark:focus-within:border-primary transition-colors">
                  {/* Full Name */}
                  <div className="relative border-b border-zinc-250 dark:border-zinc-700 px-3.5 py-2.5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Full name
                    </label>
                    <User className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>

                  {/* Email */}
                  <div className="relative border-b border-zinc-250 dark:border-zinc-700 px-3.5 py-2.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Email address
                    </label>
                    <Mail className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>

                  {/* Phone Number */}
                  <div className="relative border-b border-zinc-250 dark:border-zinc-700 px-3.5 py-2.5">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Phone number
                    </label>
                    <Phone className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>

                  {/* Password */}
                  <div className="relative px-3.5 py-2.5">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=" "
                      className="peer w-full bg-transparent text-sm focus:outline-none pt-4 pb-1 dark:text-white"
                    />
                    <label className="absolute left-3.5 top-3.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase">
                      Password (optional)
                    </label>
                    <Lock className="absolute right-3.5 top-5 h-4.5 w-4.5 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <p className="text-[10px] text-zinc-400 leading-normal">
                  We will confirm your details to set up your account. Standard messaging rates apply.
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    'Agree & Continue'
                  )}
                </button>
              </form>
            )}

            {/* OR separator */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-150 dark:border-zinc-800" />
              </div>
              <span className="relative bg-white px-4 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:bg-zinc-900">
                or
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={loadDemoUser}
                type="button"
                className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-250 px-4 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-750 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-955/20 text-[10px] font-black text-primary">
                  A
                </div>
                Quick Demo Login (Alex)
              </button>

              <button
                onClick={() => login('guest@airstay.ai')}
                type="button"
                className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-250 px-4 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-750 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <GoogleIcon className="h-4.5 w-4.5" />
                Continue with Google (Demo Guest)
              </button>

              <button
                onClick={() => login('apple.user@airstay.ai')}
                type="button"
                className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-250 px-4 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-750 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Apple className="h-4.5 w-4.5 text-zinc-800 dark:text-zinc-100" />
                Continue with Apple
              </button>

              <button
                onClick={() => login('facebook.user@airstay.ai')}
                type="button"
                className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-250 px-4 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-750 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <FacebookIcon className="h-4.5 w-4.5 text-[#1877F2]" />
                Continue with Facebook
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
