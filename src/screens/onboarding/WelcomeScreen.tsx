import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WelcomeScreen'
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const {width} = Dimensions.get('window');
const CIRCLE_SIZE = 90;

export default function WelcomeScreen ({ navigation }: Props) {
  const overlap = CIRCLE_SIZE * 0.25;
  const totalSpacing = CIRCLE_SIZE - overlap;

  const centerX = width / 2;
  const blackCircleX = centerX - totalSpacing / 2 - CIRCLE_SIZE / 2;
  const whiteCircleX = centerX + totalSpacing / 2 - CIRCLE_SIZE / 2;

  const handleGetStarted = () => {
    navigation.navigate('OnboardingScreen');
  };

  return (
    <View style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={styles.circleArea}>
        <View
          style={[styles.circle, styles.blackCircle, {left: blackCircleX}]}
        />

        <View
          style={[
            styles.circle,
            {left: whiteCircleX, backgroundColor: '#3ED3A3'},
          ]}
        />

        <Image
          source={require('../../assets/black_logo.png')}
          style={[
            styles.logo,
            {
              left: blackCircleX + (CIRCLE_SIZE - 80) / 2,
            },
          ]}
        />
      </View>

      <Text style={[styles.title, {color: '#000'}]}>Welcome to</Text>
      <Text style={[styles.subtitle, {color: '#000'}]}>
        Your Best Money Transfer Partner
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.securedLine}>
          <Text style={[styles.securedText, {color: '#000'}]}>Secured by </Text>
          <Text style={[styles.securedBrand, {color: '#3ED3A3'}]}>You PI.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 240,
  },
  circleArea: {
    position: 'relative',
    width: '100%',
    height: CIRCLE_SIZE,
    marginBottom: 30,
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  blackCircle: {
    backgroundColor: '#000',
  },
  logo: {
    position: 'absolute',
    width: 80,
    height: 80,
    resizeMode: 'contain',
    top: (CIRCLE_SIZE - 80) / 2,
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#3ED3A3',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 19,
    elevation: 25,
    shadowColor: '#3ED3A3',
    shadowOffset: {
      width: 0,
      height: 75,
    },
    shadowOpacity: 1,
    shadowRadius: 400,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  securedLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securedText: {
    fontSize: 12,
  },
  securedBrand: {
    fontSize: 12,
    fontWeight: '500',
  },
});
