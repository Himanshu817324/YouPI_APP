import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../../types/navigation';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Onboarding2'>;

export default function Onboarding2({navigation}: Props) {
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding2.png')}
      style={styles.bg}>
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Track Your Progress</Text>
        <Text style={styles.text}>
          Visualize your improvements over time with our tools.
        </Text>

        {/* Navigate to Onboarding3 inside same stack */}
        <Button
          title="Next"
          onPress={() => navigation.navigate('Onboarding3')}
        />

        {/* Replace stack with AuthStack's Login screen */}
        <TouchableOpacity
          onPress={() =>
            navigation.getParent()?.navigate('AuthStack', {screen: 'Login'})
          }>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {flex: 1, justifyContent: 'flex-end'},
  overlay: {backgroundColor: 'rgba(0,0,0,0.5)', padding: 30},
  title: {fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10},
  text: {fontSize: 16, color: '#fff', marginBottom: 20},
  skip: {color: '#ccc', textAlign: 'center', marginTop: 10},
});
