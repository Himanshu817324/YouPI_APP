import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {wp, hp, normalize} from '../../../utils/dimensions';

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
  const {width} = useWindowDimensions();

  // Adjust layout based on screen width
  const quickActionsStyle: ViewStyle = {
    ...styles.quickActions,
    flexWrap: width < 600 ? 'nowrap' : 'wrap',
  };

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
            </View>

            <View style={styles.HistoryRow}>
              <MaterialIcons name="history" size={normalize(18)} color="#fff" />
              <TouchableOpacity>
                <Text style={styles.Link}>History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.walletBtn}>
            <Text style={styles.walletBtnText}>View Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={quickActionsStyle}>
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

      {/* Optional Extra Content for Scroll Testing */}
      <View style={{height: hp(12)}} />
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
    <Ionicons
      name={icon}
      size={normalize(32)}
      color="#3ED3A3"
      style={styles.icons}
    />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default HomeScreen;

const styles = StyleSheet.create({
  icons: {
    backgroundColor: '#183638',
    padding: wp(2.5),
    borderRadius: wp(13),
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    padding: wp(5),
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: normalize(32),
    fontWeight: 'bold',
  },
  subtext: {
    color: '#B0B0B0',
    fontSize: normalize(20),
    marginBottom: hp(2.5),
  },
  walletCard: {
    backgroundColor: '#00C39A',
    borderRadius: wp(4),
    padding: wp(5),
    marginBottom: hp(7),
    marginTop: hp(2.5),
  },
  cardTitle: {
    color: '#E0FFF8',
    fontSize: normalize(18),
  },
  amount: {
    color: '#FFFFFF',
    fontSize: normalize(48),
    fontWeight: 'bold',
    marginVertical: hp(0.6),
  },
  walletColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
    gap: wp(3.5),
  },
  walletBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(3.5),
  },
  walletLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: normalize(18),
  },
  Link: {
    color: '#FFFFFF',
    fontSize: normalize(18),
  },
  walletBtn: {
    alignSelf: 'center',
    backgroundColor: '#34D399',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderRadius: wp(1.5),
    marginTop: hp(1.2),
  },
  walletBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(18),
    fontWeight: '600',
    textAlign: 'center',
  },
  HistoryRow: {
    flexDirection: 'row',
    gap: wp(1),
    alignItems: 'center',
    marginTop: hp(1.2),
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: normalize(24),
    fontWeight: '600',
    marginBottom: hp(3),
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(3.7),
  },
  actionCard: {
    backgroundColor: '#10193A',
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    borderRadius: wp(3),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: wp(1.2),
  },
  actionLabel: {
    color: '#FFFFFF',
    marginTop: hp(2),
    fontSize: normalize(16),
  },
  currentPlans: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    color: '#3ED3A3',
    fontSize: normalize(14),
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
