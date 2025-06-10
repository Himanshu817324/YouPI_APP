import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({navigation}: Props) {
  const {login} = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      await AsyncStorage.setItem('user', JSON.stringify({email}));
      await AsyncStorage.setItem('hasOnboarded', 'true');
      login({email});
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup failed', 'Something went wrong');
    }
  };

  const handleGuestSignup = async () => {
    try {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({email: 'guest@guest.com'}),
      );
      await AsyncStorage.setItem('hasOnboarded', 'true');
      login({email: 'guest@guest.com'});
    } catch (error) {
      console.error('Guest error:', error);
      Alert.alert('Guest login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignup} />

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>

      <Button title="Sign Up as a Guest user" onPress={handleGuestSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5},
  link: {marginTop: 15, color: 'blue', textAlign: 'center'},
});
