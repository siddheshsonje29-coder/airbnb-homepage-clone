import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  status: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  setAuthModalTab: (tab: 'login' | 'signup') => void;
  login: (email: string, password?: string) => Promise<boolean>;
  signUp: (name: string, email: string, phone: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

// Predefined demo accounts
export const DEMO_USER: User = {
  name: 'Alex',
  email: 'alex.travels@airstay.ai',
  phone: '+91 98765 43210',
  memberSince: 'June 2024',
  status: 'Super Traveler',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAuthModalOpen: false,
      authModalTab: 'login',
      openAuthModal: (tab = 'login') => {
        set({ isAuthModalOpen: true, authModalTab: tab });
      },
      closeAuthModal: () => {
        set({ isAuthModalOpen: false });
      },
      setAuthModalTab: (tab) => {
        set({ authModalTab: tab });
      },
      login: async (email, _password) => {
        // Simulating API latency
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check if demo user
        if (normalizedEmail === 'alex.travels@airstay.ai' || normalizedEmail === 'alex') {
          set({
            user: DEMO_USER,
            isAuthenticated: true,
            isAuthModalOpen: false,
          });
          return true;
        }

        // Standard user creation/login for demo convenience
        const fallbackUser: User = {
          name: email.split('@')[0] || 'Traveler',
          email: normalizedEmail,
          phone: '+91 99999 88888',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          status: 'Traveler',
        };

        set({
          user: fallbackUser,
          isAuthenticated: true,
          isAuthModalOpen: false,
        });
        return true;
      },
      signUp: async (name, email, phone, _password) => {
        // Simulating API latency
        await new Promise((resolve) => setTimeout(resolve, 800));

        const newUser: User = {
          name: name.trim() || 'New Traveler',
          email: email.toLowerCase().trim(),
          phone: phone.trim() || '+91 99999 88888',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          status: 'Traveler',
        };

        set({
          user: newUser,
          isAuthenticated: true,
          isAuthModalOpen: false,
        });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'airbnb-auth-storage',
      // Persist only authentication fields, modal states shouldn't persist
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
