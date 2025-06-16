import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../types/navigation';
import AppButton from '../../components/atoms/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<OnboardingStackParamList, 'OnboardingScreen'>;

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Easy, Fast & Trusted',
    description: 'Fast money transfer and guaranteed safe transactions with You PI.',
    image: require('../../assets/onboarding.png'),
  },
  {
    id: '2',
    title: 'Saving with You PI',
    description: 'Track the progress of your savings and start a habit of saving with You PI.',
    image: require('../../assets/onboarding2.png'),
  },
  {
    id: '3',
    title: 'Free You PI Transactions',
    description: 'Provides the quality of the financial system with free money transactions without any fees.',
    image: require('../../assets/onboarding3.png'),
  },
  {
    id: '4',
    title: 'Recharge Made You PI',
    description: 'Monthly or daily recharge at home in a site of You PI.',
    image: require('../../assets/onboarding4.png'),
  },
];

export default function OnboardingScreen({}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    const highlightText = (text: string, baseStyle: string) => {
      const parts = text.split(/(YouPI|You PI)/);
      return (
        <Text className={baseStyle}>
          {parts.map((part, index) =>
            part === 'YouPI' || part === 'You PI' ? (
              <Text key={index} className={`${baseStyle} text-[#3ED3A3]`}>
                {part}
              </Text>
            ) : (
              part
            )
          )}
        </Text>
      );
    };

    return (
      <View className="w-full items-center px-5" style={{ width }}>
        <Image source={item.image} className="w-5/5 h-3/5 my-1" resizeMode="contain" />
        <View className="flex-row flex-wrap justify-center items-center mb-2">
          {highlightText(item.title, 'text-3xl font-bold text-center text-black')}
        </View>
        {highlightText(item.description, 'text-xl text-center text-gray-500 px-5 leading-8')}
      </View>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentSlide(Math.round(index));
  };

  const handleLogin = async () => {
    try {
      await useAuthStore.getState().completeOnboarding();
    } catch (e) {
      console.error('Onboarding Completion Error:', e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />

      <View className="absolute bottom-[50px] left-0 right-0 items-center">
        <View className="flex-row mb-5">
          {onboardingData.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                index === currentSlide ? 'w-5 bg-[#3ED3A3]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </View>

        <AppButton
          title="Login"
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
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
}
