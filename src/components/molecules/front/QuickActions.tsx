import React from 'react';
import { View } from 'react-native';
import ActionCard from './ActionCard';

const QuickActions = () => (
  <View className="flex-row justify-between mb-6">
    <ActionCard icon="call-outline" label="Recharge" />
    <ActionCard icon="card-outline" label="Pay EMI" />
    <ActionCard icon="wallet-outline" label="Wallet" />
  </View>
);

export default QuickActions;
