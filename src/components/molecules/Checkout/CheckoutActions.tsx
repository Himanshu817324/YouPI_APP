import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CheckoutActionsProps {
  selectedPayment: string;
  isProcessing: boolean;
  onPayment: () => void;
}

const CheckoutActions: React.FC<CheckoutActionsProps> = ({
  selectedPayment,
  isProcessing,
  onPayment,
}) => {
  const navigation = useNavigation();

  const getPaymentMethodName = (method: string) => {
    const methodNames: Record<string, string> = {
      card: 'Card',
      wallet: 'Wallet',
      mobile: 'Mobile',
    };
    return methodNames[method] || 'Card';
  };

  const getPaymentIcon = (method: string) => {
    const icons: Record<string, React.ReactElement> = {
      card: <MaterialIcons name="credit-card" size={20} color="#fff" />,
      wallet: <Ionicons name="wallet" size={20} color="#fff" />,
      mobile: <Ionicons name="phone-portrait" size={20} color="#fff" />,
    };
    return icons[method] || <MaterialIcons name="credit-card" size={20} color="#fff" />;
  };

  return (
    <View className="space-y-4 pt-8">
      {/* Cancel Button */}
      <TouchableOpacity
        className="w-full py-4 border border-slate-600/50 rounded-xl items-center bg-transparent"
        onPress={() => navigation.navigate('Precheckout' as never)}
      >
        <Text className="text-lg font-medium text-slate-300">Cancel Payment</Text>
      </TouchableOpacity>

      {/* Payment Button */}
      <TouchableOpacity
        disabled={isProcessing}
        onPress={onPayment}
        className="w-full py-6 rounded-xl items-center bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl active:scale-[1.02]"
      >
        {isProcessing ? (
          <View className="flex-row items-center justify-center space-x-3">
            <ActivityIndicator color="#fff" size="small" />
            <Text className="text-white text-base font-semibold">Processing Payment...</Text>
          </View>
        ) : (
          <View className="flex-row items-center justify-center space-x-3">
            {getPaymentIcon(selectedPayment)}
            <Text className="text-white text-base font-bold">
              Pay with {getPaymentMethodName(selectedPayment)}
            </Text>
            <Ionicons name="shield-checkmark" size={20} color="#fff" />
          </View>
        )}
      </TouchableOpacity>

      {/* Footer */}
      <View className="flex-row items-center justify-center space-x-2 mt-4">
        <Ionicons name="shield-checkmark-outline" size={16} color="#94a3b8" />
        <Text className="text-sm text-slate-400">Secured by 256-bit SSL encryption</Text>
      </View>
    </View>
  );
};

export default CheckoutActions;
