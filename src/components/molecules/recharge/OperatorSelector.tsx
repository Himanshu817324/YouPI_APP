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
      style={{
        marginBottom: 20,
      }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        gap: 10,
      }}
    >
      {operators.map(op => (
        <TouchableOpacity
          key={op}
          onPress={() => onOperatorChange(op)}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 25,
            backgroundColor: selectedOperator === op ? '#007AFF' : '#F0F0F0',
            minWidth: 80,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: selectedOperator === op ? 'white' : '#333',
              fontWeight: selectedOperator === op ? '600' : '400',
              fontSize: 14,
            }}
          >
            {op}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default OperatorSelector;