import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[580px] bg-zinc-900 overflow-hidden flex items-center justify-center">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80"
          alt="Beautiful beach travel destination background"
          className="w-full h-full object-cover opacity-65 dark:opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-zinc-950/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center gap-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 max-w-3xl"
        >
          {/* AI Banner Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wide border border-white/20">
            <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI-POWERED SEARCH PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find Stays Beyond Your{" "}
            <span className="bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">
              Imagination
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-100 font-medium">
            Explore beach houses, cabins, and trending travel spots. Ask our AI Travel Planner for custom itineraries.
          </p>
        </motion.div>

        {/* Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <SearchBar />
        </motion.div>

      </div>
    </section>
  );
};
