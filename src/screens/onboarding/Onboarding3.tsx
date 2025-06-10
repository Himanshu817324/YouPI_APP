import React, { useContext } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList, RootStackParamList } from '../../types/navigation';
import { AuthContext } from '../../context/AuthContext';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Onboarding3'>;

export default function Onboarding3({ navigation }: Props) {
  const { completeOnboarding } = useContext(AuthContext);

  const handleComplete = async (): Promise<void> => {
    await completeOnboarding();

    // ⛑️ Cast parent navigator to RootStackNavigationProp to use `replace`
    const parentNav = navigation.getParent() as NativeStackNavigationProp<RootStackParamList>;
    parentNav.replace('AuthStack', { screen: 'Login' });
  };

  return (
    <ImageBackground source={require('../../assets/images/onboarding3.png')} style={styles.bg}>
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Let's Get Started</Text>
        <Text style={styles.text}>Sign up or log in to start your journey.</Text>
        <Button title="Get Started" onPress={handleComplete} />
        <TouchableOpacity onPress={handleComplete}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  text: { fontSize: 16, color: '#fff', marginBottom: 20 },
  skip: { color: '#ccc', textAlign: 'center', marginTop: 10 },
});
