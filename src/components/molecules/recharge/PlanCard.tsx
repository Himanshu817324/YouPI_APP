import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../types/navigation'; // adjust path
import { Plan, Operator, operatorColors } from '../../../data/Recharge/PlanData';

interface PlanCardProps {
  plan: Plan;
  operator: Operator;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, operator }) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const glowAnim = useRef(new Animated.Value(1)).current;

  // Get the color from the centralized operatorColors object
  const planColor = operatorColors[operator];

  useEffect(() => {
    if (plan.emi) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [plan.emi, glowAnim]);

  const handlePress = () => {
    navigation.navigate('Precheckout', {
      selectedPlan: plan.name,
      planDetails: {
        name: plan.name,
        price: plan.price.toString(),
        validity: plan.validity,
        data: plan.data,
        calls: plan.calls,
        sms: plan.sms,
        ott: plan.ott.join(', '),
      },
    });
  };

  return (
    <View className="mb-6">
      <View
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{ backgroundColor: planColor }}
      >
        <View className="absolute -top-[50px] -right-[50px] w-[120px] h-[120px] rounded-full bg-white/10 z-0" />

        <View className="z-10">
          <View className="flex-row justify-between mb-4">
            <View>
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-xl">
                  {plan.name}
                </Text>
                {plan.emi && (
                  <Animated.View
                    style={[
                      styles.glowingIcon,
                      { transform: [{ scale: glowAnim }] },
                    ]}
                  >
                    <Ionicons
                      name="battery-charging"
                      size={18}
                      color="#4ADE80"
                    />
                  </Animated.View>
                )}
              </View>
              <Text className="text-white/70 text-sm">{plan.validity}</Text>
            </View>
            <View className="items-end mb-4">
              <Text className="text-white text-2xl font-bold">
                ₹{plan.price}
              </Text>
              {plan.emi && (
                <Text className="text-white/70 text-sm mt-1">({plan.emi})</Text>
              )}
            </View>
          </View>

          <View className="flex-row justify-between mb-4">
            <View className="flex-1 bg-white/20 p-3 rounded-xl items-center mx-1">
              <Text className="text-white/70 text-sm">Data</Text>
              <Text className="text-white font-semibold text-sm mt-1">
                {plan.data}
              </Text>
            </View>
            <View className="flex-1 bg-white/20 p-3 rounded-xl items-center mx-1">
              <Text className="text-white/70 text-sm">Calls</Text>
              <Text className="text-white font-semibold text-sm mt-1">
                {plan.calls}
              </Text>
            </View>
            <View className="flex-1 bg-white/20 p-3 rounded-xl items-center mx-1">
              <Text className="text-white/70 text-sm">SMS</Text>
              <Text className="text-white font-semibold text-sm mt-1">
                {plan.sms}
              </Text>
            </View>
          </View>

          <View className="mb-3">
            <View className="flex-row items-center mb-1">
              <Text className="text-white/80 mr-2">▷</Text>
              <Text className="text-white font-medium">OTT Included:</Text>
            </View>
            <View className="flex-row flex-wrap">
              {plan.ott.map((service, idx) => (
                <Text
                  key={idx}
                  className="bg-white/20 text-white px-3 py-1 rounded-full text-xs mr-2 mb-2"
                >
                  {service}
                </Text>
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={handlePress}
            className="bg-white py-3 rounded-lg items-center"
          >
            <Text className="text-black font-semibold text-base">
              Recharge Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glowingIcon: {
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 10,
    marginLeft: 8,
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
});

export default PlanCard;
