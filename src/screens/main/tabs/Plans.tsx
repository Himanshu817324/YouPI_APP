import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import PlanTypeToggle from '../../../components/molecules/recharge/PlanTypeToggle';
import OperatorSelector from '../../../components/molecules/recharge/OperatorSelector';
import PlanCard from '../../../components/molecules/recharge/PlanCard';
import TabNavigator from '../tabs/TabNavigator';
const PlansScreen = () => {
  const [planType, setPlanType] = useState<'monthly' | '3-month'>('monthly');
  const [selectedOperator, setSelectedOperator] = useState<'jio' | 'airtel' | 'vi'>('jio');

  const plans = {
    monthly: {
      jio: {
        name: 'Jio Basic',
        price: 239,
        validity: '28 days',
        data: '1.5GB/day',
        calls: 'Unlimited calls',
        sms: '100/day',
        ott: ['JioCinema Premium'],
        color: 'linear-gradient(135deg, #2563eb, #1e40af)',
      },
      airtel: {
        name: 'Airtel Smart',
        price: 299,
        validity: '28 days',
        data: '2GB/day',
        calls: 'Unlimited calls',
        sms: '100/day',
        ott: ['Disney+ Hotstar Mobile', 'Airtel Xstream'],
        color: 'linear-gradient(135deg, #dc2626, #991b1b)',
      },
      vi: {
        name: 'Vi RedX',
        price: 319,
        validity: '28 days',
        data: '2.5GB/day',
        calls: 'Unlimited calls',
        sms: '100/day',
        ott: ['Vi Movies & TV'],
        color: 'linear-gradient(135deg, #9333ea, #6b21a8)',
      },
    },
    '3-month': {
      jio: {
        name: 'Jio 3-Month Value',
        price: 719,
        validity: '84 days',
        data: '2GB/day',
        calls: 'Unlimited calls',
        sms: '100/day',
        ott: ['JioCinema Premium', 'JioSaavn Pro'],
        color: 'linear-gradient(135deg, #2563eb, #1e40af)',
        emi: '₹240/month normally',
      },
      airtel: {
        name: 'Airtel 3-Month Smart',
        price: 839,
        validity: '84 days',
        data: '2GB/day',
        calls: 'Unlimited calls',
        sms: '100/day',
        ott: ['Disney+ Hotstar Mobile', 'Airtel Xstream'],
        color: 'linear-gradient(135deg, #dc2626, #991b1b)',
        emi: '₹280/month normally',
      },
      vi: {
        name: 'Vi 3-Month RedX',
        price: 899,
        validity: '84 days',
        data: '3GB/day',
        calls: 'Unlimited calls',
        sms: '100/day',
        ott: ['Vi Movies & TV', 'Netflix Mobile'],
        color: 'linear-gradient(135deg, #9333ea, #6b21a8)',
        emi: '₹300/month normally',
      },
    },
  };

  const currentPlan = plans[planType][selectedOperator];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn}>
            <ArrowLeft color="#fff" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Recharge</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PlanTypeToggle planType={planType} setPlanType={setPlanType} />
        <OperatorSelector
          selectedOperator={selectedOperator}
          setSelectedOperator={setSelectedOperator}
        />
        <PlanCard plan={currentPlan} planType={planType} />
      </ScrollView>

      <TabNavigator /> {/* Or use a placeholder View if not implemented */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', // bg-slate-900
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1e293b', // bg-slate-800
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#334155', // border-slate-700
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    padding: 8,
    marginRight: 12,
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  backText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
});

export default PlansScreen;
