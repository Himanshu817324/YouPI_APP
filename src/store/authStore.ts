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
  password: null;
  active: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
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
    console.log('loginWithBackend called with:', apiUser);
    const userData: User = {
      id: apiUser.id,
      mobileNumber: apiUser.mobileNumber,
      fullName: apiUser.fullName,
      email: apiUser.email,
      fireBaseUUID: apiUser.fireBaseUUID,
      gender: apiUser.gender,
      password: (apiUser as any).password,
      active: apiUser.active,
      verified: apiUser.verified,
      createdAt: apiUser.createdAt,
      updatedAt: apiUser.updatedAt,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isLoggedIn: true });
    console.log('User logged in successfully, isLoggedIn set to true');
  },

  loginWithBackendAfterOTP: async (firebaseUid: string, mobileNo: string) => {
    try {
      set({ loading: true });

      try {
        console.log('ðŸ” Checking user existence...');
        const userCheck = await apiService.checkUser(mobileNo);

        console.log('âœ… CheckUser API Response:', userCheck);

        // CheckUser API returns boolean: true if user exists, false if not
        const userExists = userCheck === true;
        console.log('ðŸ“Š User exists:', userExists);

        if (userExists) {
          // User exists, log them in with backend data
          console.log('ðŸ‘¤ User exists, logging in...');
          try {
            const loginResponse = await apiService.loginUser(mobileNo);
            console.log('ðŸ” Login API Response:', loginResponse);

            // Handle both response formats: {success: true, user: {...}} or direct user object
            if ((loginResponse.success && loginResponse.user) || loginResponse.id) {
              console.log('✅ Login successful, setting user data');
              // Use user property if available, otherwise use the response itself
              const userData = loginResponse.user || loginResponse as ApiUser;
              await get().loginWithBackend(userData);
            } else {
              console.log('âŒ Login response indicates failure:', {
                success: loginResponse.success,
                message: loginResponse.message,
                user: loginResponse.user,
              });
              throw new Error(loginResponse.message || 'Login failed - no user data returned');
            }
            set({ loading: false });
            return { isNewUser: false };
          } catch (loginError: any) {
            console.error('ðŸ’¥ Login API failed:', loginError);
            console.log('Login error details:', {
              message: loginError.message,
              stack: loginError.stack,
            });

            // If login fails but user exists, we can still proceed to profile creation
            // This handles cases where the login endpoint might be down but user exists
            console.log('ðŸ”„ Login failed but user exists, proceeding to profile creation as fallback');
            set({ loading: false });
            return { isNewUser: true };
          }
        } else {
          // User doesn't exist, they need to create profile
          console.log('ðŸ†• New user detected, proceeding to profile creation');
          set({ loading: false });
          return { isNewUser: true };
        }
      } catch (checkError: any) {
        console.log('âŒ CheckUser API failed:', checkError);

        // Handle timeout errors gracefully
        if (checkError.message.includes('timeout')) {
          console.log('â° CheckUser timed out, assuming new user for better UX');
          set({ loading: false });
          return { isNewUser: true };
        }

        // If check user API fails (404, 500, etc.), assume user is new
        // This allows the flow to continue to profile creation
        if (checkError.message.includes('404') || checkError.message.includes('500')) {
          console.log('ðŸ”§ CheckUser API not available, assuming new user');
          set({ loading: false });
          return { isNewUser: true };
        } else {
          // Re-throw other errors
          throw checkError;
        }
      }
    } catch (error) {
      console.error('Backend login/check error:', error);
      set({ loading: false });
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
        console.log('Firebase Auth State Changed:', user ? 'User exists' : 'User null');
        if (user) {
          set({ firebaseUser: user });
        } else {
          // Only reset auth state if we don't have a logged in user
          const currentState = get();
          console.log('Current auth state when Firebase user null:', {
            isLoggedIn: currentState.isLoggedIn,
            hasUser: !!currentState.user,
            hasFirebaseUser: !!currentState.firebaseUser,
          });
          if (!currentState.isLoggedIn && !currentState.user) {
            console.log('Firebase user null and not logged in, resetting auth state');
            set({ firebaseUser: null, user: null, isLoggedIn: false });
          } else {
            console.log('Firebase user null but user is logged in, keeping auth state');
            // Keep the current state but update firebaseUser to null
            set({ firebaseUser: null });
          }
        }
      });

    } catch (e) {
      console.error('Zustand Auth Init Error:', e);
      set({ loading: false });
    }
  },
}));
