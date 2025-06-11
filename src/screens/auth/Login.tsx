import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../../components/atoms/AppButton';
import LogoWithCircles from '../../components/atoms/LogoWithCircles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const [phNo, setPhNo] = useState('');

  const handleLogin = async () => {
  if (!phNo || phNo.length !== 10) {
    Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
    return;
  }

  try {
    await AsyncStorage.setItem('userPhone', phNo);
    await AsyncStorage.setItem('isLoggedIn', 'true');

    navigation.navigate('OTP', { phNo });
  } catch (error) {
    console.error('Login error:', error);
    Alert.alert('Login failed', 'Try again');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <LogoWithCircles circleSize={140} containerStyle={{marginTop: 10}} />

      <Text style={styles.title}>Log in</Text>
      <Text style={styles.subtitle}>Please add Your Mobile Number</Text>

      <View style={styles.inputRow}>
        <Text style={styles.countryCode}>+91 |</Text>
        <TextInput
          style={styles.input}
          placeholder="0000000000"
          value={phNo}
          onChangeText={text => {
            const cleaned = text.replace(/[^0-9]/g, '');
            setPhNo(cleaned);
          }}
          keyboardType="number-pad"
          maxLength={10}
        />
      </View>

      <AppButton
        title="Get OTP"
        style={styles.loginButton}
        onPress={handleLogin}
      />
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
    fontFamily: 'Sans Serif Collection',
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 50,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  countryCode: {
    fontSize: 18,
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: '#000',
  },
  loginButton: {
    marginHorizontal: 100,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#3ED3A3',
    fontWeight: '500',
  },
});
