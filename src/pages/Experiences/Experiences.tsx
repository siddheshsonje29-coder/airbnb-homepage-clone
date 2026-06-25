import React, { useState, useMemo, useEffect } from 'react';
import { mockExperiences } from '../../data/mockData';
import { ExperienceCard } from '../../components/ExperienceCard/ExperienceCard';
import { Search, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const Experiences: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCat]);

  const categories = ["Adventure", "Food", "Nature", "Culture", "Farms"];

  const filteredExperiences = useMemo(() => {
    let result = mockExperiences;

    if (selectedCat) {
      result = result.filter(e => e.category === selectedCat);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        e => 
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.hostName.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchQuery, selectedCat]);

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Immersive Header Banner */}
      <section className="relative w-full h-80 bg-zinc-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=80" 
            alt="Experiences background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-zinc-950/40" />
        </div>

        <div className="relative text-center text-white px-4 max-w-2xl space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Airbnb Experiences</h1>
          <p className="text-xs sm:text-sm text-zinc-200">
            Uncover singular travel activities led by local hosts. Food tastings, wild excursions, and cultural ceremonies await.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Controls Layout (Search & Category Buttons) */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCat(null)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                selectedCat === null
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white border-zinc-200 text-zinc-650 hover:border-zinc-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white border-zinc-200 text-zinc-650 hover:border-zinc-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences..."
              className="w-full bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary dark:text-white transition-colors"
            />
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div 
                key={idx} 
                className="animate-pulse border border-zinc-150 dark:border-zinc-850 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 h-[340px] space-y-4"
              >
                <div className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-4 flex justify-between gap-4">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredExperiences.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 max-w-lg mx-auto flex flex-col items-center gap-3">
            <ShieldAlert className="h-10 w-10 text-zinc-400" />
            <h3 className="text-base font-bold dark:text-white">No experiences found</h3>
            <p className="text-xs text-zinc-500 max-w-sm">No activities matched "{searchQuery}" under this category. Broaden your keywords or category.</p>
          </div>
        )}

      </main>

    </div>
  );
};
