import React, {useState} from 'react';
import {View, Text, Alert, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// import CheckoutHeader from '../../../components/molecules/Checkout/CheckoutHeader';
import PaymentMethod from '../../../components/molecules/Checkout/PaymentMethod';
import CashbackOffer from '../../../components/molecules/Checkout/CashbackOffer';
import PaymentSummary from '../../../components/molecules/Checkout/PaymentSummary';
import CheckoutActions from '../../../components/molecules/Checkout/CheckoutActions';
// import PlanFeatures from '../../../components/molecules/Checkout/PlanFeatures';

type CheckoutRouteParams = {
  selectedPlan: string;
  planDetails: {
    name: string;
    price: string;
    features: string[];
  };
};

const Checkout = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const {selectedPlan, planDetails} = (route.params ||
    {}) as CheckoutRouteParams;

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert('Payment Successful', 'Welcome to your new plan!', [
        {text: 'OK', onPress: () => navigation.navigate('Home')},
      ]);
    }, 2000);
  };

  if (!selectedPlan || !planDetails) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <View className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <Text className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-6">
            No plan selected
          </Text>
          <Text
            onPress={() => navigation.navigate('Middleware')}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-xl font-semibold text-white">
            Choose a Plan
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* <CheckoutHeader planName={planDetails.name} /> */}
      <ScrollView className="px-4 py-6" showsVerticalScrollIndicator={false}>
        <PaymentMethod
          selectedPayment={selectedPayment}
          onPaymentSelect={setSelectedPayment}
        />

        <View className="my-8 border-t border-slate-700/50 pt-8">
          <CashbackOffer />
        </View>

        <PaymentSummary planPrice={planDetails.price} />

        <CheckoutActions
          selectedPayment={selectedPayment}
          isProcessing={isProcessing}
          onPayment={handlePayment}
        />

        {/* <PlanFeatures features={planDetails.features} /> */}
      </ScrollView>
    </View>
  );
};

export default Checkout;
