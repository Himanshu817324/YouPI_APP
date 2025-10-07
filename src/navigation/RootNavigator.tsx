// src/navigation/RootNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';

import AuthStack from './auth/AuthStack';
import MainStack from './main/MainStack';
import ProfileScreen from '../screens/auth/Profile';

import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoggedIn, firebaseUser, loading } = useAuthStore();

  // Debug logging
  console.log('RootNavigator - Auth State:', {
    isLoggedIn,
    firebaseUser: firebaseUser ? 'exists' : 'null',
    loading
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // STATE 1: User is fully logged in -> show the main app
        <Stack.Screen name="MainStack" component={MainStack} />
      ) : firebaseUser ? (
        // STATE 2: User has Firebase auth but no backend profile -> show Profile screen directly
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          initialParams={{
            firebaseUid: firebaseUser.uid,
            mobileNo: firebaseUser.phoneNumber?.replace('+91', '') || ''
          }}
        />
      ) : (
        // STATE 3: User is completely logged out -> show auth stack starting with Login
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});