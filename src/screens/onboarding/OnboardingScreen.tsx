import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useAuthStore} from '../../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../../types/navigation';
import AppButton from '../../components/atoms/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

type Props = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingScreen'
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
    description:
      'Fast money transfer and guaranteed safe transactions with You PI.',
    image: require('../../assets/onboarding.png'),
  },
  {
    id: '2',
    title: 'Saving with You PI',
    description:
      'Track the progress of your savings and start a habit of saving with You PI.',
    image: require('../../assets/onboarding2.png'),
  },
  {
    id: '3',
    title: 'Free You PI Transactions',
    description:
      'Provides the quality of the financial system with free money transactions without any fees.',
    image: require('../../assets/onboarding3.png'),
  },
  {
    id: '4',
    title: 'Recharge Made You PI',
    description: 'Monthly or daily recharge at home in a site of You PI.',
    image: require('../../assets/onboarding4.png'),
  },
];

export default function OnboardingScreen({}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderItem = ({item}: {item: OnboardingItem}) => {
    const highlightText = (text: string, style: any) => {
      const parts = text.split(/(YouPI|You PI)/);
      return (
        <Text style={style}>
          {parts.map((part, index) =>
            part === 'YouPI' || part === 'You PI' ? (
              <Text key={index} style={[style, {color: '#3ED3A3'}]}>
                {part}
              </Text>
            ) : (
              part
            ),
          )}
        </Text>
      );
    };

    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.titleContainer}>
          {highlightText(item.title, styles.title)}
        </View>
        {highlightText(item.description, styles.description)}
      </View>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentSlide(Math.round(index));
  };

  const handleLogin = async () => {
    try {
      await useAuthStore.getState().completeOnboarding();
    } catch (e) {
      console.error('Onboarding Completion Error:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

        {/* ✅ Use AppButton instead of TouchableOpacity */}
        <AppButton
          title="Login"
          style={styles.loginButton}
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  slide: {width, alignItems: 'center', padding: 20},
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
  pagination: {flexDirection: 'row', marginBottom: 20},
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
});
