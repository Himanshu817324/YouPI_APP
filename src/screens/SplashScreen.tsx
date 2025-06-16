import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoWithCircles from '../components/LogoWithCircles';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const sharedAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(sharedAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setTimeout(onComplete, 2000);
    });
  }, []);

  const bgInterpolate = sharedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#3ED3A3'],
  });

  const textInterpolate = sharedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#ffffff'],
  });

  return (
    <Animated.View
      className="absolute inset-0 items-center"
      style={{ backgroundColor: bgInterpolate, paddingTop: insets.top + 250 }}
    >
      <LogoWithCircles animation={sharedAnim} />

      <Animated.Text className="text-5xl font-bold mt-2" style={{ color: textInterpolate }}>
        You PI
      </Animated.Text>
      <Animated.Text className="text-lg mt-1" style={{ color: textInterpolate }}>
        Your Best Money Transfer Partner
      </Animated.Text>

      <View className="absolute bottom-10 w-full items-center" style={{ paddingBottom: insets.bottom }}>
        <View className="flex-row items-center">
          <Animated.Text className="text-base" style={{ color: textInterpolate }}>
            Secured by{' '}
          </Animated.Text>
          <Animated.Text className="text-base font-medium" style={{ color: textInterpolate }}>
            You PI.
          </Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default SplashScreen;
