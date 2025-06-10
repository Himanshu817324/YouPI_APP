import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  email: string;
};

type AuthStore = {
  user: User | null;
  loading: boolean;
  hasOnboarded: boolean;

  // actions
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  hasOnboarded: false,

  login: async (userData) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },

  logout: async () => {
    await AsyncStorage.removeItem('user');
    set({ user: null });
  },

  completeOnboarding: async () => {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    set({ hasOnboarded: true });
  },

  initializeAuth: async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const onboarded = await AsyncStorage.getItem('hasOnboarded');

      set({
        user: storedUser ? JSON.parse(storedUser) : null,
        hasOnboarded: onboarded === 'true',
        loading: false,
      });
    } catch (e) {
      console.error('Zustand Auth Init Error:', e);
      set({ loading: false });
    }
  },
}));
