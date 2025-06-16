import React, {useState} from 'react';
import {View, Text, Switch, SafeAreaView, ScrollView} from 'react-native';
import {ToggleButton} from '../../../components/CustomToggle';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  payment: string;
  date: string;
}

const WalletScreen = () => {
  const [useForRecharge, setUseForRecharge] = useState(false);
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 50,
      description: 'Cashback from 3-month recharge',
      payment: '1/3',
      date: '2025-06-15'
    },
    {
      id: '2',
      type: 'credit',
      amount: 50,
      description: 'Referral bonus',
      payment: '2/3',
      date: '2025-06-14'
    },
    {
      id: '3',
      type: 'credit',
      amount: 40,
      description: 'Recharge payment',
      payment: '3/3',
      date: '2025-06-13'
    }
  ]);

  const renderTransactions = () => {
    if (transactions.length === 0) {
      return (
        <Text className="text-[#888] text-[16px] text-center">
          No transactions yet. Complete a recharge to earn cashback!
        </Text>
      );
    }

    return transactions.map(transaction => (
      <View key={transaction.id} className="bg-[#2f3130] rounded-2xl p-4 mb-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-[16px]">{transaction.description}</Text>
          <Text className={`text-[16px] ${transaction.type === 'credit' ? 'text-[#00D09C]' : 'text-red-500'}`}>
            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-gray-400 text-[14px]">{transaction.date}</Text>
          <Text className="text-gray-400 text-[14px]">Payment: {transaction.payment}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#e2f8f1] dark:bg-background-dark px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-[#00D09C] rounded-xl p-4 mt-4 mb-5">
          <Text className="text-white text-[20px]">NBFC Wallet Balance</Text>
          <Text className="text-white text-[28px] font-bold my-2">₹ 0.00</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-[16px]">Use for recharges</Text>
            <ToggleButton
              isOn={useForRecharge}
              onToggle={() => setUseForRecharge(prev => !prev)}
            />
          </View>
        </View>

        <View className="bg-[#1E1F29] rounded-lg p-4 mb-6">
          <Text className="text-white text-[22px] font-semibold mb-2">
            Transaction History
          </Text>
          {renderTransactions()}
        </View>

        

        <View className="bg-[#1E1F29] rounded-lg p-4 mb-6">
          <Text className="text-white text-[22px] font-semibold mb-2">
            How NBFC Wallet Works
          </Text>
          <Text className="text-gray-400 text-[16px] mb-2">
            • Receive ₹40-50 cashback when you purchase a 3-month recharge plan
          </Text>
          <Text className="text-gray-400 text-[16px]">
            • Use your wallet balance for future recharges
          </Text>
        </View>

        <View className="bg-[#1E1F29] rounded-lg p-4 mb-6">
          <Text className="text-white text-[22px] font-semibold mb-2">
            Cashback Offers
          </Text>
          <Text className="text-gray-400 text-[16px] mb-1">
            • upto 5% on 3-month plan
          </Text>
        </View>

        <View className="bg-[#1E1F29] rounded-lg p-4 mb-6">
          <Text className="text-white text-[22px] font-semibold mb-2">
            Need Help?
          </Text>
          <Text className="text-gray-400 text-[16px] mb-1">
            • How to earn cashback?
          </Text>
          <Text className="text-gray-400 text-[16px]">
            • Where to view full transaction history?
          </Text>
        </View>

        <View className="bg-[#00D09C] rounded-lg p-4 items-center mb-6">
          <Text className="text-white text-[22px] font-bold mb-1">
            Invite & Earn ₹50
          </Text>
          <Text className="text-white text-[16px] text-center">
            Get ₹50 in your wallet for every friend who signs up and recharges.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
