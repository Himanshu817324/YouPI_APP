import React from 'react';
import { ScrollView, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainStackParamList, TabStackParamList } from '../../../types/navigation';
import WalletCard from '../../../components/molecules/front/WalletCard';
import ActionCard from '../../../components/molecules/front/ActionCard';
import PlanCard from '../../../components/molecules/front/CurrentPlans';
import OfferCard from '../../../components/molecules/front/OfferCard';

const HomeScreen = () => {
  const navigation = useNavigation<
    CompositeNavigationProp<
      BottomTabNavigationProp<TabStackParamList, 'Home'>,
      NativeStackNavigationProp<MainStackParamList>
    >
  >();
  const { width } = useWindowDimensions();

  const handleWalletpress = () => navigation.navigate('Wallet');
  const handleOfferPress = () => navigation.navigate('Plans');
  const handleViewAllPress = () => navigation.navigate('Plans');

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark px-5 pt-4" showsVerticalScrollIndicator={false}>
      <Text className="text-background-dark dark:text-background-light text-dark text-3xl font-bold">Welcome back, Sid!</Text>
      <Text className="text-gray-400 text-xl mb-6">Your telecom recharge dashboard</Text>

      <WalletCard onWalletPress={handleWalletpress} />

      <Text className="text-background-dark dark:text-background-light text-xl font-semibold">Quick Actions</Text>
      <View className={`flex-row justify-between mb-8 ${width < 600 ? '' : 'flex-wrap'}`}>
        <ActionCard icon="call-outline" label="Recharge" />
        <ActionCard icon="card-outline" label="Pay in Parts" />
        <ActionCard icon="wallet-outline" label="Wallet" />
      </View>

      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-background-dark dark:text-background-light text-xl font-semibold">Current Plans</Text>
          <TouchableOpacity onPress={handleViewAllPress}>
            <Text className="text-green-400 text-lg font-semibold">View all →</Text>
          </TouchableOpacity>
        </View>
        <PlanCard
          plan={{
            title: 'Jio ₹349 Plan',
            status: 'PIP 1/3',
            details: '2GB/day | Unlimited calls',
            expiry: 'Exp: 20 Jun 2023',
            paid: '₹310 paid',
            next: 'Next: ₹310 on 20 May'
          }}
        />
        <PlanCard
          plan={{
            title: 'Airtel ₹199 Plan',
            status: 'Fully paid',
            details: '1GB/day | Unlimited calls',
            expiry: 'Exp: 5 Jun 2023',
            paid: '₹199'
          }}
        />
      </View>

      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-background-dark dark:text-background-light text-xl font-semibold">Special Offers</Text>
          <TouchableOpacity onPress={handleViewAllPress}>
            <Text className="text-green-400 text-lg font-semibold">View all →</Text>
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

export default HomeScreen;
