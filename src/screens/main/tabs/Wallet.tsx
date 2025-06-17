import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import WalletHeader from '../../../components/molecules/Wallet/WalletHeader';
import TransactionHistory from '../../../components/molecules/Wallet/TransactionHistory';
import InfoCard from '../../../components/molecules/Wallet/InfoCard';
import InviteCard from '../../../components/molecules/Wallet/InviteCard';
import { Transaction } from '../../../types/Transaction';

const WalletScreen = () => {
  const [useForRecharge, setUseForRecharge] = useState(false);

  const [transactions, _setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 50,
      description: 'Cashback from 3-month recharge',
      payment: '1/3',
      date: '2025-06-15',
    },
    {
      id: '2',
      type: 'credit',
      amount: 50,
      description: 'Referral bonus',
      payment: '2/3',
      date: '2025-06-14',
    },
    {
      id: '3',
      type: 'credit',
      amount: 40,
      description: 'Recharge payment',
      payment: '3/3',
      date: '2025-06-13',
    },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <WalletHeader
          balance={0.0}
          useForRecharge={useForRecharge}
          onToggle={() => setUseForRecharge(prev => !prev)}
        />

        <TransactionHistory transactions={transactions} />

        <InfoCard
          title="How NBFC Wallet Works"
          points={[
            'Receive ₹40-50 cashback when you purchase a 3-month recharge plan',
            'Use your wallet balance for future recharges',
          ]}
        />

        <InfoCard title="Cashback Offers" points={['upto 5% on 3-month plan']} />

        <InfoCard
          title="Need Help?"
          points={['How to earn cashback?', 'Where to view full transaction history?']}
        />

        <InviteCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
