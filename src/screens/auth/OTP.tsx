import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TextInput as RNTextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/atoms/AppButton';
import LogoWithCircles from '../../components/atoms/LogoWithCircles';
import { useAuthStore } from '../../store/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export default function OtpScreen({ route }: Props) {
  const { phNo } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<RNTextInput[]>([]);
  const { login } = useAuthStore();

  const handleVerify = async (enteredOtp?: string) => {
  const otpCode = enteredOtp ?? otp.join('');
  if (otpCode.length !== 4) {
    Alert.alert('Error', 'Please enter the full 4-digit OTP.');
    return;
  }

  try {
    await login({ phNo: Number(phNo) });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    Alert.alert('Verification Failed', 'Please try again.');
  }
};


  const handleChange = async (text: string, index: number) => {
  // ✅ Handle full OTP pasted
  if (text.length === 4 && /^\d{4}$/.test(text)) {
    const newOtp = text.split('');
    setOtp(newOtp);

    newOtp.forEach((val, idx) => {
      if (idx < 4) {
        inputRefs.current[idx]?.setNativeProps({ text: val });
      }
    });

    setTimeout(() => handleVerify(text), 300); // ✅ Pass pasted OTP directly
    return;
  }

  // ✅ Handle digit-by-digit input
  const updated = [...otp];
  updated[index] = text;
  setOtp(updated);

  if (text && index < otp.length - 1) {
    inputRefs.current[index + 1]?.focus();
  }

  if (updated.every(val => val.length === 1)) {
    setTimeout(() => handleVerify(updated.join('')), 300); // ✅ Pass freshly joined OTP
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <LogoWithCircles circleSize={140} containerStyle={{ marginTop: 10 }} />

      <Text style={styles.title}>
        Enter <Text style={styles.highlight}>YouPI</Text> OTP
      </Text>
      <Text style={styles.sentTo}>Sent To +91{phNo}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={styles.otpInput}
            maxLength={4}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
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

      <Text style={styles.resendText}>
        OTP not Sent, <Text style={styles.resendLink}>Resend OTP?</Text>
      </Text>

      <AppButton title="Verify" onPress={() => handleVerify()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2F8F1',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginTop: 20,
  },
  highlight: {
    color: '#3ED3A3',
  },
  sentTo: {
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#3ED3A3',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 8,
    textAlign: 'center',
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
  resendLink: {
    color: '#3ED3A3',
    fontWeight: '600',
  },
});
