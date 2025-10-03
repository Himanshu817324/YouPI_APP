// authStore.ts

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authInstance as auth } from '../config/firebase';
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  FirebaseAuthTypes,
  signOut, // FIXED: Import modular functions
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import { apiService, User as ApiUser } from '../services/apiService';

type User = {
  id: number;
  mobileNumber: string;
  fullName: string;
  email: string;
  fireBaseUUID: string;
  gender: string;
  active: boolean;
  verified: boolean;
};

type AuthStore = {
  user: User | null;
  firebaseUser: FirebaseAuthTypes.User | null;
  loading: boolean;
  hasOnboarded: boolean;
  verificationId: string | null;
  isLoggedIn: boolean;
  loginWithPhone: (phoneNumber: string) => Promise<void>;
  verifyOTP: (otp: string, mobileNo: string) => Promise<{ isNewUser: boolean }>;
  loginWithBackend: (apiUser: ApiUser) => Promise<void>;
  loginWithBackendAfterOTP: (firebaseUid: string, mobileNo: string) => Promise<{ isNewUser: boolean }>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  firebaseUser: null,
  loading: true,
  hasOnboarded: false,
  verificationId: null,
  isLoggedIn: false,

  loginWithPhone: async (phoneNumber: string) => {
    try {
      set({ loading: true });
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      // FIXED: Pass the 'auth' object directly, don't call it.
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone);
      set({ verificationId: confirmation.verificationId, loading: false });
    } catch (error) {
      console.error('Phone auth error:', error);
      set({ loading: false });
      throw error;
    }
  },

  verifyOTP: async (otp: string, mobileNo: string) => {
    try {
      set({ loading: true });
      const { verificationId } = get();
      if (!verificationId) {
        throw new Error('No verification ID found');
      }
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      // FIXED: Pass the 'auth' object directly, don't call it.
      const userCredential = await signInWithCredential(auth, credential);
      set({ firebaseUser: userCredential.user, verificationId: null });

      // After Firebase sign-in, execute the backend check/login flow
      return await get().loginWithBackendAfterOTP(userCredential.user.uid, mobileNo);

    } catch (error) {
      console.error('OTP verification error:', error);
      set({ loading: false });
      throw error;
    }
  },

  loginWithBackend: async (apiUser) => {
    const userData: User = {
      id: apiUser.id,
      mobileNumber: apiUser.mobileNumber,
      fullName: apiUser.fullName,
      email: apiUser.email,
      fireBaseUUID: apiUser.fireBaseUUID,
      gender: apiUser.gender,
      active: apiUser.active,
      verified: apiUser.verified,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isLoggedIn: true });
  },

  loginWithBackendAfterOTP: async (firebaseUid: string, mobileNo: string) => {
    try {
      set({ loading: true });
      const userCheck = await apiService.checkUser(mobileNo);

      if (userCheck.exists && userCheck.user) {
        // User exists, log them in with backend data
        const loginResponse = await apiService.loginUser(mobileNo);
        if (loginResponse.success && loginResponse.user) {
          await get().loginWithBackend(loginResponse.user);
        } else {
          throw new Error(loginResponse.message || "Login failed");
        }
        set({ loading: false }); // <-- SET LOADING FALSE HERE
        return { isNewUser: false };
      } else {
        // User doesn't exist, they need to create profile
        set({ loading: false }); // <-- AND SET LOADING FALSE HERE
        return { isNewUser: true };
      }
    } catch (error) {
      console.error('Backend login/check error:', error);
      set({ loading: false }); // <-- AND ALSO HERE ON ERROR
      throw error;
    }
  },
  logout: async () => {
    try {
      // FIXED: Use the modular signOut function and pass the auth instance.
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      set({ user: null, firebaseUser: null, verificationId: null, isLoggedIn: false });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  completeOnboarding: async () => {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    set({ hasOnboarded: true });
  },

  initializeAuth: async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const onboarded = await AsyncStorage.getItem('hasOnboarded');
      // FIXED: Access currentUser as a property of the auth object.
      const currentUser = auth.currentUser;

      if (currentUser && storedUser) {
        set({
          user: JSON.parse(storedUser),
          firebaseUser: currentUser,
          hasOnboarded: onboarded === 'true',
          isLoggedIn: true,
          loading: false,
        });
      } else {
        set({
          hasOnboarded: onboarded === 'true',
          loading: false,
        });
      }

      // FIXED: Use the modular onAuthStateChanged function and pass the auth instance.
      onAuthStateChanged(auth, (user: FirebaseAuthTypes.User | null) => {
        if (user) {
          set({ firebaseUser: user });
        } else {
          set({ firebaseUser: null, user: null, isLoggedIn: false });
        }
      });

    } catch (e) {
      console.error('Zustand Auth Init Error:', e);
      set({ loading: false });
    }
  },
}));