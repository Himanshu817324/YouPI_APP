import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CashbackOffer: React.FC = () => {
  return (
    <View className="relative p-6 rounded-2xl border bg-teal-900 border-emerald-500/30 bg-gradient-to-r from-emerald-900/40 via-emerald-800/40 to-teal-800/40 overflow-hidden shadow-xl">

      {/* Background gradients */}
      <View className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 animate-pulse" />
      <View className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full -translate-y-16 translate-x-16" />
      <View className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/10 rounded-full translate-y-12 -translate-x-12" />

      {/* Content */}
      <View className="relative z-10 flex-row items-center space-x-4">
        <View className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
          <Ionicons name="gift" size={28} color="#ffffff" />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center space-x-2 mb-1">
            <Text className="font-bold text-emerald-300 text-lg">Get $5 Cashback!</Text>
            <FontAwesome5 name="sparkles" size={16} color="#00D09C" />
          </View>
          <Text className="text-sm text-text-dark dark:text-text-dark">
            Automatically credited to your wallet after payment
          </Text>
        </View>
      </View>

      {/* Optional shimmer effect (add animation if needed) */}
      <View className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
    </View>
  );
};

export default CashbackOffer;
