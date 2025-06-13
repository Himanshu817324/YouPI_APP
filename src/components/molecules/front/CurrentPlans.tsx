import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CurrentPlansProps = {
  onViewAll: () => void;
};

const CurrentPlans = ({ onViewAll }: CurrentPlansProps) => (
  <View className="mb-6">
    <View className="flex-row justify-between items-center mb-2">
      <Text className="text-lg font-semibold">Current Plans</Text>
      <TouchableOpacity onPress={onViewAll}>
        <Text className="text-emerald-500 font-medium">View all →</Text>
      </TouchableOpacity>
    </View>

    <View className="bg-white rounded-xl p-4 shadow flex-row mb-3">
      <View className="w-1 bg-emerald-500 rounded-full mr-4" />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-gray-800">Jio ₹349 Plan</Text>
          <Text className="text-sm text-gray-500">EMI 1/3</Text>
        </View>
        <Text className="text-gray-600 text-sm mt-1">2GB/day | Unlimited calls</Text>
        <Text className="text-gray-400 text-xs mt-1">Exp: 20 Jun 2023</Text>
        <View className="flex-row justify-between mt-2">
          <Text className="text-sm text-emerald-600">₹310 paid</Text>
          <Text className="text-sm text-gray-500">Next: ₹310 on 20 May</Text>
        </View>
      </View>
    </View>
  </View>
);

export default CurrentPlans;
