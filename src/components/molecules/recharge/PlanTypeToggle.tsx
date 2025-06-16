import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

interface PlanTypeToggleProps {
  planType: 'monthly' | '3-month';
  setPlanType: (type: 'monthly' | '3-month') => void;
}

const PlanTypeToggle: React.FC<PlanTypeToggleProps> = ({
  planType,
  setPlanType,
}) => {
  return (
    <View className="bg-slate-800 rounded-xl p-4 mb-5">
      <Text className="text-white text-lg font-medium mb-3">
        Select Plan Type
      </Text>

      <View className="flex-row justify-between items-center">
        {/* Left Text Section */}
        <View>
          <Text className="dark:text-background-dark text-base font-medium">Monthly Plans</Text>
          <Text className="text-slate-400 text-sm mt-1">Regular recharge plans</Text>
        </View>

        {/* Right Text + Toggle */}
        <View className="flex-row items-center">
          <View className="items-end mr-2">
            <Text className="text-white text-base font-medium">3-Month Plans</Text>
            <Text className="text-emerald-400 text-sm font-medium mt-1">Pay in parts available</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              setPlanType(planType === 'monthly' ? '3-month' : 'monthly')
            }
            activeOpacity={0.8}
            className="w-12 h-6 rounded-full bg-slate-600 justify-center"
          >
            <Animated.View
              className="absolute top-1 w-4 h-4 rounded-full bg-white"
              style={{
                transform: [
                  {
                    translateX: planType === '3-month' ? 24 : 4,
                  },
                ],
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlanTypeToggle;
