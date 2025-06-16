// TabNavigator.tsx
import React from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';
import HomeScreen from './Home';
import WalletScreen from './Wallet';
import PlansScreen from './Plans';
import SettingScreen from './Settings';
import { wp, hp } from '../../../utils/dimensions';

const Tab = createBottomTabNavigator();

type TabRouteName = 'Home' | 'Wallet' | 'Plans' | 'Settings';

const ICONS: Record<TabRouteName, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Wallet: { active: 'wallet', inactive: 'wallet-outline' },
  Plans: { active: 'cellular', inactive: 'cellular-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
};

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type HomeHeaderRightProps = {
  navigation: BottomTabNavigationProp<any>;
};

const HomeHeaderRight = ({ navigation }: HomeHeaderRightProps) => (
  <View className="flex-row items-center gap-2 pr-4">
    <TouchableOpacity className="p-2 border border-[#3ED3A3] rounded-full">
      <Ionicons name="notifications-outline" size={24} color="#3ED3A3" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      className="p-2 border border-[#3ED3A3] rounded-full">
      <Ionicons name="person-outline" size={24} color="#3ED3A3" />
    </TouchableOpacity>
  </View>
);

const HomeHeaderLeft = () => (
  <TouchableOpacity className="ml-2 mr-2">
    <Image source={require('../../../assets/black_logo.png')} style={styles.logo} />
  </TouchableOpacity>
);

export default function TabNavigator() {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#12141C' : '#e2f8f1',
        },
        headerTitleStyle: {
          color: colorScheme === 'dark' ? '#fff' : '#000',
        },
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#12141C' : '#e2f8f1',
        },
        tabBarActiveTintColor: '#3ED3A3',
        tabBarIcon: ({ focused, color, size }) => {
          const { active, inactive } = ICONS[route.name as TabRouteName];
          const iconName = focused ? active : inactive;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'YouPI',
          headerLeft: HomeHeaderLeft,
          headerRight: () => <HomeHeaderRight navigation={navigation} />,
        })}
      />
      <Tab.Screen name="Plans" component={PlansScreen}
        options={({ navigation }) => ({
          headerTitle: 'Recharge Plans',
          headerLeft: HomeHeaderLeft,
          headerRight: () => <HomeHeaderRight navigation={navigation} />,
        })}
      />
      <Tab.Screen name="Wallet" component={WalletScreen}
        options={({ navigation }) => ({
          headerTitle: 'Wallet',
          headerLeft: HomeHeaderLeft,
          headerRight: () => <HomeHeaderRight navigation={navigation} />,
        })}
      />
      <Tab.Screen name="Settings" component={SettingScreen}
        options={({ navigation }) => ({
          headerTitle: 'Settings',
          headerLeft: HomeHeaderLeft,
          headerRight: () => <HomeHeaderRight navigation={navigation} />,
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: wp(10),
    height: hp(5),
    resizeMode: 'contain',
  },
});
