import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnboardingStackParamList} from '../../types/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import LogoWithCircles from '../../components/atoms/LogoWithCircles';
import AppButton from '../../components/atoms/AppButton';

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
    <SafeAreaView style={styles.container}>
      <LogoWithCircles circleSize={100} containerStyle={styles.logoContainer} />

      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.subtitle}>Your Best Money Transfer Partner</Text>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Get Started"
          style={styles.loginButton}
          onPress={handleGetStarted}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.securedLine}>
          <Text style={styles.securedText}>Secured by </Text>
          <Text style={styles.securedBrand}>You PI.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 240,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    color: '#000',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
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
  },
  footer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
  },
  securedLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securedText: {
    fontSize: 12,
    color: '#000',
  },
  securedBrand: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3ED3A3',
  },
});
