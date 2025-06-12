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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAuthStore } from './src/store/authStore';
import SplashScreen from './src/screens/SplashScreen';
import RootNavigator from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const { height } = Dimensions.get('window');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const slideAnim = useState(new Animated.Value(0))[0];
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    initializeAuth();
    // if (Platform.OS === 'android' && changeNavigationBarColor) {
    // try {
    //   changeNavigationBarColor('#202938', false);
    //   console.log('Navigation bar color set!');
    // } catch (err) {
    //   console.warn('Failed to set nav bar color', err);
    // }
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
      <View style={[styles.container, backgroundStyle]}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
