// src/config/firebase.ts

import { initializeApp, getApps } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getMessaging } from '@react-native-firebase/messaging';
import { getAnalytics } from '@react-native-firebase/analytics';
import { getStorage } from '@react-native-firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';
import { firebaseConfig } from './firebase.config';
import { Platform } from 'react-native';

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const authInstance = getAuth();
export const messagingInstance = getMessaging();
export const analyticsInstance = getAnalytics();
export const storageInstance = getStorage();
export const crashlyticsInstance = crashlytics();
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

// --- Firebase Storage Helper Functions ---
/**
 * Uploads a profile image to Firebase Storage
 */
export const uploadProfileImage = async (
  imageUri: string,
  userId: string,
  mobileNumber: string
): Promise<string> => {
  try {
    // Clean mobile number for filename
    const cleanMobileNumber = mobileNumber.replace(/[^0-9]/g, '');
    const filename = `profile_images/${cleanMobileNumber}_${Date.now()}.jpg`;
    const reference = storageInstance.ref(filename);

    console.log('Uploading to Firebase Storage:', filename);
    console.log('Image URI:', imageUri);

    // Check if the file exists and is accessible
    if (!imageUri) {
      throw new Error('No image selected. Please select an image.');
    }

    // Normalize the URI for different platforms
    let normalizedUri = imageUri;
    if (Platform.OS === 'android' && imageUri.startsWith('file://')) {
      normalizedUri = imageUri;
    } else if (Platform.OS === 'ios' && imageUri.startsWith('file://')) {
      normalizedUri = imageUri;
    } else if (imageUri.startsWith('content://')) {
      normalizedUri = imageUri;
    } else {
      throw new Error('Invalid image URI format. Please select a valid image.');
    }

    console.log('Normalized URI:', normalizedUri);

    // Upload the file
    const uploadTask = reference.putFile(normalizedUri);

    // Wait for upload to complete
    await uploadTask;

    // Get the download URL
    const downloadURL = await reference.getDownloadURL();

    console.log('Profile image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error: any) {
    console.error('Firebase Storage upload error:', error);
    
    // Log error to Crashlytics
    crashlyticsInstance.recordError(error);
    
    // Provide more specific error messages
    if (error.code === 'storage/unauthorized') {
      throw new Error('Unauthorized to upload images. Please check your permissions.');
    } else if (error.code === 'storage/network-request-failed') {
      throw new Error('Network error. Please check your connection and try again.');
    } else if (error.code === 'storage/invalid-format') {
      throw new Error('Invalid image format. Please select a valid image file.');
    } else if (error.code === 'storage/object-not-found') {
      throw new Error('Image file not found. Please try selecting the image again.');
    } else if (error.message?.includes('No such file or directory')) {
      throw new Error('Image file not found. Please try selecting the image again.');
    } else if (error.message?.includes('ENOENT')) {
      throw new Error('Image file not found. Please try selecting the image again.');
    } else {
      throw new Error(`Failed to upload profile image: ${error.message || 'Unknown error'}`);
    }
  }
};

/**
 * Uploads a profile image using base64 data to Firebase Storage
 */
export const uploadProfileImageBase64 = async (
  base64Data: string,
  userId: string,
  mobileNumber: string
): Promise<string> => {
  try {
    // Clean mobile number for filename
    const cleanMobileNumber = mobileNumber.replace(/[^0-9]/g, '');
    const filename = `profile_images/${cleanMobileNumber}_${Date.now()}.jpg`;
    const reference = storageInstance.ref(filename);

    console.log('Uploading base64 image to Firebase Storage:', filename);

    // Clean base64 string (remove data URL prefix if present)
    const base64String = base64Data.includes('data:image') 
      ? base64Data.split(',')[1] 
      : base64Data;

    // Upload the base64 string directly using putString
    const uploadTask = reference.putString(base64String, 'base64', {
      contentType: 'image/jpeg',
    });

    // Wait for upload to complete
    await uploadTask;

    // Get the download URL
    const downloadURL = await reference.getDownloadURL();

    console.log('Profile image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error: any) {
    console.error('Firebase Storage upload error:', error);
    
    // Log error to Crashlytics
    crashlyticsInstance.recordError(error);
    
    // Provide more specific error messages
    if (error.code === 'storage/unauthorized') {
      throw new Error('Unauthorized to upload images. Please check your permissions.');
    } else if (error.code === 'storage/network-request-failed') {
      throw new Error('Network error. Please check your connection and try again.');
    } else if (error.code === 'storage/invalid-format') {
      throw new Error('Invalid image format. Please select a valid image file.');
    } else if (error.code === 'storage/object-not-found') {
      throw new Error('Image file not found. Please try selecting the image again.');
    } else if (error.message?.includes('No such file or directory')) {
      throw new Error('Image file not found. Please try selecting the image again.');
    } else if (error.message?.includes('ENOENT')) {
      throw new Error('Image file not found. Please try selecting the image again.');
    } else {
      throw new Error(`Failed to upload profile image: ${error.message || 'Unknown error'}`);
    }
  }
};

/**
 * Deletes a profile image from Firebase Storage
 */
export const deleteProfileImage = async (imageUrl: string): Promise<void> => {
  try {
    const reference = storageInstance.refFromURL(imageUrl);
    await reference.delete();
    console.log('Profile image deleted successfully');
  } catch (error) {
    console.error('Firebase Storage delete error:', error);
    crashlyticsInstance.recordError(error as Error);
    throw new Error('Failed to delete profile image from Firebase Storage');
  }
};

// --- Crashlytics Helper Functions ---
/**
 * Logs a custom event to Crashlytics
 */
export const logCrashlyticsEvent = (eventName: string, attributes?: { [key: string]: string | number | boolean }) => {
  try {
    crashlyticsInstance.log(eventName);
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        crashlyticsInstance.setAttribute(key, String(value));
      });
    }
  } catch (error) {
    console.error('Crashlytics log event error:', error);
  }
};

/**
 * Sets user identifier for Crashlytics
 */
export const setCrashlyticsUserId = (userId: string) => {
  try {
    crashlyticsInstance.setUserId(userId);
  } catch (error) {
    console.error('Crashlytics set user ID error:', error);
  }
};

/**
 * Sets custom attributes for Crashlytics
 */
export const setCrashlyticsAttribute = (key: string, value: string) => {
  try {
    crashlyticsInstance.setAttribute(key, value);
  } catch (error) {
    console.error('Crashlytics set attribute error:', error);
  }
};

/**
 * Records a non-fatal error to Crashlytics
 */
export const recordCrashlyticsError = (error: Error, context?: string) => {
  try {
    if (context) {
      crashlyticsInstance.log(`Error context: ${context}`);
    }
    crashlyticsInstance.recordError(error);
  } catch (crashlyticsError) {
    console.error('Failed to record error to Crashlytics:', crashlyticsError);
  }
};

/**
 * Enables/disables Crashlytics collection
 */
export const setCrashlyticsCollectionEnabled = (enabled: boolean) => {
  try {
    crashlyticsInstance.setCrashlyticsCollectionEnabled(enabled);
  } catch (error) {
    console.error('Crashlytics collection toggle error:', error);
  }
};