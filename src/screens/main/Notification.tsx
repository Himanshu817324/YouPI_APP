import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  date: string;
  isRead: boolean;
}

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'Recharge Successful!',
      message:
        'Your 3-month plan recharge was successful. Enjoy uninterrupted service!',
      type: 'success',
      date: '2025-06-16',
      isRead: false,
    },
    {
      id: '2',
      title: 'Cashback Credited',
      message: 'You received ₹50 cashback for your recent recharge',
      type: 'info',
      date: '2025-06-15',
      isRead: true,
    },
    {
      id: '3',
      title: 'Plan Expiring Soon',
      message: 'Your current plan will expire in 3 days. Recharge now!',
      type: 'warning',
      date: '2025-06-14',
      isRead: false,
    },
  ]);

  const getIconByType = (type: string) => {
    switch (type) {
      case 'success':
        return {name: 'check-circle', color: '#00D09C'};
      case 'warning':
        return {name: 'alert', color: '#FFB74D'};
      default:
        return {name: 'information', color: '#2196F3'};
    }
  };

  const renderNotification = (notification: Notification) => {
    const icon = getIconByType(notification.type);
    return (
      <TouchableOpacity
        key={notification.id}
        className={`p-4 mb-2 rounded-xl flex-row items-start ${
          notification.isRead ? 'bg-[#1E1F29]' : 'bg-[#2A2B36]'
        }`}>
        <View className="mr-3">
          <Icon name={icon.name} size={24} color={icon.color} />
        </View>
        <View className="flex-1">
          <Text className="text-white text-[20px] font-medium mb-1">
            {notification.title}
          </Text>
          <Text className="text-[#888] text-[18px] mb-2">
            {notification.message}
          </Text>
          <Text className="text-[#666] text-[18px]">
            {new Date(notification.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        {!notification.isRead && (
          <View className="h-2 w-2 rounded-full bg-[#00D09C]" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-background-dark bg-background-light">
      <View className="px-4 py-3 border-b border-[#00D09C] flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Icon name="arrow-left" size={24} color="#00D09C" />
        </TouchableOpacity>
        <Text className=" dark:text-text-light text-2xl font-semibold flex-1 text-center mr-18">
          Notifications
        </Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView className="flex-1 px-4">
        {notifications.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Icon name="bell-off-outline" size={48} color="#888" />
            <Text className="text-[#888] text-[16px] mt-4">
              No notifications yet
            </Text>
          </View>
        ) : (
          <View className="py-4">{notifications.map(renderNotification)}</View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
