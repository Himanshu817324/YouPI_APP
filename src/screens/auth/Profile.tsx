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
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/atoms/AppButton';
import LogoWithCircles from '../../components/atoms/LogoWithCircles';
import ProfileImage from '../../components/atoms/ProfileImage';
import Toast from 'react-native-toast-message';
import { apiService } from '../../services/apiService';
import { useAuthStore } from '../../store/authStore';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { recordCrashlyticsError, logCrashlyticsEvent } from '../../config/firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ route }: Props) {
  const { firebaseUid, mobileNo } = route.params;
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    gender: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
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

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8 as const,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setProfileImage(imageUri);
        }
      }
    });
  };

  const uploadProfileImage = async (imageUri: string) => {
    if (!firebaseUid) {
      throw new Error('Firebase UID not found');
    }

    const formattedMobileNumber = mobileNo.startsWith('+91') ? mobileNo.replace('+91', '') : mobileNo;

    // Upload to Firebase Storage
    const downloadURL = await apiService.uploadProfileImage(
      formattedMobileNumber,
      imageUri,
      firebaseUid
    );

    return downloadURL;
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
      logCrashlyticsEvent('profile_creation_started', {
        hasImage: !!profileImage,
        fieldCount: Object.keys(formData).length
      });

      // Validate required fields
      if (!firebaseUid || !mobileNo || !formData.fullname.trim() || !formData.email.trim() || !formData.gender) {
        throw new Error('Missing required fields for signup');
      }

      // Ensure mobile number is in correct format (remove +91 prefix if present)
      const formattedMobileNumber = mobileNo.startsWith('+91') ? mobileNo.replace('+91', '') : mobileNo;
      console.log('Original mobile number:', mobileNo);
      console.log('Formatted mobile number:', formattedMobileNumber);

      let profileImageUrl: string | undefined;

      // Upload image if one was selected
      if (profileImage) {
        try {
          setUploadingImage(true);
          profileImageUrl = await uploadProfileImage(profileImage);
          console.log('Image uploaded successfully during signup:', profileImageUrl);
        } catch (imageError: any) {
          console.error('Image upload failed during signup:', imageError);
          Toast.show({
            type: 'error',
            text1: 'Image Upload Failed',
            text2: imageError.message || 'Failed to upload image',
          });
          setUploadingImage(false);
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      // Create signup data in the exact format expected by the API
      const signupData = {
        mobileNumber: formattedMobileNumber,
        fullName: formData.fullname.trim(),
        email: formData.email.trim(),
        gender: formData.gender,
        fireBaseUUID: firebaseUid,
        password: null,
        profileImageUrl: profileImageUrl,
      };

      console.log('Signup data being sent:', signupData);
      console.log('Firebase UID:', firebaseUid);

      // Skip uniqueness checks since backend only has /users-normal/create endpoint
      console.log('Proceeding directly to signup...');

      const response = await apiService.signupUser(signupData);
      console.log('Signup API response:', response);
      console.log('Signup response success:', response.success);
      console.log('Signup response user:', response.user);
      console.log('Signup response message:', response.message);

      // Handle different response formats
      console.log('Processing signup response...');

      // Handle both response formats: {success: true, user: {...}} or direct user object
      if ((response.success && response.user) || response.id) {
        console.log('Signup successful, logging in user...');
        // Clear cache for this user to ensure fresh data
        apiService.clearCacheForUser(mobileNo);
        // Use user property if available, otherwise use the response itself
        const userData = response.user || response as any;
        await loginWithBackend(userData);

        Toast.show({
          type: 'success',
          text1: 'Profile Created!',
          text2: 'Welcome to YouPI!',
        });
      } else if (response.success === false) {
        // Handle explicit failure
        console.log('Signup explicitly failed:', response);
        throw new Error(response.message || 'Failed to create profile');
      } else {
        // Handle unknown response format
        console.log('Unknown signup response format:', response);
        console.log('Response keys:', Object.keys(response));

        // Try to extract user data from response
        const userData = response.user || (response as any).data || response;
        if (userData && ((userData as any).id || (userData as any).mobileNumber)) {
          console.log('Found user data in response, attempting login...');
          // Clear cache for this user to ensure fresh data
          apiService.clearCacheForUser(mobileNo);
          await loginWithBackend(userData as any);

          Toast.show({
            type: 'success',
            text1: 'Profile Created!',
            text2: 'Welcome to YouPI!',
          });
        } else {
          throw new Error(response.message || 'Failed to create profile - unknown response format');
        }
      }
    } catch (error: any) {
      console.error('Profile creation error:', error);
      recordCrashlyticsError(error, 'profileCreation');
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

            {/* Profile Image Section */}
            <View className="mt-6 items-center">
              <ProfileImage
                imageUrl={profileImage || undefined}
                fullName={formData.fullname || ''}
                size={120}
                onPress={handleImagePicker}
                showEditIcon={true}
              />
              <TouchableOpacity
                onPress={handleImagePicker}
                className="mt-3 px-4 py-2 bg-[#3ED3A3] rounded-lg"
                disabled={uploadingImage}
              >
                <Text className="text-white font-semibold">
                  {uploadingImage ? 'Uploading...' : 'Add Photo (Optional)'}
                </Text>
              </TouchableOpacity>
            </View>
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
              title={
                loading
                  ? (uploadingImage ? 'Uploading Image...' : 'Creating Profile...')
                  : 'Complete Profile'
              }
              onPress={handleSubmit}
              disabled={loading || uploadingImage}
              style={{
                backgroundColor: (loading || uploadingImage) ? '#ccc' : '#3ED3A3',
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
