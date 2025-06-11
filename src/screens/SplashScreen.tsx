import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

const {width} = Dimensions.get('window');
const CIRCLE_SIZE = 90;

const SplashScreen = ({onComplete}: {onComplete: () => void}) => {
  const logoTranslateX = useRef(new Animated.Value(0)).current;
  const greenToWhite = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;
  const textColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoTranslateX, {
          toValue: totalSpacing,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(greenToWhite, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(bgColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(textColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setTimeout(onComplete, 2000);
      });
    }, 1000);
  }, []);

  const bgInterpolate = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#3ED3A3'],
  });

  const textInterpolate = textColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#ffffff'],
  });

  const circleColor = greenToWhite.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3ED3A3', '#ffffff'],
  });

  // X center of container
  const overlap = CIRCLE_SIZE * 0.25;
  const totalSpacing = CIRCLE_SIZE - overlap;

  const centerX = width / 2;
  const blackCircleX = centerX - totalSpacing / 2 - CIRCLE_SIZE / 2;
  const whiteCircleX = centerX + totalSpacing / 2 - CIRCLE_SIZE / 2;

  return (
    <Animated.View style={[styles.container, {backgroundColor: bgInterpolate}]}>
      <View style={styles.circleArea}>
        <View
          style={[styles.circle, styles.blackCircle, {left: blackCircleX}]}
        />

        <Animated.View
          style={[
            styles.circle,
            {left: whiteCircleX, backgroundColor: circleColor},
          ]}
        />

        <Animated.Image
          source={require('../assets/black_logo.png')}
          style={[
            styles.logo,
            {
              left: blackCircleX + (CIRCLE_SIZE - 80) / 2,
              transform: [{translateX: logoTranslateX}],
            },
          ]}
        />
      </View>

      <Animated.Text style={[styles.title, {color: textInterpolate}]}>
        You PI
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, {color: textInterpolate}]}>
        Your Best Money Transfer Partner
      </Animated.Text>
      <View style={styles.footer}>
        <View style={styles.securedLine}>
          <Animated.Text style={[styles.securedText, {color: textInterpolate}]}>
            Secured by{' '}
          </Animated.Text>
          <Animated.Text
            style={[styles.securedBrand, {color: textInterpolate}]}>
            You PI.
          </Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff', // or your desired background color
    position: 'absolute',
     paddingTop: 240,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    backgroundColor: '#3ED3A3',
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
    color: '#3ED3A3',
  },
  subtitle: {
    fontSize: 13,
    color: '#3ED3A3',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },

  securedBrandStatic: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3ED3A3',
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

export default SplashScreen;
