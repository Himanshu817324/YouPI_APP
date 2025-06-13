import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    { id: 'jio', name: 'Jio', color: '#2563eb' },    // Tailwind: bg-blue-600
    { id: 'airtel', name: 'Airtel', color: '#dc2626' }, // Tailwind: bg-red-600
    { id: 'vi', name: 'Vi', color: '#9333ea' },      // Tailwind: bg-purple-600
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Operator</Text>
      <View style={styles.buttonContainer}>
        {operators.map((operator) => {
          const isSelected = selectedOperator === operator.id;
          return (
            <TouchableOpacity
              key={operator.id}
              style={[
                styles.button,
                isSelected
                  ? {
                      backgroundColor: operator.color,
                      shadowColor: '#000',
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }
                  : styles.unselected,
              ]}
              onPress={() => setSelectedOperator(operator.id as Operator)}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: isSelected ? '#fff' : '#cbd5e1' },
                ]}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b', // Tailwind: bg-slate-800
    borderRadius: 12,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  unselected: {
    backgroundColor: '#334155', // Tailwind: bg-slate-700
  },
  buttonText: {
    fontWeight: '500',
  },
});

export default OperatorSelector;
