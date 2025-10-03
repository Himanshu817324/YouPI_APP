// src/services/firebaseService.ts

import { 
  authInstance, 
  messagingInstance, 
  analyticsInstance,
  logEvent,
} from '../config/firebase';

import {
  getInitialNotification,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  requestPermission,
  setBackgroundMessageHandler,
  subscribeToTopic,
  unsubscribeFromTopic,
  registerDeviceForRemoteMessages,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { 
  logScreenView,
  setUserId,
  setUserProperties
} from '@react-native-firebase/analytics';
import {
  signOut,
  onAuthStateChanged,
} from '@react-native-firebase/auth';

// THIS CLASS DECLARATION IS REQUIRED
export class PushNotificationService {
  static async requestPermission(): Promise<boolean> {
    try {
      const authStatus = await requestPermission(messagingInstance); 
      const enabled =
        authStatus === FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED ||
        authStatus === FirebaseMessagingTypes.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        await logEvent('push_permission_granted');
      } else {
        await logEvent('push_permission_denied');
      }
      return enabled;
    } catch (error) {
      return false;
    }
  }

  static async getToken(): Promise<string | null> {
    try {
      await registerDeviceForRemoteMessages(messagingInstance);
      const token = await getToken(messagingInstance);
      return token;
    } catch (error) {
      return null;
    }
  }

  static async subscribeToTopic(topic: string): Promise<boolean> {
    try {
      await subscribeToTopic(messagingInstance, topic);
      await logEvent('topic_subscribed', { topic });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async unsubscribeFromTopic(topic: string): Promise<boolean> {
    try {
      await unsubscribeFromTopic(messagingInstance, topic);
      await logEvent('topic_unsubscribed', { topic });
      return true;
    } catch (error) {
      return false;
    }
  }

  static setupMessageHandlers() {
    setBackgroundMessageHandler(messagingInstance, async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      await logEvent('background_message_received', {
        message_id: remoteMessage.messageId,
      });
    });

    return onMessage(messagingInstance, async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      await logEvent('foreground_message_received', {
        message_id: remoteMessage.messageId,
      });
    });
  }

  static setupNotificationOpenedApp() {
    return onNotificationOpenedApp(messagingInstance, (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      logEvent('notification_opened_app', {
        message_id: remoteMessage.messageId,
      });
    });
  }

  static async getInitialNotification() {
    try {
      const remoteMessage = await getInitialNotification(messagingInstance);
      if (remoteMessage) {
        await logEvent('initial_notification_opened', {
          message_id: remoteMessage.messageId,
        });
      }
      return remoteMessage;
    } catch (error) {
      return null;
    }
  }
}

// Analytics service
export class AnalyticsService {
  static async logScreenView(screenName: string, screenClass?: string) {
    try {
      await logScreenView(analyticsInstance, {
        screen_name: screenName,
        screen_class: screenClass || screenName,
      });
    } catch (error) {
      console.error('Log screen view error:', error);
    }
  }

  static async logCustomEvent(eventName: string, parameters?: Record<string, any>) {
    try {
      await logEvent(eventName, parameters);
    } catch (error) {
      console.error('Log custom event error:', error);
    }
  }
  
  static async setUserProperties(properties: Record<string, string | null>) {
    try {
      await setUserProperties(analyticsInstance, properties);
    } catch (error) {
      console.error('Set user properties error:', error);
    }
  }

  static async setUserId(userId: string | null) {
    try {
      await setUserId(analyticsInstance, userId);
    } catch (error) {
      console.error('Set user ID error:', error);
    }
  }
}

// Authentication service
export class AuthService {
  static async signOut(): Promise<boolean> {
    try {
      await signOut(authInstance);
      await logEvent('user_signed_out');
      return true;
    } catch (error) {
      return false;
    }
  }

  static getCurrentUser() {
    return authInstance.currentUser;
  }

  static onAuthStateChanged(callback: (user: any) => void) {
    return onAuthStateChanged(authInstance, callback);
  }
}

// THIS FUNCTION USES THE CLASS DECLARED ABOVE
export const initializeFirebaseServices = async () => {
  try {
    const hasPermission = await PushNotificationService.requestPermission();
    if (hasPermission) {
      await PushNotificationService.getToken();
    }

    PushNotificationService.setupMessageHandlers();
    PushNotificationService.setupNotificationOpenedApp();
    await PushNotificationService.getInitialNotification();

    return true;
  } catch (error) {
    return false;
  }
};