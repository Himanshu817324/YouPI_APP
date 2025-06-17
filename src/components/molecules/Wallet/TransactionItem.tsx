import React from 'react';
import { View, Text } from 'react-native';
import { Transaction } from '../../../types/Transaction';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
  <View className="bg-secondary-light dark:bg-secondary-dark rounded-xl p-4 mb-2">
    <View className="flex-row justify-between items-center">
      <Text className="text-text-light dark:text-text-dark text-[16px]">{transaction.description}</Text>
      <Text className={`text-[16px] ${transaction.type === 'credit' ? 'text-primary-dark' : 'text-warning-light'}`}>
        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
      </Text>
    </View>
    <View className="flex-row justify-between items-center mt-2">
      <Text className="text-textMuted-light dark:text-textMuted-dark text-[14px]">{transaction.date}</Text>
      <Text className="text-subText-light dark:text-subText-dark text-[14px]">Payment: {transaction.payment}</Text>
    </View>
  </View>
);

export default TransactionItem;
