import React, { useState } from 'react';
import {
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

const SettingScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleNotifications = () =>
    setNotificationsEnabled(prev => !prev);

  const toggleTheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ScrollView className="flex-1 bg-[#e2f8f1] dark:bg-background-dark px-5">
      <View className="my-5">
        <Text className="text-[#00D09C] text-base font-medium mb-2">Preferences</Text>

        <SettingsItem
          label="Notifications"
          right={
            <Switch
              trackColor={{ false: '#767577', true: '#00D09C' }}
              thumbColor={notificationsEnabled ? '#00D09C' : '#f4f3f4'}
              onValueChange={toggleNotifications}
              value={notificationsEnabled}
            />
          }
        />

        <SettingsItem
          label="Dark Mode"
          right={
            <Switch
              trackColor={{ false: '#767577', true: '#00D09C' }}
              thumbColor={colorScheme === 'dark' ? '#00D09C' : '#f4f3f4'}
              onValueChange={toggleTheme}
              value={colorScheme === 'dark'}
            />
          }
        />

        <SettingsItem label="Language" onPress={() => {}} value="English" />
      </View>

      <View className="my-5">
        <Text className="text-[#00D09C] text-base font-medium mb-2">App</Text>
        <SettingsItem label="About" onPress={() => {}} />
        <SettingsItem label="Send Feedback" onPress={() => {}} />
        <SettingsItem label="Rate the App" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const SettingsItem = ({
  label,
  onPress,
  value,
  right,
}: {
  label: string;
  onPress?: () => void;
  value?: string;
  right?: React.ReactNode;
}) => (
  <TouchableOpacity
    className="py-[14px] border-b border-[#2A2C38] flex-row justify-between items-center"
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <Text className="text-black dark:text-white text-[15px]">{label}</Text>
    {right ? (
      right
    ) : (
      value && <Text className="text-[#666] dark:text-[#999] text-[14px]">{value}</Text>
    )}
  </TouchableOpacity>
);

export default SettingScreen;
