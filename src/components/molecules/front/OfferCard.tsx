// components/OfferCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { wp, hp } from '../../../utils/dimensions';

type OfferCardProps = {
  colors: string[];
  title: string;
  highlight: string;
  description: string;
  onPress: () => void;
};

const OfferCard: React.FC<OfferCardProps> = ({ colors, title, highlight, description, onPress }) => (
  <View className="rounded-xl p-4 mr-4 mb-4" style={{ backgroundColor: colors[0], width: wp(75), height: hp(20) }}>
    <Text className="text-white text-2xl font-bold">{title}</Text>
    <Text className="text-white text-3xl font-extrabold my-2">{highlight}</Text>
    <Text className="text-white text-xl opacity-90 mb-4">{description}</Text>
    <TouchableOpacity onPress={onPress} className="bg-white py-2 px-4 rounded-md items-center">
      <Text className="text-slate-800 font-semibold text-lg">View Details</Text>
    </TouchableOpacity>
  </View>
);

export default OfferCard;
