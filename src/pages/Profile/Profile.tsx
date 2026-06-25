import React, { useMemo } from 'react';
import { usePropertyStore } from '../../store/usePropertyStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import { mockProperties } from '../../data/mockData';
import type { Property } from '../../data/mockData';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import { Calendar, ShieldCheck, Mail, Phone, Compass, Award, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Booking {
  id: string;
  property: Property;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'upcoming' | 'past';
  cost: number;
}

export const Profile: React.FC = () => {
  const { recentlyViewedIds, visitedCategories } = usePropertyStore();
  const { wishlistIds } = useWishlistStore();
  const { user, isAuthenticated, openAuthModal } = useAuthStore();

  // If not logged in, show premium CTA portal view
  if (!isAuthenticated || !user) {
    return (
      <div className="bg-white dark:bg-zinc-955 min-h-[80vh] flex flex-col justify-center items-center px-4 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full bg-zinc-50 border border-zinc-200/80 p-8 rounded-3xl dark:bg-zinc-900 dark:border-zinc-800 text-center shadow-lg"
        >
          <div className="mx-auto h-16 w-16 bg-rose-50 border border-primary/20 dark:bg-rose-955/20 text-primary flex items-center justify-center rounded-full mb-6 shadow-inner">
            <User className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black dark:text-white uppercase tracking-wider mb-2">
            Profile Portal
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed mb-8">
            Access your reservations, curated stay recommendations, active wishlists, and personalize your experience.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer animate-pulse"
            >
              Sign In or Sign Up
            </button>
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-150 dark:border-zinc-800" />
              </div>
              <span className="relative bg-zinc-50 px-3 text-[10px] font-extrabold uppercase tracking-widest text-zinc-455 dark:bg-zinc-900">
                or
              </span>
            </div>
            <Link
              to="/"
              className="w-full block border border-zinc-250 py-3 px-6 rounded-2xl text-xs font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            >
              Back to Explore
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const userProfile = user;

  // Mock reservation history
  const bookings: Booking[] = useMemo(() => {
    return [
      {
        id: "res-1",
        property: mockProperties[0], // Malibu beachfront
        checkIn: "2026-07-12",
        checkOut: "2026-07-15",
        guests: 2,
        status: "upcoming",
        cost: mockProperties[0].pricePerNight * 3 + 4300
      },
      {
        id: "res-2",
        property: mockProperties[4], // Bali treehouse
        checkIn: "2026-02-10",
        checkOut: "2026-02-14",
        guests: 2,
        status: "past",
        cost: mockProperties[4].pricePerNight * 4 + 4300
      }
    ];
  }, []);

  // Recommendation engine: 
  // Suggest stays from categories visited, excluding already wishlisted or recently viewed
  const recommendations = useMemo(() => {
    if (visitedCategories.length === 0) {
      // Return featured properties if no browsing history
      return mockProperties.filter(p => p.featured).slice(0, 4);
    }

    // Filter properties matching visited categories
    let pool = mockProperties.filter(p => visitedCategories.includes(p.category));

    // Filter out already wishlisted and recently viewed stays
    pool = pool.filter(p => !wishlistIds.includes(p.id) && !recentlyViewedIds.includes(p.id));

    // If pool is empty, fall back to high rated stays not wishlisted
    if (pool.length === 0) {
      pool = mockProperties.filter(p => !wishlistIds.includes(p.id)).sort((a, b) => b.rating - a.rating);
    }

    return pool.slice(0, 4);
  }, [visitedCategories, wishlistIds, recentlyViewedIds]);

  // Find recently viewed properties
  const recentlyViewedProperties = useMemo(() => {
    return mockProperties.filter(p => recentlyViewedIds.includes(p.id));
  }, [recentlyViewedIds]);

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-300 pb-16">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Profile Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* User Profile Card */}
          <div className="md:col-span-1 bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 p-6 rounded-3xl space-y-6 h-fit shadow-sm">
            <div className="flex flex-col items-center text-center space-y-3.5 border-b border-zinc-200 dark:border-zinc-800 pb-5">
              <div className="h-20 w-20 rounded-full bg-rose-50 border border-primary/20 flex items-center justify-center text-primary dark:bg-rose-955/35 text-2xl font-black shadow-inner">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold dark:text-white flex items-center justify-center gap-1.5">
                  {userProfile.name}
                  <Award className="h-4.5 w-4.5 text-yellow-500" />
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary bg-rose-100/50 px-2 py-0.5 rounded">
                  {userProfile.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold text-zinc-650 dark:text-zinc-350">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-zinc-400" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-zinc-400" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <Calendar className="h-4.5 w-4.5 text-zinc-400" />
                <span>Member since {userProfile.memberSince}</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                <span>Verified Account Profile</span>
              </div>
            </div>
          </div>

          {/* Bookings / Reservation History Panel */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-black dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-3">
              Trips & Reservations
            </h2>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="flex flex-col sm:flex-row border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow shadow-sm transition-all bg-white dark:bg-zinc-900"
                >
                  <img 
                    src={booking.property.images[0]} 
                    alt={booking.property.title} 
                    className="w-full sm:w-48 h-32 object-cover" 
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded ${
                          booking.status === 'upcoming' 
                            ? 'bg-rose-50 text-primary dark:bg-rose-955/20' 
                            : 'bg-zinc-100 text-zinc-650 dark:bg-zinc-800 dark:text-zinc-400'
                        }`}>
                          {booking.status}
                        </span>
                        <span className="text-xs font-extrabold text-zinc-900 dark:text-white">
                          ₹{booking.cost.toLocaleString()}
                        </span>
                      </div>
                      
                      <h3 className="font-extrabold text-sm dark:text-white mt-2 truncate">
                        {booking.property.title}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-[11px] text-zinc-550 dark:text-zinc-400 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                        <span className="truncate">{booking.property.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500 border-t border-zinc-100 dark:border-zinc-800/80 pt-2.5 mt-4">
                      <span>{booking.checkIn} to {booking.checkOut}</span>
                      <Link 
                        to={`/property/${booking.property.id}`} 
                        className="text-primary font-bold hover:underline"
                      >
                        View Stay →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Recently Viewed Panel */}
        {recentlyViewedProperties.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-black dark:text-white uppercase tracking-wider mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              Recently Viewed Stays
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentlyViewedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}

        {/* Personalized Recommendations Section */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <Compass className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-lg font-black dark:text-white uppercase tracking-wider">
                Personalized for You
              </h2>
              <p className="text-[10px] text-zinc-450 uppercase font-bold mt-0.5">
                Based on your wishlists and visited stay categories ({visitedCategories.join(', ') || 'General'})
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};
