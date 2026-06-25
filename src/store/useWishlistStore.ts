import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  wishlistIds: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: [],
      addToWishlist: (id) => {
        if (!get().wishlistIds.includes(id)) {
          set({ wishlistIds: [...get().wishlistIds, id] });
        }
      },
      removeFromWishlist: (id) => {
        set({ wishlistIds: get().wishlistIds.filter((x) => x !== id) });
      },
      toggleWishlist: (id) => {
        const ids = get().wishlistIds;
        if (ids.includes(id)) {
          set({ wishlistIds: ids.filter((x) => x !== id) });
        } else {
          set({ wishlistIds: [...ids, id] });
        }
      },
      clearWishlist: () => set({ wishlistIds: [] }),
    }),
    {
      name: 'airbnb-wishlist-storage',
    }
  )
);
