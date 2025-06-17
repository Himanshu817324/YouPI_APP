import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PaymentSummaryProps {
  planPrice: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ planPrice }) => {
  return (
    <View className="space-y-6 pt-8 border-t border-slate-700/50">
      <View className="bg-slate-800/50 p-6 rounded-2xl border border-slate-600/30">
        {/* Plan Amount */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white font-medium">Plan Amount:</Text>
          <Text className="text-white font-bold text-xl">{planPrice}</Text>
        </View>

        {/* Divider */}
        <View className="h-px bg-slate-600 mb-4" />

        {/* Total Amount */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2">
            <Ionicons name="trending-up-outline" size={20} color="#34D399" />
            <Text className="font-semibold ml-3 text-white">Total Amount:</Text>
          </View>
          <Text className="font-bold text-2xl text-emerald-200">{planPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentSummary;
