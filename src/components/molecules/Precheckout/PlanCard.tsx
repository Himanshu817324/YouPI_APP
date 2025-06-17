import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PlanFeature {
  name: string;
  price: string;
  period: string;
  originalPrice?: string;
  description: string;
  features: string[];
  color: string;
  icon: string;
  popular?: boolean;
}

interface PlanCardProps {
  plan: PlanFeature;
  planKey: string;
  isActive: boolean;
  onBuyNow: (planType: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  planKey,
  isActive,
  onBuyNow,
}) => {
  return (
    <View
      className={`relative rounded-2xl border-2 border-[#00D09C] transition-all p-6 mb-6 ${
        isActive ? 'scale-105 shadow-2xl' : 'opacity-50 scale-95'
      }`}
      style={{
        backgroundColor: isActive ? plan.color : '#fff',
      }}>
      {/* Popular Tag */}
      {plan.popular && isActive && (
        <View className="absolute -top-4 left-1/2 -translate-x-1/2">
          <View className="flex-row items-center bg-pink-500 px-4 py-1 rounded-full">
            <Ionicons name="star" size={16} color="white" />
            <Text className="text-white text-sm font-semibold">
              Most Popular
            </Text>
          </View>
        </View>
      )}

      {/* Header with Icon */}
      <View className="flex-row items-center mb-4">
        <View className="p-3 rounded-full bg-card-light dark:bg-card-dark">
          <Ionicons name={plan.icon} size={28} color="#00D09C" />
        </View>
        <View className="ml-4">
          <Text className="text-xl font-bold text-text-light dark:text-text-dark">
            {plan.name}
          </Text>
          {plan.originalPrice && (
            <Text className="text-sm line-through text-muted-foreground-light dark:text-muted-foreground-dark">
              {plan.originalPrice}
            </Text>
          )}
        </View>
      </View>

      {/* Price and Description */}
      <View className="mb-6">
        <View className="flex-row items-baseline">
          <Text className="text-3xl font-bold text-text-light dark:text-text-dark">
            {plan.price}
          </Text>
          <Text className="ml-2 text-base text-text-light dark:text-text-dark">
            {plan.period}
          </Text>
        </View>
        <Text className="mt-3 text-sm text-text-light dark:text-text-dark">
          {plan.description}
        </Text>
      </View>

      {/* Feature List */}
      <FlatList
        data={plan.features}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View className="flex-row items-center mb-3">
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#10B981"
              style={{marginRight: 8}}
            />
            <Text className="text-sm text-muted-foreground-light dark:text-muted-foreground-dark">
              {item}
            </Text>
          </View>
        )}
      />

      {/* Buy Now Button */}
      <TouchableOpacity
        onPress={() => onBuyNow(planKey)}
        className="w-full mt-4 py-3 rounded-xl flex-row justify-center items-center bg-primary-light dark:bg-primary-dark">
        <Text className="font-semibold text-base text-primary-foreground-light dark:text-primary-foreground-dark">
          Buy Now
        </Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="#fff"
          style={{marginLeft: 8}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlanCard;
