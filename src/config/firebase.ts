// src/config/firebase.ts

import firebase  from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getMessaging } from '@react-native-firebase/messaging';
import { getAnalytics } from '@react-native-firebase/analytics';
import { firebaseConfig } from './firebase.config';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const authInstance = getAuth();
export const messagingInstance = getMessaging();
export const analyticsInstance = getAnalytics();
export { firebaseConfig };

// --- Analytics Helper Functions ---
export const logEvent = async (
  eventName: string,
  params?: { [key: string]: any }, // Correct generic type for any event
) => {
  try {
    await analyticsInstance.logEvent(eventName, params);
  } catch (error) {
    console.error(`Analytics log event error for [${eventName}]:`, error);
  }
};
// Other helpers like setUserId can remain if you need them

/**
 * Sets the user ID for Analytics.
 */
export const setUserId = async (userId: string | null) => {
  try {
    await analyticsInstance.setUserId(userId);
  } catch (error) {
    console.error('Analytics set user ID error:', error);
  }
};

/**
 * Sets a user property for Analytics.
 */
export const setUserProperty = async (name: string, value: string | null) => {
  try {
    await analyticsInstance.setUserProperty(name, value);
  } catch (error) {
    console.error('Analytics set user property error:', error);
  }
};