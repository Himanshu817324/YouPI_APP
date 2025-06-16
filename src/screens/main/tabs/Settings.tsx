import React, {useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  useColorScheme as useRNColorScheme,
} from 'react-native';
import {View, Text} from 'react-native';
import {useColorScheme as useNWColorScheme} from 'nativewind';

const SettingScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const deviceColorScheme = useRNColorScheme();
  const {setColorScheme} = useNWColorScheme();
  const isDark = deviceColorScheme === 'dark';

  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);

  const toggleTheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };

  return (
    <ScrollView className="flex-1 bg-[#e2f8f1] dark:bg-background-dark px-5">
      <View className="my-5">
        <Text className="text-[#00D09C] text-2xl font-medium mb-2">
          Preferences
        </Text>

        <SettingsItem
          label="Notifications"
          right={
            <Toggle
              value={notificationsEnabled}
              onToggle={toggleNotifications}
            />
          }
        />

        <SettingsItem
          label="Dark Mode"
          right={<Toggle value={isDark} onToggle={toggleTheme} />}
        />

        <SettingsItem label="Language" onPress={() => {}} value="English" />
      </View>

      <View className="my-5">
        <Text className="text-[#00D09C] text-2xl font-medium mb-2">App</Text>
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
    activeOpacity={onPress ? 0.7 : 1}>
    <Text className="text-black dark:text-white text-xl">{label}</Text>
    {right
      ? right
      : value && (
          <Text className="text-[#666] dark:text-[#999] text-[15px]">
            {value}
          </Text>
        )}
  </TouchableOpacity>
);

const Toggle = ({value, onToggle}: {value: boolean; onToggle: () => void}) => {
  const trackColor = value ? 'bg-[#00D09C]' : 'bg-gray-400';
  const thumbTransform = value ? 'translate-x-6' : 'translate-x-0';

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      className={`w-12 h-6 rounded-full px-[2px] flex-row items-center ${trackColor}`}>
      <View
        className={`w-5 h-5 bg-white rounded-full transform ${thumbTransform} transition-transform duration-200`}
      />
    </TouchableOpacity>
  );
};

export default SettingScreen;
