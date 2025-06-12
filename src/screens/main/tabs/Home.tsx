import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name="home-outline" size={40} color="blue" />
      <Text>Home Tab</Text>
    </View>
  );
};

export default HomeScreen;
