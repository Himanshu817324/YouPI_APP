import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface OfferCardProps {
  title: string;
  highlight: string;
  description: string;
  onPress: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ title, highlight, description, onPress }) => (
  <View className="bg-emerald-100 p-4 rounded-xl mr-4 w-64">
    <Text className="text-lg font-semibold text-gray-800">{title}</Text>
    <Text className="text-xl font-bold text-black mt-1">{highlight}</Text>
    <Text className="text-sm text-gray-600 mt-2">{description}</Text>
    <TouchableOpacity onPress={onPress} className="mt-3 bg-emerald-500 px-4 py-2 rounded-full">
      <Text className="text-white text-center">View Details</Text>
    </TouchableOpacity>
  </View>
);

export default OfferCard;
