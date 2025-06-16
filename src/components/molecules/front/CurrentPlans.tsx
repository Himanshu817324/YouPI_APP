import React from 'react';
import { View, Text } from 'react-native';

interface Plan {
  title: string;
  status: string;
  details: string;
  expiry: string;
  paid: string;
  next?: string;
}

const PlanCard = ({ plan }: { plan: Plan }) => (
  <View className="bg-foreground-light dark:bg-foreground-dark rounded-2xl flex-row p-3 mb-3">
    <View className="w-1 bg-[#00ffcc] rounded mr-3" />
    <View className="flex-1 py-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-text-light dark:text-text-dark text-xl font-semibold">{plan.title}</Text>
        <Text className="text-subText-light dark:text-text-dark text-xl">{plan.status}</Text>
      </View>
      <Text className="text-textMuted-light dark:text-textMuted-dark text-lg">{plan.details}</Text>
      <Text className="text-subTitle-light dark:text-subTitle-dark text-base">Exp: {plan.expiry}</Text>
      <View className="flex-row justify-between mt-1">
        <Text className="text-white text-base font-semibold">{plan.paid}</Text>
        {plan.next && <Text className="text-[#00ffcc] text-sm">{plan.next}</Text>}
      </View>
    </View>
  </View>
);

export default PlanCard;
