import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface PropertyState {
  // Search parameters
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;

  // Selected Category
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;

  // Recently Viewed Stays
  recentlyViewedIds: string[];
  addToRecentlyViewed: (id: string) => void;

  // Visited categories tracking (for recommendations)
  visitedCategories: string[];
  trackCategoryVisit: (category: string) => void;
}

const defaultSearchFilters: SearchFilters = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
};

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      // Search
      searchFilters: defaultSearchFilters,
      setSearchFilters: (filters) =>
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        })),
      resetSearchFilters: () => set({ searchFilters: defaultSearchFilters }),

      // Category
      selectedCategory: null,
      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        if (category) {
          get().trackCategoryVisit(category);
        }
      },

      // Recently Viewed
      recentlyViewedIds: [],
      addToRecentlyViewed: (id) => {
        const current = get().recentlyViewedIds;
        // Filter out existing and prepend new viewed item
        const filtered = current.filter((x) => x !== id);
        const updated = [id, ...filtered].slice(0, 6); // Keep last 6 items
        set({ recentlyViewedIds: updated });
      },

      // Visited Categories
      visitedCategories: [],
      trackCategoryVisit: (category) => {
        const current = get().visitedCategories;
        // Prepend and keep last 5 unique visited categories
        const filtered = current.filter((x) => x !== category);
        const updated = [category, ...filtered].slice(0, 5);
        set({ visitedCategories: updated });
      },
    }),
    {
      name: 'airbnb-property-storage',
      partialize: (state) => ({
        recentlyViewedIds: state.recentlyViewedIds,
        visitedCategories: state.visitedCategories,
      }), // Persist only history trackers, not live filters
    }
  )
);
