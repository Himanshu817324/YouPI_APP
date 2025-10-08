import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../../components/atoms/AppButton';
import LogoWithCircles from '../../../components/atoms/LogoWithCircles';
import ProfileImage from '../../../components/atoms/ProfileImage';
import Toast from 'react-native-toast-message';
import { apiService } from '../../../services/apiService';
import { useAuthStore } from '../../../store/authStore';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { recordCrashlyticsError, logCrashlyticsEvent } from '../../../config/firebase';

type Props = NativeStackScreenProps<MainStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const { user, loginWithBackend } = useAuthStore();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    gender: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Load existing profile data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setInitialLoading(true);
        
        // First try to get data from the store
        if (user) {
          setFormData({
            fullname: user.fullName || '',
            email: user.email || '',
            gender: user.gender || '',
          });
          setProfileImage(user.profileImageUrl || null);
          setInitialLoading(false);
          return;
        }

        // If no user in store, fetch from API
        if (user?.mobileNumber) {
          const formattedMobileNumber = user.mobileNumber.startsWith('+91') 
            ? user.mobileNumber.replace('+91', '') 
            : user.mobileNumber;
          
          const profileData = await apiService.getUserProfile(formattedMobileNumber);
          
          // Handle different response formats
          const userData = profileData.user || profileData;
          if (userData) {
            setFormData({
              fullname: userData.fullName || '',
              email: userData.email || '',
              gender: userData.gender || '',
            });
            setProfileImage(userData.profileImageUrl || null);
          }
        }
      } catch (error: any) {
        console.error('Error loading profile data:', error);
        recordCrashlyticsError(error, 'loadProfileData');
        Toast.show({
          type: 'error',
          text1: 'Error Loading Profile',
          text2: error.message || 'Failed to load profile data',
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfileData();
  }, [user]);

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
      quality: 0.8,
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
    if (!user?.mobileNumber || !user?.fireBaseUUID) {
      throw new Error('User mobile number or Firebase UID not found');
    }

    const formattedMobileNumber = user.mobileNumber.startsWith('+91') 
      ? user.mobileNumber.replace('+91', '') 
      : user.mobileNumber;

    // Upload to Firebase Storage
    const downloadURL = await apiService.uploadProfileImage(
      formattedMobileNumber, 
      imageUri, 
      user.fireBaseUUID
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

    if (!user?.mobileNumber) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'User mobile number not found',
      });
      return;
    }

    try {
      setLoading(true);
      logCrashlyticsEvent('profile_edit_started', {
        hasImage: !!profileImage,
        fieldCount: Object.keys(formData).length
      });

      // Ensure mobile number is in correct format (remove +91 prefix if present)
      const formattedMobileNumber = user.mobileNumber.startsWith('+91') 
        ? user.mobileNumber.replace('+91', '') 
        : user.mobileNumber;

      console.log('Updating profile for mobile:', formattedMobileNumber);
      
      let profileImageUrl = user.profileImageUrl;

      // Upload image if a new one was selected
      if (profileImage && profileImage !== user.profileImageUrl) {
        try {
          setUploadingImage(true);
          profileImageUrl = await uploadProfileImage(profileImage);
          console.log('Image uploaded successfully:', profileImageUrl);
        } catch (imageError: any) {
          console.error('Image upload failed:', imageError);
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
      
      const updateData = {
        fullName: formData.fullname.trim(),
        email: formData.email.trim(),
        gender: formData.gender,
        profileImageUrl: profileImageUrl,
      };

      console.log('Update data being sent:', updateData);

      const response = await apiService.updateProfile(formattedMobileNumber, updateData);
      console.log('Update API response:', response);

      // Handle different response formats
      if ((response.success && response.user) || response.id) {
        console.log('Profile update successful');
        // Clear cache for this user to ensure fresh data
        apiService.clearCacheForUser(user.mobileNumber);
        
        // Update the user in the store if we have the updated user data
        const userData = response.user || response as any;
        if (userData) {
          await loginWithBackend(userData);
        }

        Toast.show({
          type: 'success',
          text1: 'Profile Updated!',
          text2: 'Your profile has been updated successfully',
        });

        // Navigate back to profile screen
        navigation.goBack();
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      recordCrashlyticsError(error, 'profileUpdate');
      Toast.show({
        type: 'error',
        text1: 'Profile Update Failed',
        text2: error.message || 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading screen while fetching profile data
  if (initialLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#E2F8F1]">
        <View className="flex-1 justify-center items-center">
          <LogoWithCircles animation={true} secondCircleColor="#3ED3A3" />
          <Text className="text-xl font-semibold text-center text-black mt-4">
            Loading Profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#E2F8F1]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center mt-8 mb-6">
            <LogoWithCircles animation={false} secondCircleColor="#3ED3A3" />
            <Text className="text-3xl font-bold text-center text-black mt-4">
              Edit Your <Text className="text-[#3ED3A3]">Profile</Text>
            </Text>
            <Text className="text-center text-lg text-gray-600 mt-2">
              Update your information
            </Text>
            
            {/* Profile Image Section */}
            <View className="mt-6 items-center">
              <ProfileImage
                imageUrl={profileImage || undefined}
                fullName={formData.fullname || user?.fullName || ''}
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
                  {uploadingImage ? 'Uploading...' : 'Change Photo'}
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
                <Text className="text-lg text-gray-600">+91 {user?.mobileNumber || 'No phone number'}</Text>
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
                  ? (uploadingImage ? "Uploading Image..." : "Updating Profile...") 
                  : "Update Profile"
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

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mt-4 py-3 rounded-xl border-2 border-gray-300"
            >
              <Text className="text-center font-semibold text-gray-700 text-lg">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}
