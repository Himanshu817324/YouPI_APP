import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MiddlewareHeader from '../../../components/molecules/Precheckout/MiddlewareHeader';
import PreCheckoutNavigator from '../../../components/molecules/Precheckout/PreCheckoutNavigator';
import PlanCard from '../../../components/molecules/Precheckout/PlanCard';
import {SafeAreaView} from 'react-native-safe-area-context';

type PrecheckoutStackParamList = {
  Checkout: {
    selectedPlan: string;
    planDetails: {
      name: string;
      price: string;
    };
  };
};

const Precheckout = () => {
  const [activeTab, setActiveTab] = useState<'normal' | 'smart'>('normal');
  const navigation =
    useNavigation<NativeStackNavigationProp<PrecheckoutStackParamList>>();

  const plans = {
    normal: {
      name: 'Normal Plan',
      price: '₹349',
      period: '/month',
      description:
        'Basic plan for individuals',
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
      price: '₹295',
      period: '/month',
      originalPrice: '₹349',
      description:
        'Advanced plan',
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

      </ScrollView>
    </SafeAreaView>
  );
};

export default Precheckout;
