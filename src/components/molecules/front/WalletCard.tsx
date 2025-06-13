import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { normalize } from '../../../utils/dimensions';

type WalletCardProps = {
  onWalletPress: () => void;
};

const WalletCard: React.FC<WalletCardProps> = ({ onWalletPress }) => (
  <View className="bg-[#00C39A] rounded-xl p-5 mt-4 mb-10">
    <Text className="text-[#E0FFF8] text-base">Total Balance</Text>
    <Text className="text-white text-4xl font-bold my-2">₹ 0.00</Text>
    <View className="flex-row justify-between mt-6 gap-4">
      <View className="flex-col justify-between">
        <Text className="text-white/80 text-lg">NBFC Wallet</Text>
        <View className="flex-row gap-4 mt-1">
          <TouchableOpacity onPress={onWalletPress}>
            <Text className="text-white text-lg">₹ 0.0</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-2 mt-2">
          <MaterialIcons name="history" size={normalize(18)} color="#fff" />
          <TouchableOpacity onPress={onWalletPress}>
            <Text className="text-white text-lg">History</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onWalletPress} className="self-center bg-green-400 border-2 border-white py-2 px-4 rounded">
        <Text className="text-white text-lg font-semibold text-center">View Wallet</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default WalletCard;