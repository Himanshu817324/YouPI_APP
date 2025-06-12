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

interface OfferCardProps {
  colors: string[];
  title: string;
  highlight: string;
  description: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ colors, title, highlight, description }) => (
  <View style={[styles.offerCard, { backgroundColor: colors[0] }]}>
    <Text style={styles.offerTitle}>{title}</Text>
    <Text style={styles.offerHighlight}>{highlight}</Text>
    <Text style={styles.offerDesc}>{description}</Text>
    <TouchableOpacity style={styles.offerButton}>
      <Text style={styles.offerButtonText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

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
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Current Plans</Text>
          <TouchableOpacity><Text style={styles.link}>View all →</Text></TouchableOpacity>
        </View>

        <View style={styles.planCard}>
          <View style={[styles.greenLeftBorder]} />
          <View style={styles.planDetails}>
            <View style={styles.planTopRow}>
              <Text style={styles.planTitle}>Jio ₹349 Plan</Text>
              <Text style={styles.planEmi}>EMI 1/3</Text>
            </View>
            <Text style={styles.planInfo}>2GB/day | Unlimited calls</Text>
            <Text style={styles.planDate}>Exp: 20 Jun 2023</Text>
            <View style={styles.planBottomRow}>
              <Text style={styles.planPaid}>₹310 paid</Text>
              <Text style={styles.planNext}>Next: ₹310 on 20 May</Text>
            </View>
          </View>
        </View>

        <View style={styles.planCard}>
          <View style={styles.planDetails}>
            <View style={styles.planTopRow}>
              <Text style={styles.planTitle}>Airtel ₹199 Plan</Text>
              <Text style={styles.planEmi}>Fully paid</Text>
            </View>
            <Text style={styles.planInfo}>1GB/day | Unlimited calls</Text>
            <Text style={styles.planDate}>Exp: 5 Jun 2023</Text>
            <View style={styles.planBottomRow}>
              <Text style={styles.planPaid}>₹199</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Special Offers */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.sectionTitl}>Special Offers</Text>
          <TouchableOpacity><Text style={styles.link}>View all →</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <OfferCard
            colors={['#4276fa']}
            title="Jio Special"
            highlight="3 Months @ ₹900"
            description="2GB/day | 84 days | Get cashback in wallet!"
          />
          <OfferCard
            colors={['#e360e3']}
            title="Airtel"
            highlight="3 Months @ ₹1000"
            description="1.5GB/day | 90 days | Free OTT access!"
          />
        </ScrollView>
      </View>
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
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitl: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#00ffcc',
    fontSize: 14,
  },
  planCard: {
    backgroundColor: '#1B2039',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    padding: 12,
  },
  greenLeftBorder: {
    width: 4,
    backgroundColor: '#00ffcc',
    borderRadius: 4,
    marginRight: 10,
  },
  planDetails: {
    flex: 1,
  },
  planTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  planEmi: {
    color: 'gray',
    fontSize: 13,
  },
  planInfo: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 2,
  },
  planDate: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
  planBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  planPaid: {
    color: '#ffffff',
    fontWeight: '600',
  },
  planNext: {
    color: '#00ffcc',
    fontSize: 13,
  },
  offerCard: {
    width: 220,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  offerTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  offerHighlight: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 8,
  },
  offerDesc: {
    color: 'white',
    fontSize: 13,
    marginBottom: 12,
    opacity: 0.9,
  },
  offerButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
});
