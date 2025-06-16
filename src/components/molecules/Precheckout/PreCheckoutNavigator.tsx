import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TabNavigationProps {
  activeTab: 'normal' | 'smart';
  onTabChange: (tab: 'normal' | 'smart') => void;
}

const PreCheckoutNavigator: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <View className="flex justify-center mb-6 px-4">
      <View className="bg-white p-2 rounded-full shadow-lg border w-full max-w-md self-center flex-row space-x-2">
        {/* Normal Plan */}
        <TouchableOpacity
          onPress={() => onTabChange('normal')}
          className={`flex-1 px-4 py-2 rounded-full flex-row justify-center items-center ${
            activeTab === 'normal'
              ? 'bg-blue-500 shadow-md'
              : 'bg-transparent'
          }`}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={18}
            color={activeTab === 'normal' ? 'white' : '#4B5563'}
            style={{ marginRight: 6 }}
          />
          <Text
            className={`font-semibold text-sm ${
              activeTab === 'normal' ? 'text-white' : 'text-gray-600'
            }`}
          >
            Normal Plan
          </Text>
        </TouchableOpacity>

        {/* Smart Saver */}
        <TouchableOpacity
          onPress={() => onTabChange('smart')}
          className={`flex-1 px-4 py-2 rounded-full flex-row justify-center items-center relative ${
            activeTab === 'smart'
              ? 'bg-purple-500'
              : 'bg-transparent'
          }`}
        >
          <Ionicons
            name="flash-outline"
            size={18}
            color={activeTab === 'smart' ? 'white' : '#4B5563'}
            style={{ marginRight: 6 }}
          />
          <Text
            className={`font-semibold text-sm ${
              activeTab === 'smart' ? 'text-white' : 'text-gray-600'
            }`}
          >
            Smart Saver
          </Text>

          {activeTab === 'smart' && (
            <View className="absolute -top-2 -right-2 bg-orange-500 px-2 py-0.5 rounded-full">
              <Text className="text-white text-xs font-medium">SAVE 34%</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreCheckoutNavigator;
