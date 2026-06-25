import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Menu, X, Sun, Moon, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../Logo/Logo';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { wishlistIds } = useWishlistStore();
  const { user, isAuthenticated, openAuthModal, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: "/", label: "Stays" },
    { to: "/experiences", label: "Experiences" },
    { to: "/planner", label: "Travel Planner", icon: <Sparkles className="w-3.5 h-3.5 mr-1 text-primary inline animate-pulse" /> },
    { to: "/wishlist", label: "Wishlist", badge: wishlistIds.length },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-150 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link 
            to="/" 
            onClick={closeMenu} 
            className="flex items-center gap-2 transition-transform hover:scale-102"
            aria-label="Airbnb Home"
          >
            <Logo className="h-8 w-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors hover:text-primary flex items-center ${
                    isActive 
                      ? "text-primary font-semibold" 
                      : "text-zinc-600 dark:text-zinc-350"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.icon}
                    {link.label}
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavBorder" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Menu (Theme toggle, Profile, Mobile Trigger) */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-zinc-650 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </button>

            {/* Profile Dropdown Container */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-full border border-zinc-200 p-1.5 pl-3 pr-2.5 hover:shadow-md transition-shadow dark:border-zinc-700 dark:hover:bg-zinc-800 cursor-pointer"
                aria-label="User menu"
                aria-expanded={showDropdown}
              >
                <Menu className="h-4 w-4 text-zinc-550 dark:text-zinc-300" />
                <div className="rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-550 dark:text-zinc-350 flex items-center justify-center h-6 w-6 text-xs font-bold font-mono">
                  {isAuthenticated && user ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <User className="h-3.5 w-3.5" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowDropdown(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-60 rounded-2xl border border-zinc-100 bg-white py-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 z-50 overflow-hidden"
                    >
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                            <p className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">Logged in as</p>
                            <p className="text-sm font-bold text-zinc-800 dark:text-white truncate">{user?.name}</p>
                            <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
                          </div>
                          <Link
                            to="/profile"
                            onClick={() => setShowDropdown(false)}
                            className="block px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-850"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/wishlist"
                            onClick={() => setShowDropdown(false)}
                            className="block px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-850"
                          >
                            Wishlists
                          </Link>
                          <Link
                            to="/planner"
                            onClick={() => setShowDropdown(false)}
                            className="block px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-850"
                          >
                            Travel Planner
                          </Link>
                          <div className="border-t border-zinc-100 dark:border-zinc-800 my-1" />
                          <button
                            onClick={() => {
                              logout();
                              setShowDropdown(false);
                            }}
                            className="w-full text-left block px-4 py-2.5 text-sm text-rose-650 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                          >
                            Log out
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              openAuthModal('signup');
                              setShowDropdown(false);
                            }}
                            className="w-full text-left block px-4 py-2.5 text-sm font-bold text-zinc-850 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-850 cursor-pointer"
                          >
                            Sign up
                          </button>
                          <button
                            onClick={() => {
                              openAuthModal('login');
                              setShowDropdown(false);
                            }}
                            className="w-full text-left block px-4 py-2.5 text-sm text-zinc-650 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
                          >
                            Log in
                          </button>
                          <div className="border-t border-zinc-100 dark:border-zinc-800 my-1" />
                          <Link
                            to="/login"
                            onClick={() => setShowDropdown(false)}
                            className="block px-4 py-2.5 text-sm text-zinc-650 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-850"
                          >
                            Standalone Auth Page
                          </Link>
                          <a
                            href="https://www.airbnb.com/help"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowDropdown(false)}
                            className="block px-4 py-2.5 text-sm text-zinc-650 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-850"
                          >
                            Help Center
                          </a>
                        </>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={toggleMenu}
              className="rounded-full p-2 text-zinc-650 hover:bg-zinc-100 dark:text-zinc-350 dark:hover:bg-zinc-800 md:hidden"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-30 bg-black md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-30 w-64 max-w-full bg-white px-6 py-6 shadow-xl dark:bg-zinc-900 md:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold text-lg dark:text-white">Menu</span>
                  <button
                    onClick={closeMenu}
                    className="rounded-full p-1 text-zinc-650 dark:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold transition-colors ${
                          isActive 
                            ? "bg-rose-50 text-primary dark:bg-rose-950/20" 
                            : "text-zinc-750 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        }`
                      }
                    >
                      <span className="flex items-center">
                        {link.icon}
                        {link.label}
                      </span>
                      {link.badge !== undefined && link.badge > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer info */}
              <div className="border-t border-zinc-100 pt-4 dark:border-zinc-800">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-zinc-50 dark:hover:bg-zinc-855"
                    >
                      <div className="rounded-full bg-zinc-200 p-1.5 text-zinc-555 dark:bg-zinc-700 h-9 w-9 flex items-center justify-center text-sm font-bold font-mono">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold truncate dark:text-white">{user.name}</p>
                        <p className="text-xs text-zinc-450 truncate">View Profile</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="w-full text-center block px-4 py-2 text-xs font-bold text-rose-650 bg-rose-50 hover:bg-rose-100 dark:bg-rose-955/20 dark:hover:bg-rose-955/40 rounded-xl cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 p-1">
                    <button
                      onClick={() => {
                        closeMenu();
                        openAuthModal('login');
                      }}
                      className="w-full text-center py-2.5 text-xs font-bold text-zinc-755 border border-zinc-250 dark:border-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-55 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => {
                        closeMenu();
                        openAuthModal('signup');
                      }}
                      className="w-full text-center py-2.5 text-xs font-bold text-white bg-primary rounded-xl hover:bg-primary-hover cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
