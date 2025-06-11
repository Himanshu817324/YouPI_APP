import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const {width} = Dimensions.get('window');

type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Easy, Fast & Trusted',
    description: 'Fast money transfer and gauranteed safe transactions with You PI.',
    image: require('../../assets/onboarding.png'),
  },
  {
    id: '2',
    title: 'Saving with You PI',
    description: 'Track the progress of your savings and start a habit of saving with You PI.',
    image: require('../../assets/onboarding2.png'),
  },
  {
    id: '3',
    title: 'Free You PI Transactions',
    description: 'Provides the quality of the financial system with free money transactions without any fees.',
    image: require('../../assets/onboarding3.png'),
  },
  {
    id: '4',
    title: 'Recharge Made You PI',
    description: 'Monthly or daily recharge at home in a site of You PI.',
    image: require('../../assets/onboarding4.png'),
  },
];

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const OnboardingScreen = ({navigation}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderItem = ({item}: {item: OnboardingItem}) => {
    // Helper function to highlight YouPI in text
    const highlightYouPI = (text: string) => {
      const parts = text.split(/(YouPI|You PI)/);
      return (
        <Text style={styles.title}>
          {parts.map((part, index) => 
            part === 'YouPI' || part === 'You PI' ? 
              <Text key={index} style={[styles.title, {color: '#3ED3A3'}]}>{part}</Text> : 
              part
          )}
        </Text>
      );
    };

    const highlightDescription = (text: string) => {
      const parts = text.split(/(YouPI|You PI)/);
      return (
        <Text style={styles.description}>
          {parts.map((part, index) => 
            part === 'YouPI' || part === 'You PI' ? 
              <Text key={index} style={[styles.description, {color: '#3ED3A3'}]}>{part}</Text> : 
              part
          )}
        </Text>
      );
    };

    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.titleContainer}>
          {highlightYouPI(item.title)}
        </View>
        {highlightDescription(item.description)}
      </View>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentSlide(Math.round(index));
  };

  const handleLogin = async() => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={item => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentSlide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
    marginVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 34,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#3ED3A3',
    width: 20,
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
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OnboardingScreen;