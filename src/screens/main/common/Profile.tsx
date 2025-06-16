import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', onPress: () => console.log('Logged out')},
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#e2f8f1] dark:bg-background-dark">
      <ScrollView className='px-5 flex-1'>
        <View className="items-center mt-8 mb-5">
          <Image
            source={require('../../../assets/profile-2.jpeg')}
            className="w-[8rem] h-[8rem] border-2 border-[#00D09C] rounded-full mb-3"
          />
          <Text className="text-3xl font-semibold text-black dark:text-white">
            John Doe
          </Text>
          <Text className="text-xl text-gray-500 dark:text-gray-400">
            john.doe@example.com
          </Text>
        </View>

        <View className="my-5">
          <Text className="text-[#00D09C] text-2xl font-medium mb-2">
            Account Settings
          </Text>
          <ProfileItem label="Edit Profile" onPress={() => {}} />
          <ProfileItem label="Change Password" onPress={() => {}} />
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
