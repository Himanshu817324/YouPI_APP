import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../../components/atoms/AppButton';
import LogoWithCircles from '../../components/LogoWithCircles';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const [phNo, setPhNo] = useState('');

  const handleLogin = async () => {
    if (!phNo || phNo.length !== 10) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid 10-digit mobile number',
      });
      return;
    }

    try {
      await AsyncStorage.setItem('userPhone', phNo);
      await AsyncStorage.setItem('isLoggedIn', 'true');

      Toast.show({
        type: 'success',
        text1: 'OTP sent',
        text2: 'Redirecting to OTP screen...',
      });

      navigation.navigate('OTP', {phNo});
    } catch (error) {
      console.error('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Please try again later.',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-[#E2F8F1]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="items-center">
        <LogoWithCircles animation={false} secondCircleColor="#3ED3A3" />

        <Text className="text-[40px] font-bold text-center text-black leading-[50px] mt-4">
          Log in
        </Text>
        <Text className="text-lg text-gray-500 text-center mb-5">
          Please Enter Your Mobile Number
        </Text>

        <View className="flex-row items-center bg-white rounded-xl border border-gray-300 px-3 py-2 mb-6 w-[80%]">
          <Text className="text-lg text-black">+91 |</Text>
          <TextInput
            className="flex-1 text-lg text-black px-4 py-2"
            placeholder="9934567890"
            value={phNo}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={text => {
              const cleaned = text.replace(/[^0-9]/g, '');
              setPhNo(cleaned);
            }}
          />
        </View>

        <AppButton
          title="Get OTP"
          style={{
            paddingHorizontal: 90,
            paddingVertical: 16,
            borderRadius: 20,
            backgroundColor: '#3ED3A3',
          }}
          onPress={handleLogin}
        />
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}
