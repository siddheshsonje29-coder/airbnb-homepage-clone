import React, { useRef, useState, useEffect } from 'react';
import { usePropertyStore } from '../../store/usePropertyStore';
import { 
  Palmtree, 
  Mountain, 
  Home, 
  Tent, 
  Eye, 
  Flame, 
  Waves, 
  Sprout, 
  Gem, 
  Trees,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CategoryItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: CategoryItem[] = [
  { name: "Beach", icon: Palmtree },
  { name: "Mountains", icon: Mountain },
  { name: "Cabins", icon: Home },
  { name: "Camping", icon: Tent },
  { name: "Amazing Views", icon: Eye },
  { name: "Trending", icon: Flame },
  { name: "Islands", icon: Waves },
  { name: "Farms", icon: Sprout },
  { name: "Luxury", icon: Gem },
  { name: "Treehouses", icon: Trees },
];

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = usePropertyStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check container scroll state to display arrows
  const checkScrollState = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setShowLeftArrow(el.scrollLeft > 5);
      // Allow slight rounding differences
      setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollState);
      // Initial check
      checkScrollState();
      // Resize check
      window.addEventListener('resize', checkScrollState);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = 240;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="relative flex items-center justify-between">
        
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-md hover:scale-105 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 transition-all"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex w-full gap-8 overflow-x-auto scroll-smooth py-1 px-8"
        >
          {/* All option */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex flex-col items-center gap-2 border-b-2 pb-2 text-xs font-semibold tracking-wide transition-all duration-200 hover:text-zinc-900 dark:hover:text-white ${
              selectedCategory === null
                ? "border-primary text-primary dark:border-primary dark:text-primary opacity-100"
                : "border-transparent text-zinc-500 dark:text-zinc-400 opacity-70 hover:opacity-100"
            }`}
          >
            <span className="text-[10px] uppercase font-bold leading-5 px-1 bg-zinc-100 dark:bg-zinc-800 rounded">All</span>
            <span className="whitespace-nowrap">All Stays</span>
          </button>

          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex flex-col items-center gap-2 border-b-2 pb-2 text-xs font-semibold tracking-wide transition-all duration-200 hover:text-zinc-900 dark:hover:text-white ${
                  isSelected
                    ? "border-primary text-primary dark:border-primary dark:text-primary opacity-100"
                    : "border-transparent text-zinc-500 dark:text-zinc-400 opacity-70 hover:opacity-100"
                }`}
              >
                <Icon className="h-6 w-6 stroke-[1.8]" />
                <span className="whitespace-nowrap">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-md hover:scale-105 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 transition-all"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        )}

      </div>
    </div>
  );
};
