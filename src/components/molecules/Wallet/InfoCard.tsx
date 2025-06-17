import React from 'react';
import { View, Text } from 'react-native';

const InfoCard = ({ title, points }: { title: string; points: string[] }) => (
  <View className="bg-foreground-light dark:bg-foreground-dark rounded-2xl p-4 mb-6">
    <Text className="text-text-light dark:text-text-dark text-[22px] font-semibold mb-2">{title}</Text>
    {points.map((point, index) => (
      <Text key={index} className="text-subText-light dark:text-subText-dark text-[16px] mb-1">• {point}</Text>
    ))}
  </View>
);

export default InfoCard;
