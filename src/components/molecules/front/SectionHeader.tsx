import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type SectionHeaderProps = {
  title: string;
  onPress?: () => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onPress }) => (
  <View className="flex-row justify-between items-center mb-2">
    <Text className="text-lg font-semibold">{title}</Text>
    {onPress && (
      <TouchableOpacity onPress={onPress}>
        <Text className="text-emerald-500 font-medium">View all →</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default SectionHeader;
