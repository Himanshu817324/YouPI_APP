import React from 'react';
import { View, Text, ScrollView } from 'react-native';

type ComparisonTableProps = {
  activeTab: 'normal' | 'smart';
};

const features = [
  { label: 'API Gateway', normal: 'Basic', smart: 'Advanced' },
  { label: 'Security Level', normal: 'Standard', smart: 'AI-Powered' },
  { label: 'Support', normal: 'Email', smart: 'Priority' },
  { label: 'Uptime SLA', normal: '99.9%', smart: '99.99%' },
  { label: 'Monthly Requests', normal: '10K', smart: '100K' },
];

const ComparisonTable: React.FC<ComparisonTableProps> = ({ activeTab }) => {
  return (
    <View
      className={`rounded-2xl p-4 mx-4 mb-6 ${
        activeTab === 'smart'
          ? 'bg-white border-2 border-purple-300 shadow-lg'
          : 'bg-white border border-gray-200 shadow'
      }`}
    >
      <Text className="text-xl font-bold text-center mb-4 text-gray-900">
        Feature Comparison
      </Text>

      <ScrollView horizontal className="w-full">
        <View className="min-w-full">
          {/* Header Row */}
          <View className="flex-row bg-gray-100 rounded-t-xl">
            <Text className="flex-1 py-3 px-2 font-semibold text-gray-700 text-center">
              Features
            </Text>
            <Text className="flex-1 py-3 px-2 font-semibold text-gray-700 text-center">
              Normal Plan
            </Text>
            <Text className="flex-1 py-3 px-2 font-semibold text-gray-700 text-center">
              Smart Saver
            </Text>
          </View>

          {/* Rows */}
          {features.map((item, idx) => (
            <View
              key={idx}
              className={`flex-row ${
                idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } border-t border-gray-100`}
            >
              <Text className="flex-1 py-3 px-2 text-gray-800 text-center">
                {item.label}
              </Text>
              <Text className="flex-1 py-3 px-2 text-gray-700 text-center">
                {item.normal}
              </Text>
              <Text className="flex-1 py-3 px-2 text-purple-600 font-semibold text-center">
                {item.smart}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ComparisonTable;
