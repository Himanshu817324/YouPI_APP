import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PlanFeaturesProps {
  features: string[];
}

const PlanFeatures: React.FC<PlanFeaturesProps> = ({ features }) => {
  return (
    <View className="mt-8 p-6 bg-slate-800/40 rounded-2xl border border-slate-600/30">
      {/* Header */}
      <View className="flex-row items-center space-x-2 mb-6">
        <Ionicons name="star" size={24} color="#FACC15" />
        <Text className="font-bold text-xl text-white">Plan Benefits</Text>
      </View>

      {/* Feature list */}
      <View className="space-y-4">
        {features.slice(0, 4).map((feature, index) => (
          <View
            key={index}
            className="flex-row items-center space-x-3 p-3 bg-slate-700/30 rounded-xl"
            style={{
              transform: [{ translateX: 0 }],
              opacity: 1,
              // Optional: animation setup placeholder
              // In React Native, you'd typically use Reanimated or Animated API
            }}
          >
            <View className="p-1 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
              <Ionicons name="checkmark-circle" size={16} color="white" />
            </View>
            <Text className="text-slate-200 font-medium flex-1">{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PlanFeatures;
