import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from './src/store/authStore';
import SplashScreen from './src/screens/SplashScreen';
import RootNavigator from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

const { height } = Dimensions.get('window');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const slideAnim = useState(new Animated.Value(0))[0];
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const deviceColorScheme = useColorScheme();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleSplashComplete = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <SplashScreen onComplete={handleSplashComplete} />
        </Animated.View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white dark:bg-black">
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
