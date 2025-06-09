// src/navigation/onboarding/OnboardingStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding1 from '../../screens/onboarding/Onboarding1';
import Onboarding2 from '../../screens/onboarding/Onboarding2';
import Onboarding3 from '../../screens/onboarding/Onboarding3';

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator initialRouteName="Onboarding1" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
    </Stack.Navigator>
  );
}
