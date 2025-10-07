import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TextInput as RNTextInput,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../../components/atoms/AppButton';
import LogoWithCircles from '../../components/atoms/LogoWithCircles';
import Toast from 'react-native-toast-message';
import { authInstance as auth } from '../../config/firebase';
import { PhoneAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { useAuthStore } from '../../store/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export default function OtpScreen({route, navigation}: Props) {
  const {phNo, verificationId} = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<RNTextInput[]>([]);
  const {loginWithBackendAfterOTP} = useAuthStore();

  const handleVerify = async (enteredOtp?: string) => {
    const otpCode = enteredOtp ?? otp.join('');
    if (otpCode.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter the full 6-digit OTP',
      });

      return;
    }

    try {
      setLoading(true);

      // Create credential with verification ID and OTP
      const credential = PhoneAuthProvider.credential(verificationId, otpCode);

      // Sign in with the credential
      const userCredential = await signInWithCredential(auth, credential);

      console.log('User signed in:', userCredential.user.uid);

      // Check if user exists in backend and handle accordingly
      const result = await loginWithBackendAfterOTP(userCredential.user.uid, phNo);
      
      console.log('OTP Verification Result:', result);

      if (result.isNewUser) {
        // User doesn't exist, RootNavigator will show Profile screen automatically
        Toast.show({
          type: 'info',
          text1: 'OTP Verified!',
          text2: 'Please complete your profile.',
        });

        // Navigation will be handled by RootNavigator based on auth state
        // RootNavigator will detect firebaseUser exists but isLoggedIn is false
        // and automatically show Profile screen
      } else {
        // User exists, they are now logged in
        Toast.show({
          type: 'success',
          text1: 'Welcome Back!',
          text2: 'You have successfully logged in.',
        });

        // Navigation will be handled by RootNavigator based on auth state
      }
    } catch (error: any) {
      console.error('OTP Verification Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: error.message || 'Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (text: string, index: number) => {
    if (text.length === 6 && /^\d{6}$/.test(text)) {
      const newOtp = text.split('');
      setOtp(newOtp);
      newOtp.forEach((val, idx) => {
        inputRefs.current[idx]?.setNativeProps({text: val});
      });
      setTimeout(() => handleVerify(text), 300);
      return;
    }

    const cleaned = text.replace(/[^0-9]/g, '');
    const updated = [...otp];
    updated[index] = cleaned;
    setOtp(updated);

    if (cleaned && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (updated.every(val => val.length === 1)) {
      setTimeout(() => handleVerify(updated.join('')), 300);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E2F8F1] justify-center">
      <View className="items-center mb-6">
        <LogoWithCircles animation={false} secondCircleColor="#3ED3A3" />
      </View>

      <Text className="text-4xl font-bold text-center text-black mt-4">
        Enter <Text className="text-[#3ED3A3]">YouPI</Text> OTP
      </Text>
      <Text className="text-center text-lg text-gray-600 mt-1">
        Sent To +91{phNo}
      </Text>

      <View className="flex-row justify-center my-6 gap-3">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => {
              if (ref) {
                inputRefs.current[index] = ref;
              }
            }}
            className="w-10 h-12 rounded-lg bg-[#3ED3A3] text-white text-xl font-bold text-center"
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({nativeEvent}) => {
              if (
                nativeEvent.key === 'Backspace' &&
                otp[index] === '' &&
                index > 0
              ) {
                const updated = [...otp];
                updated[index - 1] = '';
                setOtp(updated);
                inputRefs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      <Text className="text-center text-lg text-black mb-5">
        OTP not Sent,{' '}
        <Text className="text-[#3ED3A3] font-semibold">Resend OTP?</Text>
      </Text>

      <AppButton
        title={loading ? 'Verifying...' : 'Verify'}
        onPress={() => handleVerify()}
        style={{
          width: '70%',
          alignSelf: 'center',
          backgroundColor: loading ? '#ccc' : '#3ED3A3',
        }}
      />
    </SafeAreaView>
  );
}
