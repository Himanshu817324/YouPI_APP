// TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';
import WalletScreen from './Wallet';
import PlansScreen from './Plans';
import SettingScreen from './Settings';

const Tab = createBottomTabNavigator();

// 🔹 Icon name mapping
const ICONS: Record<string, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Wallet: { active: 'wallet', inactive: 'wallet-outline' },
  Plans: { active: 'cellular', inactive: 'cellular-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
};

const TabNavigator = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            const icon = ICONS[route.name];
            const iconName = focused ? icon?.active : icon?.inactive;
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plans" component={PlansScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
  );
};

export default TabNavigator;
