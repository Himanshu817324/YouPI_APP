// src/navigation/main/MainStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from '../../screens/main/tabs/TabNavigator';
// (If you have additional screens to push on top of tabs, import them here. Example:)
// import DetailsScreen from "../../screens/main/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      {/*
      <Stack.Screen name="Details" component={DetailsScreen} />
      */}
    </Stack.Navigator>
  );
}
