import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ActionCardProps = {
  icon: string;
  label: string;
};

const ActionCard: React.FC<ActionCardProps> = ({ icon, label }) => (
  <TouchableOpacity className="items-center flex-1 mx-2 py-6 rounded-2xl bg-slate-800 shadow-lg">
    <View className="bg-[#183638] p-4 rounded-full mb-3">
      <Ionicons name={icon} size={28} color="#fff" />
    </View>
    <Text className="text-white text-base font-semibold">{label}</Text>
  </TouchableOpacity>
);

export default ActionCard;
