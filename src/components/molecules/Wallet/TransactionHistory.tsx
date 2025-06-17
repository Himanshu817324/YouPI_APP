import React from 'react';
import { View, Text } from 'react-native';
import TransactionItem from './TransactionItem';
import { Transaction } from '../../../types/Transaction';

const TransactionHistory = ({ transactions }: { transactions: Transaction[] }) => (
  <View className="bg-primaryBackground-light dark:bg-primaryBackground-dark rounded-xl p-4 mb-6">
    <Text className="text-text-light dark:text-text-dark text-[22px] font-semibold mb-2">Transaction History</Text>
    {transactions.length === 0 ? (
      <Text className="text-subTitle-light dark:text-subTitle-dark text-[16px] text-center">
        No transactions yet. Complete a recharge to earn cashback!
      </Text>
    ) : (
      transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))
    )}
  </View>
);

export default TransactionHistory;
