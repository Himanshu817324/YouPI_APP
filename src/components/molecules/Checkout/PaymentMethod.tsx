import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface PaymentMethodProps {
  selectedPayment: string;
  onPaymentSelect: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedPayment, onPaymentSelect }) => {

  const paymentMethods = [
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: 'wallet-outline',
      gradient: ['#10B98133', '#14B8A633'],
      border: 'border-emerald-500/50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      balance: '$0.00',
      status: 'Add funds to continue',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'card-outline',
      gradient: ['#3B82F633', '#6366F133'],
      border: 'border-blue-500/50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    {
      id: 'mobile',
      name: 'Mobile Payment',
      icon: 'phone-portrait-outline',
      gradient: ['#8B5CF633', '#EC489933'],
      border: 'border-purple-500/50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
  ];

  return (
    <View className="space-y-4">
      <Text className="text-lg font-semibold text-slate-200 mb-4">Choose Payment Method</Text>

      {paymentMethods.map((method, index) => {
        const isSelected = selectedPayment === method.id;

        return (
          <Animated.View
            entering={FadeInUp.delay(index * 100)}
            key={method.id}
          >
            <TouchableOpacity
              className={`
                relative p-5 rounded-2xl border transition-all duration-300
                ${isSelected
                  ? 'bg-emerald-800/20 border-emerald-500 shadow-lg'
                  : 'bg-slate-800/50 border-slate-600/50 active:bg-slate-700/50'
                }
              `}
              onPress={() => onPaymentSelect(method.id)}
              activeOpacity={0.9}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center space-x-4">
                  <View className={`p-3 rounded-xl shadow-lg ${isSelected ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                    <Ionicons name={method.icon as any} size={24} color="#fff" />
                  </View>
                  <View>
                    <Text className="text-white font-semibold">{method.name}</Text>
                    {method.id === 'wallet' && (
                      <Text className="text-emerald-400 font-bold text-sm mt-1">{method.balance}</Text>
                    )}
                  </View>
                </View>

                <View className={`w-6 h-6 rounded-full border-2 ${isSelected ? 'border-white bg-white' : 'border-slate-400'}`}>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                  )}
                </View>
              </View>

              {method.id === 'wallet' && method.status && (
                <View className="flex-row items-center mt-3 space-x-2">
                  <View className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  <Text className="text-sm text-slate-300">{method.status}</Text>
                </View>
              )}

              {isSelected && (
                <View className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none" />
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default PaymentMethod;
