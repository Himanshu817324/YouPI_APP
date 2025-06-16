import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';

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
    <View
      className="relative w-full -ml-5 mb-2"
      style={[
        containerStyle,
        {
          height: circleSize,
          top: -circleSize / 2,
        },
      ]}
    >
      <View
        className="absolute"
        style={{
          left: blackCircleX,
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: CIRCLE_COLOR_LEFT,
        }}
      />
      <View
        className="absolute"
        style={{
          left: whiteCircleX,
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: CIRCLE_COLOR_RIGHT,
        }}
      />
      <Image
        source={LOGO_SOURCE}
        className="absolute w-20 h-[85px]"
        style={{
          left: logoLeft,
          top: logoTop,
          resizeMode: 'contain',
          zIndex: 2,
        }}
      />
    </View>
  );
};

export default LogoWithCircles;
