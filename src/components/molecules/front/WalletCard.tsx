import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type WalletCardProps = {
  onPress: () => void;
};

const WalletCard = ({ onPress }: WalletCardProps) => (
  <View className="bg-background-primary rounded-3xl p-4 mb-5">
    <Text className="text-white text-3xl">Total Balance</Text>
    <Text className="text-white text-5xl font-bold mt-1">₹ 0.00</Text>

    <View className="flex-row justify-between items-center mt-4">
      <View>
        <Text className="text-white text-sm">NBFC Wallet</Text>
        <TouchableOpacity onPress={onPress}>
          <Text className="text-white text-base mt-1 underline">₹ 0.0</Text>
        </TouchableOpacity>

        <View className="flex-row items-center mt-2">
          <MaterialIcons name="history" size={18} color="#fff" />
          <TouchableOpacity onPress={onPress}>
            <Text className="text-white ml-1 underline">History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={onPress} className="bg-white px-4 py-2 rounded-full">
        <Text className="text-[#3ED3A3] font-semibold">View Wallet</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default WalletCard;
