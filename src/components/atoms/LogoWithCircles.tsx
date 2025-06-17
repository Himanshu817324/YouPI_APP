import React from 'react';
import { View, Animated, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 90;
const LOGO_SIZE = 70;

interface LogoWithCirclesProps {
  animation?: Animated.Value | false;
  secondCircleColor?: string;
}

const LogoWithCircles = ({
  animation = false,
  secondCircleColor = '#ffffff',
}: LogoWithCirclesProps) => {
  const overlap = CIRCLE_SIZE * 0.25;
  const totalSpacing = CIRCLE_SIZE - overlap;

  const centerX = width / 2;
  const blackCircleX = centerX - totalSpacing / 2 - CIRCLE_SIZE / 2;
  const whiteCircleX = centerX + totalSpacing / 2 - CIRCLE_SIZE / 2;
  const logoOffset = (CIRCLE_SIZE - LOGO_SIZE) / 2;

  const isAnimated = animation instanceof Animated.Value;

  const logoTranslateX = isAnimated
    ? animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, totalSpacing],
      })
    : 0;

  const animatedStyle = isAnimated
    ? { transform: [{ translateX: logoTranslateX }] }
    : {};

  const backgroundColor = isAnimated
    ? animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#3ED3A3', '#ffffff'],
      })
    : secondCircleColor;

  return (
    <View className="relative w-full mb-6" style={{ height: CIRCLE_SIZE }}>
      <View
        className="absolute rounded-full bg-black"
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          left: blackCircleX,
        }}
      />

      {isAnimated ? (
        <Animated.View
          className="absolute rounded-full"
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            left: whiteCircleX,
            backgroundColor: backgroundColor,
          }}
        />
      ) : (
        <View
          className="absolute rounded-full"
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            left: whiteCircleX,
            backgroundColor: backgroundColor as string,
          }}
        />
      )}

      {isAnimated ? (
        <Animated.Image
          source={require('../../assets/black_logo.png')}
          style={[
            {
              width: LOGO_SIZE,
              height: LOGO_SIZE,
              top: logoOffset,
              left: blackCircleX + logoOffset - 4,
              position: 'absolute',
              resizeMode: 'contain',
              zIndex: 2,
            },
            animatedStyle,
          ]}
        />
      ) : (
        <Image
          source={require('../../assets/black_logo.png')}
          style={{
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            top: logoOffset,
            left: blackCircleX + logoOffset - 4,
            position: 'absolute',
            resizeMode: 'contain',
            zIndex: 2,
          }}
        />
      )}
    </View>
  );
};

export default LogoWithCircles;
