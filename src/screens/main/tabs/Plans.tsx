import React, {useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import PlanTypeToggle from '../../../components/molecules/recharge/PlanTypeToggle';
import PlanCard from '../../../components/molecules/recharge/PlanCard';
import RechargeBox from '../../../components/molecules/recharge/RechargeBox';

const allPlans = {
  Jio: {
    monthly: [
      {
        name: 'Jio Basic',
        price: 349,
        validity: '28 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: ['JioTV', 'JioCinema'],
        color: '#4276fa',
      },
      {
        name: 'Jio Premium',
        price: 599,
        validity: '28 days',
        data: '3GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: ['JioTV', 'JioCinema', 'Disney+ Hotstar'],
        color: '#e360e3',
      },
    ],
    '3-month': [
      {
        name: 'Jio Value',
        price: 749,
        validity: '84 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: ['JioTV', 'JioCinema'],
        color: '#4276fa',
        emi: '₹250/month',
      },
      {
        name: 'Jio Premium Plus',
        price: 999,
        validity: '84 days',
        data: '3GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: ['JioTV', 'JioCinema', 'Disney+ Hotstar', 'Amazon Prime'],
        color: '#e360e3',
        emi: '₹333/month',
      },
    ],
  },
  Airtel: {
    monthly: [
      {
        name: 'Airtel Basic',
        price: 359,
        validity: '28 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: ['Airtel Xstream'],
        color: '#F44336',
      },
    ],
    '3-month': [
      {
        name: 'Airtel Max',
        price: 849,
        validity: '84 days',
        data: '2.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: ['Amazon Prime'],
        color: '#D32F2F',
        emi: '₹283/month',
      },
    ],
  },
  Vi: {
    monthly: [
      {
        name: 'Vi Value',
        price: 299,
        validity: '28 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: ['Vi Movies & TV'],
        color: '#9C27B0',
      },
    ],
    '3-month': [
      {
        name: 'Vi Super',
        price: 779,
        validity: '84 days',
        data: '2.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: ['Vi Movies & TV', 'Disney+ Hotstar'],
        color: '#7B1FA2',
        emi: '₹260/month',
      },
    ],
  },
  BSNL: {
    monthly: [
      {
        name: 'BSNL 429',
        price: 429,
        validity: '30 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: [],
        color: '#607D8B',
      },
    ],
    '3-month': [
      {
        name: 'BSNL 997',
        price: 997,
        validity: '90 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        ott: [],
        color: '#455A64',
        emi: '₹332/month',
      },
    ],
  },
};

const operators = ['Jio', 'Airtel', 'Vi', 'BSNL'] as const;

const PlansScreen = () => {
  const [planType, setPlanType] = useState<'monthly' | '3-month'>('monthly');
  const [selectedOperator, setSelectedOperator] =
    useState<(typeof operators)[number]>('Jio');

  const currentPlans = allPlans[selectedOperator][planType];

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">

           {/* Monthly / 3-Month Toggle */}
          <PlanTypeToggle planType={planType} setPlanType={setPlanType} />


          {/* Recharge Box */}
          <RechargeBox />

          {/* Operator Toggle */}
          <View className="flex-row justify-between bg-[#1e1f25] p-1 rounded-lg mb-4">
            {operators.map(op => (
              <TouchableOpacity
                key={op}
                className={`flex-1 py-2 rounded-lg items-center ${
                  selectedOperator === op ? 'bg-blue-600' : ''
                }`}
                onPress={() => setSelectedOperator(op)}>
                <Text
                  className={`font-medium ${
                    selectedOperator === op ? 'text-white' : 'text-gray-300'
                  }`}>
                  {op}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Plan Cards */}
          {currentPlans.map((plan, index) => (
            <PlanCard key={index} plan={plan} planType={planType} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlansScreen;
