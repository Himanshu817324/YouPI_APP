// Profile.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/atoms/AppButton';
import LogoWithCircles from '../../components/atoms/LogoWithCircles';
import Toast from 'react-native-toast-message';
import { apiService } from '../../services/apiService';
import { useAuthStore } from '../../store/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Profile'>;

export default function ProfileScreen({ route }: Props) {
  const { firebaseUid, mobileNo } = route.params;
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { loginWithBackend } = useAuthStore();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill all required fields correctly',
      });
      return;
    }

    try {
      setLoading(true);

      const signupData = {
        fireBaseUUID: firebaseUid,
        fullName: formData.fullname.trim(),
        mobileNumber: mobileNo,
        email: formData.email.trim(),
        gender: formData.gender,
      };

      const response = await apiService.signupUser(signupData);

      if (response.success && response.user) {
        await loginWithBackend(response.user);

        Toast.show({
          type: 'success',
          text1: 'Profile Created!',
          text2: 'Welcome to YouPI!',
        });
      } else {
        throw new Error(response.message || 'Failed to create profile');
      }
    } catch (error: any) {
      console.error('Profile creation error:', error);
      Toast.show({
        type: 'error',
        text1: 'Profile Creation Failed',
        text2: error.message || 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E2F8F1]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center mt-8 mb-6">
            <LogoWithCircles animation={false} secondCircleColor="#3ED3A3" />
            <Text className="text-3xl font-bold text-center text-black mt-4">
              Complete Your <Text className="text-[#3ED3A3]">Profile</Text>
            </Text>
            <Text className="text-center text-lg text-gray-600 mt-2">
              Tell us a bit about yourself
            </Text>
          </View>

          <View className="px-6">
            <View className="mb-4">
              <Text className="text-lg font-semibold text-black mb-2">
                Full Name *
              </Text>
              <TextInput
                className={`bg-white rounded-xl border px-4 py-4 text-lg ${
                  errors.fullname ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                value={formData.fullname}
                onChangeText={(text) => handleInputChange('fullname', text)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.fullname && (
                <Text className="text-red-500 text-sm mt-1">{errors.fullname}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold text-black mb-2">
                Email Address *
              </Text>
              <TextInput
                className={`bg-white rounded-xl border px-4 py-4 text-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold text-black mb-2">
                Mobile Number
              </Text>
              <View className="bg-gray-100 rounded-xl border border-gray-300 px-4 py-4">
                <Text className="text-lg text-gray-600">+91 {mobileNo}</Text>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-lg font-semibold text-black mb-2">
                Gender *
              </Text>
              <View className="flex-row space-x-4">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    className={`flex-1 py-4 rounded-xl border-2 ${
                      formData.gender === gender
                        ? 'border-[#3ED3A3] bg-[#3ED3A3]'
                        : 'border-gray-300 bg-white'
                    }`}
                    onPress={() => handleInputChange('gender', gender)}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        formData.gender === gender ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.gender && (
                <Text className="text-red-500 text-sm mt-1">{errors.gender}</Text>
              )}
            </View>

            <AppButton
              title={loading ? "Creating Profile..." : "Complete Profile"}
              onPress={handleSubmit}
              disabled={loading}
              style={{
                backgroundColor: loading ? '#ccc' : '#3ED3A3',
                paddingVertical: 16,
                borderRadius: 20,
                marginTop: 10,
              }}
            />

            <Text className="text-center text-sm text-gray-500 mt-4 px-4">
              By continuing, you agree to our{' '}
              <Text className="text-[#3ED3A3] font-semibold">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-[#3ED3A3] font-semibold">Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}