import React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { operators } from '../../../data/Recharge/PlanData';

interface OperatorSelectorProps {
  selectedOperator: string;
  onOperatorChange: (operator: string) => void;
}

const OperatorSelector: React.FC<OperatorSelectorProps> = ({
  selectedOperator,
  onOperatorChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginBottom: 20}}
      contentContainerStyle={{paddingHorizontal: 20,gap: 10}}
    >
      {operators.map(op => (
        <TouchableOpacity
          key={op}
          onPress={() => onOperatorChange(op)}
          className={`px-5 py-2.5 rounded-3xl min-w-[80px] items-center ${
            selectedOperator === op ? 'bg-blue-500' : 'bg-gray-100'
          }`}
        >
          <Text
            className={`${
              selectedOperator === op
          ? 'text-white font-semibold'
          : 'text-gray-700 font-normal'
            } text-sm`}
          >
            {op}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default OperatorSelector;
