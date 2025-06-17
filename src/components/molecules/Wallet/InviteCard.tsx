import React from 'react';
import { View, Text } from 'react-native';

const InviteCard = () => (
  <View className="bg-primary-light dark:bg-primary-dark rounded-xl p-4 items-center mb-6">
    <Text className="text-text-light dark:text-text-dark text-3xl font-bold mb-1">Invite & Earn ₹50</Text>
    <Text className="text-textSecondary-light dark:text-textSecondary-dark text-lg text-center">
      Get ₹50 in your wallet for every friend who signs up and recharges.
    </Text>
  </View>
);

export default InviteCard;
