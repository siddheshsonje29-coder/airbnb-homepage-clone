import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Calculator, Sparkles, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { mockProperties } from '../../data/mockData';
import { Link } from 'react-router-dom';

interface BudgetInputs {
  totalBudget: number;
  guests: number;
  duration: number;
}

export const BudgetCalculator: React.FC = () => {
  const [budgetState, setBudgetState] = useState<BudgetInputs>({
    totalBudget: 40000,
    guests: 2,
    duration: 3
  });

  const { register, handleSubmit, watch } = useForm<BudgetInputs>({
    defaultValues: budgetState
  });

  // Keep track of values reactively
  const watchBudget = watch("totalBudget", budgetState.totalBudget);
  const watchGuests = watch("guests", budgetState.guests);
  const watchDuration = watch("duration", budgetState.duration);

  // Form submission updates state
  const onSubmit = (data: BudgetInputs) => {
    setBudgetState(data);
  };

  // Perform budget splits
  const calculations = useMemo(() => {
    const total = watchBudget;
    const days = watchDuration;
    const people = watchGuests;

    const lodgingShare = Math.round(total * 0.45);
    const foodShare = Math.round(total * 0.25);
    const activitiesShare = Math.round(total * 0.20);
    const bufferShare = Math.round(total * 0.10);

    const maxLodgingPerNight = days > 0 ? lodgingShare / days : lodgingShare;

    // Filter properties
    const matched = mockProperties.filter(
      p => p.pricePerNight <= maxLodgingPerNight && p.maxGuests >= people
    ).sort((a, b) => b.rating - a.rating).slice(0, 3);

    return {
      lodging: lodgingShare,
      food: foodShare,
      activities: activitiesShare,
      buffer: bufferShare,
      maxPerNight: Math.round(maxLodgingPerNight),
      matched
    };
  }, [watchBudget, watchGuests, watchDuration]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-md transition-all">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <Calculator className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Budget Planner</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Total Budget */}
            <div>
              <label htmlFor="totalBudget" className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wide mb-2">
                Total Budget (₹)
              </label>
              <input
                id="totalBudget"
                type="number"
                min="5000"
                max="1000000"
                step="5000"
                {...register("totalBudget", { valueAsNumber: true })}
                className="w-full bg-zinc-50 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm dark:text-white focus:outline-none focus:border-primary font-semibold"
              />
              <input 
                type="range" 
                min="10000" 
                max="150000" 
                step="5000"
                {...register("totalBudget", { valueAsNumber: true })}
                className="w-full mt-3 accent-primary cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-semibold mt-1">
                <span>₹10,000</span>
                <span>₹1,50,000</span>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="guests" className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wide mb-2">
                Number of Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4.5 w-4.5 text-zinc-400" />
                <input
                  id="guests"
                  type="number"
                  min="1"
                  max="15"
                  {...register("guests", { valueAsNumber: true })}
                  className="w-full bg-zinc-50 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-sm dark:text-white focus:outline-none focus:border-primary font-semibold"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wide mb-2">
                Trip Duration (Nights)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4.5 w-4.5 text-zinc-400" />
                <input
                  id="duration"
                  type="number"
                  min="1"
                  max="30"
                  {...register("duration", { valueAsNumber: true })}
                  className="w-full bg-zinc-50 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-sm dark:text-white focus:outline-none focus:border-primary font-semibold"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-md transition-all">
            <h3 className="text-sm font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider mb-6">
              Budget Allocation Breakdown
            </h3>

            <div className="space-y-5">
              {/* Stays Allocation */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="dark:text-zinc-200">Stays & Lodging (45%)</span>
                  <span className="font-bold text-primary">₹{calculations.lodging.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: '45%' }} />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Budget for accommodation is max <span className="font-bold text-primary">₹{calculations.maxPerNight.toLocaleString()}/night</span> for {watchDuration} nights.
                </p>
              </div>

              {/* Food Allocation */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="dark:text-zinc-200">Food & Dining (25%)</span>
                  <span className="font-bold text-orange-500">₹{calculations.food.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '25%' }} />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Allows ~₹{Math.round(calculations.food / (watchDuration || 1) / (watchGuests || 1)).toLocaleString()} per person daily.
                </p>
              </div>

              {/* Activities Allocation */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="dark:text-zinc-200">Activities & Excursions (20%)</span>
                  <span className="font-bold text-emerald-500">₹{calculations.activities.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>

              {/* Buffer Allocation */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span className="dark:text-zinc-200">Emergency & Savings Buffer (10%)</span>
                  <span className="font-bold text-indigo-500">₹{calculations.buffer.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>

            </div>
          </div>

          {/* Recommended stays under budget */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-md transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Matching Stays Under Stay Budget
              </h3>
            </div>

            {calculations.matched.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {calculations.matched.map((p) => (
                  <Link 
                    key={p.id}
                    to={`/property/${p.id}`}
                    className="group flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-all bg-zinc-50 dark:bg-zinc-800/20"
                  >
                    <div className="h-28 overflow-hidden relative">
                      <img 
                        src={p.images[0]} 
                        alt={p.title} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform" 
                      />
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-primary transition-colors">{p.title}</h4>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-550 dark:text-zinc-400">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{p.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-700/50 pt-2 mt-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-zinc-450 uppercase font-bold">Price</span>
                          <span className="text-xs font-extrabold text-primary">₹{p.pricePerNight.toLocaleString()}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-zinc-500 dark:text-zinc-400">
                No stays found matching guest capacity under ₹{calculations.maxPerNight.toLocaleString()}/night. 
                Try increasing your budget or reducing guests.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
