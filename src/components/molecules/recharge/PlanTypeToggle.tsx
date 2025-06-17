import React from 'react';
import {View, Text, Animated} from 'react-native';
import {BatteryToggle} from '../../../components/atoms/BatteryToggle';

interface PlanTypeToggleProps {
  showEmiPlansOnly: boolean;
  setShowEmiPlansOnly: (show: boolean) => void;
  glowAnim: Animated.Value;
}

const PlanTypeToggle: React.FC<PlanTypeToggleProps> = ({
  showEmiPlansOnly,
  setShowEmiPlansOnly,
  glowAnim,
}) => {
  return (
    <View className="bg-foreground-light dark:bg-foreground-dark rounded-2xl p-4 mb-5">
      <Text className="text-text-light dark:text-text-dark text-lg font-medium mb-3">
        Select Plan Type
      </Text>

      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-text-light dark:text-text-dark text-base font-medium">
            All Plans
          </Text>
          <Text className="text-slate-400 text-sm mt-1">
            Regular recharge plans
          </Text>
        </View>

        <View className="flex-row items-center gap-4">
          <View className="items-end">
            <Text className="text-text-light dark:text-text-dark text-base font-medium">
              YouPI Powered Plans
            </Text>
            <Text className="text-emerald-400 text-sm font-medium mt-1">
              Smart Saver available
            </Text>
          </View>
          {/* Smart Saver Toggle */}
          <BatteryToggle
            isOn={showEmiPlansOnly}
            onToggle={() => setShowEmiPlansOnly(!showEmiPlansOnly)}
            glowAnim={glowAnim}
          />
        </View>
      </View>
    </View>
  );
};

export default PlanTypeToggle;
