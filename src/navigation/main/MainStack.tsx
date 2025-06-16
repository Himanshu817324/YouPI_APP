import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../types/navigation';

import TabNavigator from '../../screens/main/tabs/TabNavigator';
import ProfileScreen from '../../screens/main/common/Profile';
import Precheckout from '../../screens/main/common/Precheckout';
import Checkout from '../../screens/main/common/Checkout';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Precheckout" component={Precheckout} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}
