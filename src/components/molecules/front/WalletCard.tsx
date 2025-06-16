import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { normalize } from '../../../utils/dimensions';

type WalletCardProps = {
  onWalletPress: () => void;
};

const WalletCard: React.FC<WalletCardProps> = ({ onWalletPress }) => (
  <View className="bg-[#00C39A] rounded-xl p-5 py-10 mt-4 mb-10">
    <Text className="text-[#E0FFF8] text-xl">Total Balance</Text>
    <Text className="text-white text-5xl font-bold my-2">₹ 0.00</Text>
    <View className="flex-row justify-between mt-6 gap-4">
      <View className="flex-col justify-between">
        <Text className="text-white/80 text-2xl">NBFC Wallet</Text>
        <View  className="flex-row items-center gap-4 mt-1">
          <View className="flex-row gap-10 mt-1">
          <TouchableOpacity onPress={onWalletPress}>
            <Text className="text-white text-2xl">₹ 0.0</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-2 mt-2">
          <MaterialIcons name="history" size={normalize(18)} color="#fff" />
          <TouchableOpacity onPress={onWalletPress}>
            <Text className="text-white text-2xl">History</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
      <TouchableOpacity onPress={onWalletPress} className="self-center bg-green-400 border-2 border-white py-4 px-6 rounded">
        <Text className="text-white text-xl font-semibold text-center">View Wallet</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default WalletCard;
