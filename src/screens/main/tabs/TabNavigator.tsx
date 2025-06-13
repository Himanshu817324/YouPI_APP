import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Home';
import WalletScreen from './Wallet';
import PlansScreen from './Plans';
import SettingScreen from './Settings';
// import LogoWithCircles from '../../../components/atoms/LogoWithCircles';

const Tab = createBottomTabNavigator();

// Icon map
const ICONS: Record<string, {active: string; inactive: string}> = {
  Home: {active: 'home', inactive: 'home-outline'},
  Wallet: {active: 'wallet', inactive: 'wallet-outline'},
  Plans: {active: 'cellular', inactive: 'cellular-outline'},
  Settings: {active: 'settings', inactive: 'settings-outline'},
};

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';
import { wp,hp } from '../../../utils/dimensions';

type HomeHeaderRightProps = {
  navigation: BottomTabNavigationProp<ParamListBase>;
};

const HomeHeaderRight = ({navigation}: HomeHeaderRightProps) => (
  <View style={styles.HomeHeader}>
    <TouchableOpacity style={styles.Notification}>
      <Ionicons name="notifications-outline" size={24} color="#3ED3A3" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {navigation.navigate('Profile')}} style={styles.Profile}>
      <Ionicons name="person-outline" size={24} color="#3ED3A3" />
    </TouchableOpacity>
  </View>
);

const HomeHeaderLeft = () => (
  <TouchableOpacity style={styles.Home}>
    <Image source={require('../../../assets/black_logo.png')} style={styles.Logo} />
  </TouchableOpacity>
);

// const PlansHeaderLeft = () => (
//   <View style={styles.Plans}>
//     <Ionicons name="list-outline" size={24} color="#3ED3A3" />
//   </View>
// );

// const WalletHeaderRight = () => (
//   <TouchableOpacity style={styles.Wallet}>
//     <Ionicons name="add-circle-outline" size={24} color="#3ED3A3" />
//   </TouchableOpacity>
// );

// const SettingsHeaderLeft = () => (
//   <View style={styles.Settings}>
//     <Ionicons name="person-circle-outline" size={24} color="#3ED3A3" />
//   </View>
// );

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        tabBarActiveTintColor: '#3ED3A3',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          const icon = ICONS[route.name];
          const iconName = focused ? icon.active : icon.inactive;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'YouPI',
          headerTitleStyle: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#202938',
          },
          tabBarStyle: {
            backgroundColor: '#202938',
          },
          headerRight: () => <HomeHeaderRight navigation={navigation} />,
          headerLeft: HomeHeaderLeft,
        })}
      />
      <Tab.Screen
        name="Plans"
        component={PlansScreen}
        options={({ navigation }) => ({
          headerTitle: 'Plans',
          headerTitleStyle: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#202938',
          },
          tabBarStyle: {
            backgroundColor: '#202938',
          },
          headerRight: () => <HomeHeaderRight navigation={navigation} />,
          headerLeft: HomeHeaderLeft,
        })}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ navigation }) => ({
          headerTitle: 'Wallet',
          headerTitleStyle: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#202938',
          },
          tabBarStyle: {
            backgroundColor: '#202938',
          },
          headerRight: () => <HomeHeaderRight navigation={navigation} />,
          headerLeft: HomeHeaderLeft,
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={({ navigation }) => ({
          headerTitle: 'Settings',
          headerTitleStyle: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#202938',
          },
          tabBarStyle: {
            backgroundColor: '#202938',
          },
          headerRight: () => <HomeHeaderRight navigation={navigation} />,
          headerLeft: HomeHeaderLeft,
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  Logo: {
    width: wp(10),
    height:  hp(5),
    // marginLeft: wp(-2),
    // marginRight: wp(0),
  },
  HomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  Home: {
    marginLeft: wp(2),
    marginRight: wp(2),
    borderColor: '#3ED3A3',
  },
  Notification: {
    marginLeft:wp(2),
    padding: 10,
    borderWidth: 1,
    borderColor: '#3ED3A3',
    borderRadius: 50,
    backgroundColor: '#202938',
    shadowColor: '#3ED3A3',
    shadowOffset: {width: 10, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Profile: {
     marginLeft:wp(2),
    padding: 10,
    borderWidth: 1,
    borderColor: '#3ED3A3',
    borderRadius: 50,
    backgroundColor: '#202938',
  },
});
