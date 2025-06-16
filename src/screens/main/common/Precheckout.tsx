import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import MiddlewareHeader from '../../../components/molecules/Precheckout/MiddlewareHeader';
import PreCheckoutNavigator from '../../../components/molecules/Precheckout/PreCheckoutNavigator';
import PlanCard from '../../../components/molecules/Precheckout/PlanCard';
import ComparisonTable from '../../../components/molecules/Precheckout/ComparisionTable';
import {SafeAreaView} from 'react-native-safe-area-context';
// FIX: Update the path below if the file exists elsewhere, or create the file if missing.

type PrecheckoutStackParamList = {
  Checkout: {
    selectedPlan: string;
    planDetails: {
      name: string;
      price: string;
      // add other properties if needed
    };
  };
  // add other screens if needed
};

const Precheckout = () => {
  const [activeTab, setActiveTab] = useState<'normal' | 'smart'>('normal');
  const navigation =
    useNavigation<NativeStackNavigationProp<PrecheckoutStackParamList>>();

  const plans = {
    normal: {
      name: 'Normal Plan',
      price: '$29',
      period: '/month',
      description:
        'Perfect for getting started with essential middleware features',
      features: [
        'Basic API Gateway',
        'Standard Security',
        'Email Support',
        '99.9% Uptime SLA',
        'Basic Analytics',
        'Up to 10K requests/month',
      ],
      color: 'from-blue-500 to-blue-600',
      icon: 'shield-checkmark-outline',
    },
    smart: {
      name: 'Smart Saver',
      price: '$19',
      period: '/month',
      originalPrice: '$29',
      description:
        'Advanced middleware with intelligent optimization and premium support',
      features: [
        'Advanced API Gateway',
        'AI-Powered Security',
        'Priority Support',
        '99.99% Uptime SLA',
        'Advanced Analytics',
        'Up to 100K requests/month',
        'Auto-scaling',
        'Custom Integrations',
      ],
      color: 'from-purple-500 to-pink-500',
      icon: 'flash-outline',
      popular: true,
    },
  };

  const handleBuyNow = (planType: string) => {
    navigation.navigate('Checkout', {
      selectedPlan: planType,
      planDetails: plans[planType as keyof typeof plans],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 px-4 py-6">
        <MiddlewareHeader />
        <PreCheckoutNavigator
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <View className="mb-6">
          <PlanCard
            plan={plans[activeTab]}
            planKey={activeTab}
            isActive={true}
            onBuyNow={handleBuyNow}
          />
        </View>

        <ComparisonTable activeTab={activeTab} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Precheckout;
