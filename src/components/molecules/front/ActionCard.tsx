import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { wp, normalize } from '../../../utils/dimensions';

type ActionCardProps = {
  icon: string;
  label: string;
  onPress?: () => void;
};

const ActionCard: React.FC<ActionCardProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="bg-foreground-light dark:bg-foreground-dark py-5 px-5 rounded-xl items-center flex-1 mx-1 mt-6">
    <Ionicons
      name={icon}
      size={normalize(36)}
      color="#3ED3A3"
      style={{ backgroundColor: '#183638', padding: wp(2.5), borderRadius: wp(13) }}
    />
    <Text className="text-text-light dark:text-text-dark mt-4 text-xl">{label}</Text>
  </TouchableOpacity>
);

export default ActionCard;
