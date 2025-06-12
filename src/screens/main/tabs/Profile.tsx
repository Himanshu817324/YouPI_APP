import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const ProfileScreen = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('Logged out') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: 'https://i.pravatar.cc/150?img=13',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <ProfileItem label="Edit Profile" onPress={() => {}} />
        <ProfileItem label="Change Password" onPress={() => {}} />
        <ProfileItem label="Payment History" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <ProfileItem label="Help Center" onPress={() => {}} />
        <ProfileItem label="Terms & Conditions" onPress={() => {}} />
        <ProfileItem label="Privacy Policy" onPress={() => {}} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
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
  <TouchableOpacity onPress={onPress} style={styles.profileItem}>
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12141C',
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  email: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#00D09C',
    marginBottom: 10,
    fontWeight: '500',
  },
  profileItem: {
    paddingVertical: 12,
    borderBottomColor: '#2A2C38',
    borderBottomWidth: 1,
  },
  itemText: {
    color: 'white',
    fontSize: 15,
  },
  logoutButton: {
    marginVertical: 30,
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileScreen;
