import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '../../../store/authStore';
import Toast from 'react-native-toast-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../types/navigation';
import ProfileImage from '../../../components/atoms/ProfileImage';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

const ProfileScreen = ({ navigation }: Props) => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await logout();
            Toast.show({
              type: 'success',
              text1: 'Logged out successfully',
            });
          } catch (error) {
            console.error('Logout error:', error);
            Toast.show({
              type: 'error',
              text1: 'Logout failed',
              text2: 'Please try again',
            });
          }
        }
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#e2f8f1] dark:bg-background-dark">
      <ScrollView className="px-5 flex-1">
        <View className="items-center mt-8 mb-5">
          <ProfileImage
            imageUrl={user?.profileImageUrl}
            fullName={user?.fullName || ''}
            size={128}
          />
          <Text className="text-3xl font-semibold text-black dark:text-white mt-4">
            {user?.fullName || 'User'}
          </Text>
          <Text className="text-xl text-gray-500 dark:text-gray-400">
            {user?.email || 'No email provided'}
          </Text>
          <Text className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            +91 {user?.mobileNumber || 'No phone number'}
          </Text>
        </View>

        <View className="my-5">
          <Text className="text-[#00D09C] text-2xl font-medium mb-2">
            Account Settings
          </Text>
          <ProfileItem label="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
          <ProfileItem label="Payment History" onPress={() => {}} />
        </View>

        <View className="my-5">
          <Text className="text-[#00D09C] text-2xl font-medium mb-2">
            Support
          </Text>
          <ProfileItem label="Help Center" onPress={() => {}} />
          <ProfileItem label="Terms & Conditions" onPress={() => {}} />
          <ProfileItem label="Privacy Policy" onPress={() => {}} />
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="my-8 items-center bg-red-600 py-3 rounded-lg">
          <Text className="text-white font-semibold text-2xl">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const ProfileItem = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="py-3 border-b border-[#2A2C38]">
    <Text className="text-black dark:text-white text-xl">{label}</Text>
  </TouchableOpacity>
);

export default ProfileScreen;
