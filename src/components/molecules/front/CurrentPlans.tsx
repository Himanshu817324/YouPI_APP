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
  <View className="bg-[#1B2039] rounded-xl flex-row p-3 mb-3">
    <View className="w-1 bg-[#00ffcc] rounded mr-3" />
    <View className="flex-1 py-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-white text-lg font-bold">{plan.title}</Text>
        <Text className="text-gray-400 text-lg">{plan.status}</Text>
      </View>
      <Text className="text-gray-300 text-base">{plan.details}</Text>
      <Text className="text-gray-500 text-sm">Exp: {plan.expiry}</Text>
      <View className="flex-row justify-between mt-1">
        <Text className="text-white text-base font-semibold">{plan.paid}</Text>
        {plan.next && <Text className="text-[#00ffcc] text-sm">{plan.next}</Text>}
      </View>
    </View>
  </View>
);

export default PlanCard;