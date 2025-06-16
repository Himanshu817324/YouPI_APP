import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface CheckoutHeaderProps {
  planName: string;
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ planName }) => {
  const navigation = useNavigation();

  return (
    <View className="relative">
      {/* Main Background Gradient */}
      <LinearGradient
        colors={['#0f172aF2', '#1e293bF2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-6 py-5 border-b border-slate-700/50"
      >
        {/* Light Background Effect */}
        <LinearGradient
          colors={['rgba(59,130,246,0.1)', 'rgba(147,51,234,0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="absolute inset-0 rounded-xl"
        />

        <View className="relative z-10 flex-row items-center justify-between">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Middleware' as never)}
            className="p-3 rounded-xl bg-white/10 active:opacity-80"
          >
            <Ionicons name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>

          {/* Title Section */}
          <View className="items-center">
            <Text className="text-xl font-bold text-white">Recharge Plan</Text>
            <Text className="text-sm text-slate-400 font-medium">{planName}</Text>
          </View>

          {/* Close Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Middleware' as never)}
            className="p-3 rounded-xl bg-white/10 active:opacity-80"
          >
            <Ionicons name="close" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CheckoutHeader;
