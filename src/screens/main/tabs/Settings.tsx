import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SettingScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleNotifications = () =>
    setNotificationsEnabled(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

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

        <SettingsItem label="Language" onPress={() => {}} value="English" />
        <SettingsItem label="Appearance" onPress={() => {}} value="Dark" />
      </View>

      {/* App Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>
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
    style={styles.item}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <Text style={styles.label}>{label}</Text>
    {right ? (
      right
    ) : (
      value && <Text style={styles.value}>{value}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12141C',
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    color: '#00D09C',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 14,
    borderBottomColor: '#2A2C38',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 15,
  },
  value: {
    color: '#999',
    fontSize: 14,
  },
});

export default SettingScreen;
