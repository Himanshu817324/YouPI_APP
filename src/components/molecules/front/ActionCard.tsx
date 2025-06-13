import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { wp, normalize } from '../../../utils/dimensions';

type ActionCardProps = {
  icon: string;
  label: string;
};

const ActionCard: React.FC<ActionCardProps> = ({ icon, label }) => (
  <TouchableOpacity className="bg-[#10193A] py-5 px-5 rounded-xl items-center flex-1 mx-1">
    <Ionicons
      name={icon}
      size={normalize(32)}
      color="#3ED3A3"
      style={{ backgroundColor: '#183638', padding: wp(2.5), borderRadius: wp(13) }}
    />
    <Text className="text-white mt-2 text-base">{label}</Text>
  </TouchableOpacity>
);

export default ActionCard;
