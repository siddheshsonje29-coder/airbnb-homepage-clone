import React, { useState } from 'react';
import { AITravelAssistant } from '../../components/AITravelAssistant/AITravelAssistant';
import { BudgetCalculator } from '../../components/BudgetCalculator/BudgetCalculator';
import { Sparkles, Calculator, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const TravelPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'budget'>('ai');

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Header Banner */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800/80 py-10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-primary dark:bg-rose-955/20 text-xs font-black tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SMART TRIP PLANNER ENGINE</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight dark:text-white">Plan Your Journey, Smarter</h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed font-medium">
            Harness custom calculations and intelligent semantic models to find recommended accommodations and design ideal itineraries.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="relative flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl w-full max-w-md border border-zinc-200/50 dark:border-zinc-700/50">
            {/* Active Highlight Background */}
            <motion.div 
              layoutId="activePlannerTab"
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-white dark:bg-zinc-900 shadow-md border border-zinc-200/40 dark:border-zinc-800/40"
              style={{
                width: 'calc(50% - 12px)',
                left: activeTab === 'ai' ? '10px' : 'calc(50% + 2px)',
              }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />

            {/* AI Assistant button */}
            <button
              onClick={() => setActiveTab('ai')}
              className={`relative z-10 flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'ai' 
                  ? 'text-primary' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-white'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Travel Assistant</span>
            </button>

            {/* Budget Calculator button */}
            <button
              onClick={() => setActiveTab('budget')}
              className={`relative z-10 flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'budget' 
                  ? 'text-primary' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-white'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>Budget Calculator</span>
            </button>
          </div>
        </div>

        {/* Tab Views */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'ai' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-2.5 p-4 rounded-xl border border-blue-100 bg-blue-50/50 dark:border-blue-900/20 dark:bg-blue-950/5 text-blue-800 dark:text-blue-300">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed font-semibold">
                  The AI Travel Assistant uses semantic query processing. It extracts stays in your desired category (e.g. Beach, Cabins) and filters them matching your budget requirements immediately.
                </p>
              </div>
              <AITravelAssistant />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BudgetCalculator />
            </motion.div>
          )}
        </div>

      </main>

    </div>
  );
};
