import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {MainStackParamList} from '../../../types/navigation';

import {
  allPlans,
  operators,
  Plan,
  Operator,
} from '../../../data/Recharge/PlanData';
import PlanTypeToggle from '../../../components/molecules/recharge/PlanTypeToggle';
import PlanCard from '../../../components/molecules/recharge/PlanCard';
import RechargeBox from '../../../components/molecules/recharge/RechargeBox';

const PlansScreen = () => {  const route = useRoute<RouteProp<MainStackParamList, 'Plans'>>();
  
  useEffect(() => {
    if (route.params?.provider) {
      setSelectedOperator(route.params.provider);
    }
  }, [route.params?.provider]);

  const [selectedOperator, setSelectedOperator] = useState<Operator>('Jio');
  const [showEmiPlansOnly, setShowEmiPlansOnly] = useState(false);
  const glowAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showEmiPlansOnly) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [showEmiPlansOnly, glowAnim]);

  const currentPlans = allPlans[selectedOperator];
  const filteredPlans = showEmiPlansOnly
    ? currentPlans.filter((plan: Plan) => plan.emi)
    : currentPlans;

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView className="flex-1">
        <View className="p-4">
          <PlanTypeToggle
            showEmiPlansOnly={showEmiPlansOnly}
            setShowEmiPlansOnly={setShowEmiPlansOnly}
            glowAnim={glowAnim}
          />

          <RechargeBox />

          <View className="flex-row justify-between bg-foreground-light dark:bg-foreground-dark p-1 rounded-lg mb-4">
            {operators.map(op => (
              <TouchableOpacity
                key={op}
                className={`flex-1 py-2 rounded-lg items-center ${
                  selectedOperator === op ? 'bg-blue-600' : ''
                }`}
                onPress={() => setSelectedOperator(op)}>
                <Text
                  className={`font-medium ${
                    selectedOperator === op
                      ? 'text-white'
                      : 'text-text-light dark:text-text-dark'
                  }`}>
                  {op}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredPlans.map(
            (plan: Plan, index: React.Key | null | undefined) => (
              <PlanCard key={index} plan={plan} operator={selectedOperator} />
            ),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlansScreen;
