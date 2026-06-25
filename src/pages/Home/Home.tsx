import React, { useState, useEffect, useMemo } from 'react';
import { Hero } from '../../components/Hero/Hero';
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import { ExperienceCard } from '../../components/ExperienceCard/ExperienceCard';
import { mockProperties, mockExperiences, mockDestinations } from '../../data/mockData';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Sparkles, Award, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo/Logo';

export const Home: React.FC = () => {
  const { searchFilters, selectedCategory, resetSearchFilters } = usePropertyStore();
  const [loading, setLoading] = useState(true);

  // Simulate API load on filters/category change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchFilters, selectedCategory]);

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    let result = mockProperties;

    // Filter by Category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Destination text
    if (searchFilters.destination.trim()) {
      const query = searchFilters.destination.toLowerCase().trim();
      result = result.filter(
        p => 
          p.city.toLowerCase().includes(query) ||
          p.country.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query)
      );
    }

    // Filter by Guest count
    if (searchFilters.guests > 1) {
      result = result.filter(p => p.maxGuests >= searchFilters.guests);
    }

    return result;
  }, [searchFilters, selectedCategory]);

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Hero Banner */}
      <Hero />

      {/* Category Horizontal Filter */}
      <CategoryFilter />

      {/* Main Listing Section */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Properties Header & Reset Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
              <Logo className="h-6 w-6" showText={false} />
              {selectedCategory ? `${selectedCategory} Stays` : "Explore Stays"}
            </h2>
            <p className="text-xs text-zinc-500">
              Showing {filteredProperties.length} handpicked premium accommodations.
            </p>
          </div>

          {(searchFilters.destination || searchFilters.guests > 1 || searchFilters.checkIn) && (
            <button
              onClick={resetSearchFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-200 hover:border-zinc-900 text-zinc-700 bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-white transition-all cursor-pointer w-fit"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Clear Search Filters</span>
            </button>
          )}
        </div>

        {/* Listings Grid / Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div 
                key={idx} 
                className="animate-pulse border border-zinc-150 dark:border-zinc-850 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 h-[380px] space-y-4"
              >
                <div className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
                  <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 mt-4 flex justify-between">
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">No stays match your criteria</h3>
            <p className="text-xs text-zinc-500 mb-4">Try clearing some search filters or browsing other categories.</p>
            <button 
              onClick={resetSearchFilters} 
              className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-primary-hover transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Separator */}
        <hr className="my-16 border-zinc-100 dark:border-zinc-850" />

        {/* Experiences Section */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Airbnb Experiences
              </h2>
              <p className="text-xs text-zinc-550 dark:text-zinc-450">
                Highly immersive local activities hosted by expert travel guides.
              </p>
            </div>
            <Link 
              to="/experiences" 
              className="text-xs font-bold text-primary hover:underline hover:scale-101 transition-all"
            >
              Browse All Experiences →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {mockExperiences.slice(0, 5).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </section>

        {/* Travel Inspiration Section */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Inspiration for Your Next Trip
            </h2>
            <p className="text-xs text-zinc-550 dark:text-zinc-450">
              Discover popular seasonal recommendations, weather-suited destinations, and cultural spots.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockDestinations.slice(0, 4).map((dest) => (
              <div 
                key={dest.id}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-zinc-900 border border-zinc-200/20"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  loading="lazy" 
                  className="w-full h-full object-cover opacity-75 group-hover:scale-103 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded-full w-fit mb-2">
                    {dest.popularCategory} Recommended
                  </span>
                  <h3 className="font-extrabold text-base leading-snug">{dest.name}, {dest.country}</h3>
                  <p className="text-[10px] text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                  <div className="border-t border-white/20 pt-2.5 mt-3 flex justify-between items-center text-[10px] text-zinc-300 font-semibold">
                    <span>Best time: {dest.bestTime}</span>
                    <span className="text-yellow-400">Avg {dest.avgTemp}°C</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
};
