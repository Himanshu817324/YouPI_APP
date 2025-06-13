import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const RechargeBox = () => {
  return (
    <View className="bg-slate-800 rounded-2xl p-4 mb-6">
      {/* Phone Number */}
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
        className="bg-white rounded-xl text-black px-4 py-3 mb-3"
      />

      {/* Amount + Operator Selector */}
      <View className="flex-row mb-3">
        <TextInput
          placeholder="₹198"
          placeholderTextColor="#666"
          keyboardType="numeric"
          className="flex-1 bg-white rounded-xl text-black px-4 py-3 mr-2"
        />
        <TouchableOpacity className="flex-1 bg-white rounded-xl justify-center px-4 py-3">
          <Text className="text-black text-base">Operator ⌄</Text>
        </TouchableOpacity>
      </View>

      {/* Circle/State Selector */}
      <TouchableOpacity className="bg-white rounded-xl px-4 py-3 justify-center mb-3">
        <Text className="text-black text-base">Andhra Pradesh ⌄</Text>
      </TouchableOpacity>

      {/* Browse + Recharge Buttons */}
      <View className="flex-row">
        <TouchableOpacity className="flex-1 bg-white rounded-xl items-center py-3 mr-2">
          <Text className="text-gray-800 font-semibold">Browse plans</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-emerald-600 rounded-xl items-center py-3">
          <Text className="text-white font-semibold">Recharge !!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RechargeBox;
