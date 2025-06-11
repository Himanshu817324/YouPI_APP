import React from 'react';
import { View, Image, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';

const { width } = Dimensions.get('window');
const DEFAULT_CIRCLE_SIZE = 140;
const CIRCLE_COLOR_LEFT = '#000';
const CIRCLE_COLOR_RIGHT = '#3ED3A3';
const LOGO_SOURCE = require('../../assets/black_logo.png');

interface LogoWithCirclesProps {
  circleSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const LogoWithCircles: React.FC<LogoWithCirclesProps> = ({
  circleSize = DEFAULT_CIRCLE_SIZE,
  containerStyle = {},
}) => {
  const overlap = circleSize * 0.25;
  const totalSpacing = circleSize - overlap;
  const centerX = width / 2;

  const blackCircleX = centerX - totalSpacing / 2 - circleSize / 2;
  const whiteCircleX = centerX + totalSpacing / 2 - circleSize / 2;
  const logoLeft = blackCircleX + (circleSize - 80) / 2;
  const logoTop = (circleSize - 80) / 2;

  return (
    <View style={[styles.circleArea, containerStyle, { height: circleSize, top: -circleSize / 2 }]}>
      <View
        style={[
          styles.circle,
          styles.blackCircle,
          {
            left: blackCircleX,
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          },
        ]}
      />
      <View
        style={[
          styles.circle,
          styles.greenCircle,
          {
            left: whiteCircleX,
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          },
        ]}
      />
      <Image
        source={LOGO_SOURCE}
        style={[
          styles.logo,
          {
            left: logoLeft,
            top: logoTop,
          },
        ]}
      />
    </View>
  );
};

export default LogoWithCircles;

const styles = StyleSheet.create({
  circleArea: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
    marginLeft: -20,
  },
  circle: {
    position: 'absolute',
  },
  blackCircle: {
    backgroundColor: CIRCLE_COLOR_LEFT,
  },
  greenCircle: {
    backgroundColor: CIRCLE_COLOR_RIGHT,
  },
  logo: {
    position: 'absolute',
    width: 80,
    height: 85,
    resizeMode: 'contain',
    zIndex: 2,
  },
});
