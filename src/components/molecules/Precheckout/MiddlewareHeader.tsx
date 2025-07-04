import React from 'react';
import { View, Text } from 'react-native';

const MiddlewareHeader: React.FC = () => {
  return (
    <View className="items-center mb-8 px-4 md:mb-12">
      <Text className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-light dark:text-text-dark text-center mb-4">
        Choose Your Plan
      </Text>
      <Text className="text-lg md:text-xl text-text-light dark:text-text-dark text-center max-w-[90%]">
        Heading Description
      </Text>
    </View>
  );
};

export default MiddlewareHeader;
