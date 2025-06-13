import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Operator = 'jio' | 'airtel' | 'vi';

interface OperatorSelectorProps {
  selectedOperator: Operator;
  setSelectedOperator: (operator: Operator) => void;
}

const OperatorSelector: React.FC<OperatorSelectorProps> = ({
  selectedOperator,
  setSelectedOperator,
}) => {
  const operators = [
    { id: 'jio', name: 'Jio', color: '#2563eb' },      // Tailwind: bg-blue-600
    { id: 'airtel', name: 'Airtel', color: '#dc2626' }, // Tailwind: bg-red-600
    { id: 'vi', name: 'Vi', color: '#9333ea' },        // Tailwind: bg-purple-600
  ];

  return (
    <View className="bg-slate-800 rounded-xl p-4">
      <Text className="text-white text-lg font-medium mb-3">Select Operator</Text>

      <View className="flex-row justify-between space-x-3">
        {operators.map((operator) => {
          const isSelected = selectedOperator === operator.id;
          return (
            <TouchableOpacity
              key={operator.id}
              onPress={() => setSelectedOperator(operator.id as Operator)}
              className={`flex-1 py-3 px-4 rounded-lg items-center ${
                isSelected ? '' : 'bg-slate-700'
              }`}
              style={{
                backgroundColor: isSelected ? operator.color : undefined,
                shadowColor: isSelected ? '#000' : undefined,
                shadowOpacity: isSelected ? 0.2 : undefined,
                shadowRadius: isSelected ? 4 : undefined,
                elevation: isSelected ? 3 : undefined,
              }}
            >
              <Text
                className={`font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}
              >
                {operator.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default OperatorSelector;
