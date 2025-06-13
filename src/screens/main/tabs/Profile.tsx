import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useColorScheme } from 'nativewind';

const ProfileScreen = () => {
  const { colorScheme } = useColorScheme();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('Logged out') },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-[#e2f8f1] dark:bg-background-dark px-5">
      {/* Profile Header */}
      <View className="items-center mt-8 mb-5">
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=13' }}
          className="w-[90px] h-[90px] rounded-full mb-3"
        />
        <Text className="text-lg font-semibold text-black dark:text-white">
          John Doe
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          john.doe@example.com
        </Text>
      </View>

      {/* Account Settings */}
      <View className="my-5">
        <Text className="text-[#00D09C] text-base font-medium mb-2">
          Account Settings
        </Text>
        <ProfileItem label="Edit Profile" onPress={() => {}} />
        <ProfileItem label="Change Password" onPress={() => {}} />
        <ProfileItem label="Payment History" onPress={() => {}} />
      </View>

      {/* Support */}
      <View className="my-5">
        <Text className="text-[#00D09C] text-base font-medium mb-2">
          Support
        </Text>
        <ProfileItem label="Help Center" onPress={() => {}} />
        <ProfileItem label="Terms & Conditions" onPress={() => {}} />
        <ProfileItem label="Privacy Policy" onPress={() => {}} />
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        className="my-8 items-center bg-red-600 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold text-base">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
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
    className="py-3 border-b border-[#2A2C38]"
  >
    <Text className="text-black dark:text-white text-[15px]">{label}</Text>
  </TouchableOpacity>
);

export default ProfileScreen;
