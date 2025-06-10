import React from 'react';
import { Text, StyleSheet, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Onboarding1'>;

const Onboarding1: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../assets/images/onboarding1.png')} style={styles.bg}>
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Welcome to Our App</Text>
        <Text style={styles.text}>Learn new skills and manage your growth journey.</Text>

        <Button title="Next" onPress={() => navigation.navigate('Onboarding2')} />

        <TouchableOpacity onPress={() => navigation.getParent()?.navigate('AuthStack', { screen: 'Login' })}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  text: { fontSize: 16, color: '#fff', marginBottom: 20 },
  skip: { color: '#ccc', textAlign: 'center', marginTop: 10 },
});
