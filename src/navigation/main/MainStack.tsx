import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'nativewind';
import type {MainStackParamList} from '../../types/navigation';

import TabNavigator from '../../screens/main/tabs/TabNavigator';
import ProfileScreen from '../../screens/main/common/Profile';
import Precheckout from '../../screens/main/common/Precheckout';
import Checkout from '../../screens/main/common/Checkout';
import NotificationScreen from '../../screens/main/common/Notification';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  const {colorScheme} = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#12141C' : '#e2f8f1',
        },
        headerTitleStyle: {
          color: colorScheme === 'dark' ? '#fff' : '#000',
        },
      }}>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Precheckout"
        component={Precheckout}
        options={{
          title: 'Plan Details',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          title: 'Payment',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'Notifications',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
