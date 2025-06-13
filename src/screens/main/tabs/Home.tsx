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
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {wp, hp, normalize} from '../../../utils/dimensions';
import { MainStackParamList, TabStackParamList } from '../../../types/navigation';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<MainStackParamList>
>;

interface OfferCardProps {
  colors: string[];
  title: string;
  highlight: string;
  description: string;
  onPress: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({
  colors,
  title,
  highlight,
  description,
  onPress,
}) => (
  <View style={[styles.offerCard, {backgroundColor: colors[0]}]}>
    <Text style={styles.offerTitle}>{title}</Text>
    <Text style={styles.offerHighlight}>{highlight}</Text>
    <Text style={styles.offerDesc}>{description}</Text>
    <TouchableOpacity onPress={onPress} style={styles.offerButton}>
      <Text style={styles.offerButtonText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleWalletpress = () => {
    navigation.navigate('Wallet');
  };

  const handleOfferPress = () => {
    navigation.navigate('Plans');
  };

  const handleViewAllPress = () => {
    navigation.navigate('Plans');
  };

  const {width} = useWindowDimensions();
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
              <TouchableOpacity onPress={handleWalletpress}>
                <Text style={styles.Link}>₹ 0.0</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.HistoryRow}>
              <MaterialIcons name="history" size={normalize(18)} color="#fff" />
              <TouchableOpacity onPress={handleWalletpress}>
                <Text style={styles.Link}>History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={handleWalletpress} style={styles.walletBtn}>
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
        <View style={styles.currentPlans}>
          <Text style={styles.sectionTitle}>Current Plans</Text>
          <TouchableOpacity onPress={handleViewAllPress}> 
            <Text style={styles.viewAll}>View all →</Text>
          </TouchableOpacity>
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

      <View style={{height: hp(2)}} />
      {/* Special Offers */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <TouchableOpacity onPress={handleViewAllPress}>
            <Text style={styles.viewAll}>View all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <OfferCard
            colors={['#4276fa']}
            title="Jio Special"
            highlight="3 Months @ ₹900"
            description="2GB/day | 84 days | Get cashback in wallet!"
            onPress={handleOfferPress}
          />
          <OfferCard
            colors={['#e360e3']}
            title="Airtel"
            highlight="3 Months @ ₹1000"
            description="1.5GB/day | 90 days | Free OTT access!"
            onPress={handleOfferPress}
          />
          <OfferCard
            colors={['#F87D13']}
            title="Vi Special"
            highlight="3 Months @ ₹749"
            description="1.5GB/day | 84 days | Get cashback in wallet!"
            onPress={handleOfferPress}
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
    fontSize: normalize(20),
    fontWeight: '600',
    // marginBottom: hp(3),
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
    marginBottom: hp(3),

  },
  viewAll: {
    color: '#3ED3A3',
    fontSize: normalize(18),
    fontWeight: '600',
  },
  section: {
    marginBottom: hp(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  sectionTitl: {
    color: '#FFFFFF',
    fontSize: normalize(20),
    fontWeight: '600',
    // marginBottom: hp(3),
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
    paddingVertical: hp(2.3),
  },
  planTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),

  },
  planTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  planEmi: {
    color: 'gray',
    fontSize: 20,
  },
  planInfo: {
    color: '#bbb',
    fontSize: 18,
    marginTop: hp(0.5),
  },
  planDate: {
    color: '#666',
    fontSize: 16,
    marginTop: hp(0.5),
  },
  planBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  planPaid: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  planNext: {
    color: '#00ffcc',
    fontSize: 13,
  },
  offerCard: {
    width: wp(75),
    height: hp(24),
    borderRadius: 16,
    padding: 16,
    marginRight: wp(4),
    marginBottom: hp(2),
    shadowColor: '#fff',
    shadowOffset: {
      width: 14,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  offerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  offerHighlight: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    marginVertical: 8,
  },
  offerDesc: {
    color: 'white',
    fontSize: 18,
    marginBottom: hp(2.5),
    opacity: 0.9,
  },
  offerButton: {
    backgroundColor: 'white',
    bottom: 0,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    borderRadius: 8,
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
  },
});

