import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Home';
import WalletScreen from './Wallet';
import ActivityScreen from './Activity';
import ProfileScreen from './Profile';
import PlansScreen from './Plans';
import SettingScreen from './Settings';

const Tab = createBottomTabNavigator();

// Icon map
const ICONS: Record<string, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Wallet: { active: 'wallet', inactive: 'wallet-outline' },
  Plans: { active: 'cellular', inactive: 'cellular-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
};

const HomeHeaderRight = () => (
  <TouchableOpacity style={styles.Home}>
    <Ionicons name="notifications-outline" size={24} color="#3ED3A3" />
  </TouchableOpacity>
);

const PlansHeaderLeft = () => (
  <View style={styles.Plans}>
    <Ionicons name="list-outline" size={24} color="#3ED3A3" />
  </View>
);

const WalletHeaderRight = () => (
  <TouchableOpacity style={styles.Wallet}>
    <Ionicons name="add-circle-outline" size={24} color="#3ED3A3" />
  </TouchableOpacity>
);

const SettingsHeaderLeft = () => (
  <View style={styles.Settings}>
    <Ionicons name="person-circle-outline" size={24} color="#3ED3A3" />
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#3ED3A3',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          const icon = ICONS[route.name];
          const iconName = focused ? icon.active : icon.inactive;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Welcome Home',
          headerRight: HomeHeaderRight,
        }}
      />
      <Tab.Screen
        name="Plans"
        component={PlansScreen}
        options={{
          headerTitle: 'Explore Plans',
          headerLeft: PlansHeaderLeft,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerTitle: 'My Wallet',
          headerRight: WalletHeaderRight,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerTitle: 'App Settings',
          headerLeft: SettingsHeaderLeft,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  Home: {
    marginLeft: 15,
  },
  Plans: {
    marginLeft: 15,
  },
  Wallet: {
    marginLeft: 15,
  },
  Settings: {
    marginLeft: 15,
  },
});
