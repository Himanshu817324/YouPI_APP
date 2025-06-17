import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

interface Plan {
  name: string;
  price: number;
  validity: string;
  data: string;
  calls: string;
  sms: string;
  ott: string[];
  color: string;
  emi?: string;
}

const defaultPlan: Plan = {
  name: 'Plan Unavailable',
  price: 0,
  validity: 'N/A',
  data: 'N/A',
  calls: 'N/A',
  sms: 'N/A',
  ott: [],
  color: '#4276fa',
};

interface PlanCardProps {
  plan?: Plan;
  planType: 'monthly' | '3-month';
}

const PlanCard: React.FC<PlanCardProps> = ({ plan = defaultPlan, planType }) => {
  const navigation = useNavigation<StackNavigationProp<any>>(); // Update with your specific stack type

  const handlePress = () => {
    navigation.navigate('Precheckout', {
      selectedPlan: planType,
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
      <Text className="text-lg dark:text-background-light font-medium mb-3">
        {planType === 'monthly' ? 'Monthly Plans' : '3-Month Plans'}
      </Text>

      <View className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: plan.color }}>
        {/* Decorative Circle */}
        <View className="absolute -top-[50px] -right-[50px] w-[120px] h-[120px] rounded-full bg-white/10 z-0" />

        <View className="z-10">
          {/* Header */}
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-white font-bold text-xl">{plan.name}</Text>
              <Text className="text-white/70 text-sm mt-1">{plan.validity}</Text>
            </View>
            <View className="items-end">
              <Text className="text-white text-2xl font-bold">₹{plan.price}</Text>
              {plan.emi && <Text className="text-white/70 text-sm mt-1">({plan.emi})</Text>}
            </View>
          </View>

          {/* Plan Grid */}
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 bg-white/20 p-3 rounded-xl items-center mx-1">
              <Text className="text-white/70 text-sm">Data</Text>
              <Text className="text-white font-semibold text-sm mt-1">{plan.data}</Text>
            </View>
            <View className="flex-1 bg-white/20 p-3 rounded-xl items-center mx-1">
              <Text className="text-white/70 text-sm">Calls</Text>
              <Text className="text-white font-semibold text-sm mt-1">{plan.calls}</Text>
            </View>
            <View className="flex-1 bg-white/20 p-3 rounded-xl items-center mx-1">
              <Text className="text-white/70 text-sm">SMS</Text>
              <Text className="text-white font-semibold text-sm mt-1">{plan.sms}</Text>
            </View>
          </View>

          {/* OTT Section */}
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

          {/* EMI Note */}
          {planType === '3-month' && (
            <View className="bg-red-600/90 border border-red-600 rounded-lg p-3 mb-4 flex-row items-center gap-2">
              <Text className="text-white text-base">💳</Text>
              <Text className="text-white font-medium">Smart Saver Available</Text>
            </View>
          )}

          {/* Recharge Button */}
          <TouchableOpacity onPress={handlePress} className="bg-blue-600 py-3 rounded-lg items-center">
            <Text className="text-white font-semibold text-base">Recharge Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlanCard;
