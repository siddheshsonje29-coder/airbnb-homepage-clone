import React from 'react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { mockProperties } from '../../data/mockData';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import { Heart, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Wishlist: React.FC = () => {
  const { wishlistIds } = useWishlistStore();

  // Find actual property data matching IDs
  const wishlistedProperties = mockProperties.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            Saved Wishlist
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            You have saved {wishlistedProperties.length} property stays to your wishlist.
          </p>
        </div>

        {/* Listings Grid */}
        {wishlistedProperties.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {wishlistedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 max-w-xl mx-auto flex flex-col items-center gap-4">
            <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center text-primary dark:bg-rose-955/20">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">Create your first wishlist</h3>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-sm px-4">
                As you browse, tap the heart icon on your favorite stays to save them here for future travel plans.
              </p>
            </div>
            <Link 
              to="/" 
              className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Compass className="h-4 w-4" />
              <span>Start Exploring Stays</span>
            </Link>
          </div>
        )}

      </main>
    </div>
  );
};
