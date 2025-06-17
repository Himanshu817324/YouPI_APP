import React from 'react';
import {View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnboardingStackParamList} from '../../types/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../../components/atoms/AppButton';
import LogoWithCircles from '../../components/atoms/LogoWithCircles';

type WelcomeScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'WelcomeScreen'
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function WelcomeScreen({navigation}: Props) {
  const handleGetStarted = () => {
    navigation.navigate('OnboardingScreen');
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white pt-[250px]">
      <LogoWithCircles animation={false} secondCircleColor="#3ED3A3" />

      <Text className="text-5xl font-bold text-black">Welcome to</Text>
      <Text className="text-lg mt-1 text-black">
        Your Best Money Transfer Partner
      </Text>

      <View className="absolute bottom-[100px] w-full items-center">
        <AppButton
          title="Get Started"
          style={{
            paddingHorizontal: 60,
            borderRadius: 19,
            bottom: 30,
            elevation: 25,
            shadowColor: '#3ED3A3',
            shadowOffset: {
              width: 0,
              height: 75,
            },
            shadowOpacity: 1,
            shadowRadius: 400,
          }}
          onPress={handleGetStarted}
        />
      </View>

      <View className="absolute bottom-10 w-full items-center">
        <View className="flex-row items-center">
          <Text className="text-base">Secured by </Text>
          <Text className="text-base font-medium">You PI.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
