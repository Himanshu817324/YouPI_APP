import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Message */}
      <Text style={styles.greeting}>Welcome back, Sid!</Text>
      <Text style={styles.subtext}>Your telecom recharge dashboard</Text>

      {/* Wallet Card */}
      <View style={styles.walletCard}>
        <Text style={styles.cardTitle}>Total Balance</Text>
        <Text style={styles.amount}>₹ 0.00</Text>
        <View style={styles.walletRow}>
          <View style={styles.walletColumn}>
            <Text style={styles.walletLabel}>NBFC Wallet</Text>
            <View style={styles.walletBottomRow}>
              <TouchableOpacity>
                <Text style={styles.Link}>₹ 0.0</Text>
              </TouchableOpacity>
              <View style={styles.HistoryRow}>
                <MaterialIcons name="history" size={28} color="#fff" />
                <TouchableOpacity>
                  <Text style={styles.Link}>History</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.walletBtn}>
            <Text style={styles.walletBtnText}>View Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <ActionCard icon="call-outline" label="Recharge" />
        <ActionCard icon="card-outline" label="Pay EMI" />
        <ActionCard icon="wallet-outline" label="Wallet" />
      </View>

      {/* Current Plans */}
      <View style={styles.currentPlans}>
        <Text style={styles.sectionTitle}>Current Plans</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all →</Text>
        </TouchableOpacity>
      </View>

      {/* Optional Extra Content for Scroll Testing */}
      <View style={{height: 100}} />
    </ScrollView>
  );
};

const ActionCard = ({icon, label}: {icon: string; label: string}) => (
  <TouchableOpacity style={styles.actionCard}>
    <Ionicons name={icon} size={42} color="#3ED3A3" />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    padding: 20,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#B0B0B0',
    fontSize: 20,
    marginBottom: 20,
  },
  walletCard: {
    backgroundColor: '#00C39A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 60,
    marginTop: 20,
  },
  cardTitle: {
    color: '#E0FFF8',
    fontSize: 18,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  walletColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 15,
  },
  walletBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  walletLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 22,
  },
  Link: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  walletBtn: {
    alignSelf: 'center',
    backgroundColor: '#34D399',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 10,
  },
  walletBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  HistoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 25,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    backgroundColor: '#10193A',
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionLabel: {
    color: '#FFFFFF',
    marginTop: 25,
    fontSize: 18,
  },
  currentPlans: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    color: '#3ED3A3',
    fontSize: 14,
    fontWeight: '600',
  },
});
