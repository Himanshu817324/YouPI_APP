// components/OfferCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { wp, hp, normalize } from '../../../utils/dimensions';

type OfferCardProps = {
  colors: string[];
  title: string;
  highlight: string;
  description: string;
  onPress: () => void;
};

const OfferCard: React.FC<OfferCardProps> = ({ colors, title, highlight, description, onPress }) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate responsive dimensions
  const getCardWidth = () => {
    if (screenWidth >= 1024) { // Large devices (tablets, desktops)
      return wp(30);
    } else if (screenWidth >= 768) { // Medium devices (tablets)
      return wp(45);
    }
    return wp(75); // Small devices (phones)
  };

  const getCardHeight = () => {
    if (screenWidth >= 1024) {
      return hp(25);
    } else if (screenWidth >= 768) {
      return hp(22);
    }
    return hp(20);
  };

  const getFontSizes = () => {
    if (screenWidth >= 1024) {
      return {
        title: normalize(24),
        highlight: normalize(28),
        description: normalize(18),
        button: normalize(16),
      };
    } else if (screenWidth >= 768) {
      return {
        title: normalize(22),
        highlight: normalize(26),
        description: normalize(16),
        button: normalize(14),
      };
    }
    return {
      title: normalize(20),
      highlight: normalize(24),
      description: normalize(14),
      button: normalize(12),
    };
  };

  const fontSizes = getFontSizes();

  return (
    <View
      className="rounded-xl p-4 mr-4 mb-4"
      style={{
        backgroundColor: colors[0],
        width: getCardWidth(),
        height: getCardHeight(),
      }}
    >
      <Text style={{ fontSize: fontSizes.title }} className="text-white font-bold">{title}</Text>
      <Text style={{ fontSize: fontSizes.highlight }} className="text-white font-extrabold my-2">{highlight}</Text>
      <Text style={{ fontSize: fontSizes.description }} className="text-white opacity-90 mb-4">{description}</Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-white py-2 px-4 rounded-md items-center mt-auto"
      >
        <Text style={{ fontSize: fontSizes.button }} className="text-slate-800 font-semibold">
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OfferCard;
