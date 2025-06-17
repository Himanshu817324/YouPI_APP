import React from 'react';
import { View, Text } from 'react-native';
import { ToggleButton } from '../../atoms/CustomToggle';

interface Props {
  balance: number;
  useForRecharge: boolean;
  onToggle: () => void;
}

const WalletHeader = ({ balance, useForRecharge, onToggle }: Props) => (
  <View className="bg-primary-light dark:bg-primary-dark rounded-2xl p-4 mt-4 mb-5 shadow-md">
    <Text className="text-textWallet-secondary-light dark:text-textWallet-secondary-dark text-2xl font-semibold">NBFC Wallet Balance</Text>
    <Text className="text-textWallet-primary-light dark:text-textWallet-primary-dark text-5xl font-extrabold my-5">₹{balance.toFixed(1)}</Text>
    <View className="flex-row justify-between items-center">
      <Text className="text-textWallet-secondary-light dark:text-textWallet-secondary-dark text-xl font-semibold">Use for Recharge</Text>
      <ToggleButton isOn={useForRecharge} onToggle={onToggle} />
    </View>
  </View>
);

export default WalletHeader;
