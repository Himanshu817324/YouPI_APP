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
import Toast from 'react-native-toast-message';

const { height } = Dimensions.get('window');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const deviceColorScheme = useColorScheme();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleSplashComplete = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
              backgroundColor: deviceColorScheme === 'dark' ? '#000' : '#fff',
            },
          ]}
        >
          <SplashScreen onComplete={handleSplashComplete} />
        </Animated.View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
       <Toast />
      <View className="flex-1 bg-white dark:bg-black">
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
