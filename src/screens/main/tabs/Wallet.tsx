import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const WalletScreen = () => {
  const [useForRecharge, setUseForRecharge] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>NBFC Wallet Balance</Text>
        <Text style={styles.balance}>₹ 0.00</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Use for recharges</Text>
          <Switch
            value={useForRecharge}
            onValueChange={setUseForRecharge}
            thumbColor={useForRecharge ? '#00D09C' : '#888'}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Transaction History</Text>
      <View style={styles.historyBox}>
        <Text style={styles.historyText}>
          No transactions yet. Complete a recharge to earn cashback!
        </Text>
      </View>


      <View style={styles.howItWorksBox}>
        <Text style={styles.sectionTitle}>How NBFC Wallet Works</Text>
        <Text style={styles.bullet}>• Receive ₹40-50 cashback when you purchase a 3-month recharge plan</Text>
        <Text style={styles.bullet}>• Use your wallet balance for future recharges</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12141C',
    padding: 16,
  },
  header: {
    color: 'white',
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#00D09C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    color: 'white',
    fontSize: 14,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '600',
  },
  historyBox: {
    backgroundColor: '#1E1F29',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  historyText: {
    color: '#888',
    fontSize: 18,
    textAlign: 'center',
  },
  howItWorksBox: {
    backgroundColor: '#1E1F29',
    borderRadius: 10,
    padding: 16,
  },
  bullet: {
    color: 'gray',
    fontSize: 18,
    marginBottom: 8,
  },
});

export default WalletScreen;
