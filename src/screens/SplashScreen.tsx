import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
} from 'react-native';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 90;

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const logoTranslateX = useRef(new Animated.Value(0)).current;
  const greenToWhite = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;
  const textColor = useRef(new Animated.Value(0)).current;

  const insets = useSafeAreaInsets();

  const overlap = CIRCLE_SIZE * 0.25;
  const totalSpacing = CIRCLE_SIZE - overlap;

  const centerX = width / 2;
  const blackCircleX = centerX - totalSpacing / 2 - CIRCLE_SIZE / 2;
  const whiteCircleX = centerX + totalSpacing / 2 - CIRCLE_SIZE / 2;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoTranslateX, {
          toValue: totalSpacing,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(greenToWhite, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(bgColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(textColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setTimeout(onComplete, 2000);
      });
    }, 1000);
  }, []);

  const bgInterpolate = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#3ED3A3'],
  });

  const textInterpolate = textColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#ffffff'],
  });

  const circleColor = greenToWhite.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3ED3A3', '#ffffff'],
  });

  return (
    <Animated.View
      className="absolute inset-0 items-center"
      style={{ backgroundColor: bgInterpolate, paddingTop: insets.top + 300 }}
    >
      {/* Circle Area */}
      <View className="relative w-full mb-6" style={{ height: CIRCLE_SIZE }}>
        <View
          className="absolute rounded-full bg-black"
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            left: blackCircleX,
          }}
        />
        <Animated.View
          className="absolute rounded-full"
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            left: whiteCircleX,
            backgroundColor: circleColor,
          }}
        />
        <Animated.Image
          source={require('../assets/black_logo.png')}
          className="absolute w-20 h-20"
          style={{
            top: (CIRCLE_SIZE - 80) / 2,
            left: blackCircleX + (CIRCLE_SIZE - 80) / 2,
            transform: [{ translateX: logoTranslateX }],
            resizeMode: 'contain',
            zIndex: 2,
          }}
        />
      </View>

      {/* Title and Subtitle */}
      <Animated.Text
        className="text-3xl font-bold mt-2"
        style={{ color: textInterpolate }}
      >
        You PI
      </Animated.Text>
      <Animated.Text
        className="text-xs mt-1"
        style={{ color: textInterpolate }}
      >
        Your Best Money Transfer Partner
      </Animated.Text>

      {/* Footer */}
      <View
        className="absolute bottom-10 w-full items-center"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="flex-row items-center">
          <Animated.Text
            className="text-xs"
            style={{ color: textInterpolate }}
          >
            Secured by{' '}
          </Animated.Text>
          <Animated.Text
            className="text-xs font-medium"
            style={{ color: textInterpolate }}
          >
            You PI.
          </Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default SplashScreen;
