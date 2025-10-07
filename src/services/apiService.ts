// apiService.ts

const BASE_URL = 'https://youpi-backend-fv2g.onrender.com/api';

// Configuration constants
const REQUEST_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay

export interface User {
  id: number;
  mobileNumber: string;
  fullName: string;
  email: string;
  fireBaseUUID: string;
  gender: string;
  profileImageUrl?: string;
  active: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

// CheckUser API returns boolean: true if user exists, false if not
export type CheckUserResponse = boolean;

export interface ApiResponse {
  success?: boolean;
  user?: User;
  message?: string;
  token?: string;
  // Also allow direct user object response
  id?: number;
  mobileNumber?: string;
  fullName?: string;
  email?: string;
  fireBaseUUID?: string;
  gender?: string;
  profileImageUrl?: string;
  active?: boolean;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class ApiService {
  private baseURL: string;
  private requestCache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseURL = BASE_URL;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    useCache: boolean = false
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `${options.method || 'GET'}:${url}:${JSON.stringify(options.body || '')}`;

    // Enhanced logging for release debugging
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    console.log('📦 Request Body:', options.body);
    console.log('🔧 Request Headers:', options.headers);

    // Check cache first if enabled
    if (useCache) {
      const cached = this.requestCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        console.log(`Cache hit for ${endpoint}`);
        return cached.data;
      }
    }

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    // Retry logic with exponential backoff
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Cache successful responses if enabled
        if (useCache) {
          this.requestCache.set(cacheKey, {
            data,
            timestamp: Date.now(),
          });
        }

        return data;
      } catch (error: any) {
        console.error(`API Error (${endpoint}) - Attempt ${attempt}:`, error);

        // Don't retry on certain errors
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${REQUEST_TIMEOUT}ms`);
        }

        if (error.message.includes('404') || error.message.includes('400')) {
          throw error; // Don't retry client errors
        }

        if (attempt === MAX_RETRIES) {
          throw error; // Last attempt failed
        }

        // Wait before retrying with exponential backoff
        const delay = RETRY_DELAY * Math.pow(2, attempt - 1);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error('Max retries exceeded');
  }

  async checkUser(mobileNumber: string): Promise<CheckUserResponse> {
    try {
      console.log(`Checking user existence for: ${mobileNumber}`);
      const startTime = Date.now();

      const result = await this.makeRequest<CheckUserResponse>('/users-normal/check', {
        method: 'POST',
        body: JSON.stringify({ mobileNumber }),
      }, true); // Enable caching for checkUser

      const duration = Date.now() - startTime;
      console.log(`CheckUser API completed in ${duration}ms`);
      console.log(`CheckUser API returned: ${result} (type: ${typeof result})`);

      return result;
    } catch (error: any) {
      console.log('CheckUser API failed:', error.message);

      // If it's a timeout, provide a fallback
      if (error.message.includes('timeout')) {
        console.log('CheckUser timed out, assuming new user');
        return false; // Return false for new user
      }

      // If it's a 404, the endpoint doesn't exist, so assume user is new
      if (error.message.includes('404')) {
        console.log('CheckUser endpoint not found, returning false (new user)');
        return false; // Return false for new user
      }

      // Re-throw other errors
      throw error;
    }
  }

  async loginUser(mobileNumber: string): Promise<ApiResponse> {
    try {
      console.log(`Logging in user: ${mobileNumber}`);
      const startTime = Date.now();

      const result = await this.makeRequest<ApiResponse>('/users-normal/login', {
        method: 'POST',
        body: JSON.stringify({ mobileNumber }),
      });

      const duration = Date.now() - startTime;
      console.log(`LoginUser API completed in ${duration}ms`);
      console.log('LoginUser API raw response:', JSON.stringify(result, null, 2));

      return result;
    } catch (error: any) {
      console.log('LoginUser API failed:', error.message);
      console.log('LoginUser API error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      // If it's a timeout, provide a more user-friendly error
      if (error.message.includes('timeout')) {
        throw new Error('Login request timed out. Please check your connection and try again.');
      }

      // If login fails, throw a more descriptive error
      if (error.message.includes('404')) {
        throw new Error('Login endpoint not found');
      } else if (error.message.includes('500')) {
        throw new Error('Server error during login');
      } else {
        throw new Error(`Login failed: ${error.message}`);
      }
    }
  }

  async signupUser(userData: {
    mobileNumber: string;
    fullName: string;
    email: string;
    gender: string;
    fireBaseUUID: string;
    password: null;
  }): Promise<ApiResponse> {
    console.log('🚀 API Service - Signup request data:', userData);
    const startTime = Date.now();

    try {
      const response = await this.makeRequest<ApiResponse>('/users-normal/create', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const duration = Date.now() - startTime;
      console.log(`✅ API Service - Signup completed in ${duration}ms`);
      console.log('📦 API Service - Signup response:', JSON.stringify(response, null, 2));

      return response;
    } catch (error: any) {
      console.error('❌ API Service - Signup error:', error);

      // If it's a timeout, provide a more user-friendly error
      if (error.message.includes('timeout')) {
        throw new Error('Signup request timed out. Please check your connection and try again.');
      }

      // Provide more descriptive error messages
      if (error.message.includes('404')) {
        throw new Error('Signup endpoint not found');
      } else if (error.message.includes('500')) {
        throw new Error('Server error during signup');
      } else if (error.message.includes('400')) {
        throw new Error('Invalid signup data');
      } else {
        throw new Error(`Signup failed: ${error.message}`);
      }
    }
  }

  // Upload profile image to Firebase Storage
  async uploadProfileImage(
    mobileNumber: string,
    imageUri: string,
    userId: string
  ): Promise<string> {
    try {
      console.log(`Uploading profile image to Firebase Storage for: ${mobileNumber}`);
      const startTime = Date.now();

      // Import Firebase Storage function
      const { uploadProfileImage: firebaseUpload } = await import('../config/firebase');

      // Upload to Firebase Storage
      const downloadURL = await firebaseUpload(imageUri, userId, mobileNumber);

      const duration = Date.now() - startTime;
      console.log(`Firebase Storage upload completed in ${duration}ms`);
      console.log('Firebase Storage download URL:', downloadURL);

      return downloadURL;
    } catch (error: any) {
      console.log('Firebase Storage upload failed:', error.message);

      // Provide more descriptive error messages
      if (error.message.includes('storage/unauthorized')) {
        throw new Error('Unauthorized to upload images. Please check your permissions.');
      } else if (error.message.includes('storage/network-request-failed')) {
        throw new Error('Network error. Please check your connection and try again.');
      } else if (error.message.includes('storage/invalid-format')) {
        throw new Error('Invalid image format. Please select a valid image file.');
      } else {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
    }
  }

  // Update user profile by mobile number
  async updateProfile(
    mobileNumber: string,
    userData: Partial<{
      fullName: string;
      email: string;
      gender: string;
      profileImageUrl?: string;
    }>
  ): Promise<ApiResponse> {
    try {
      console.log(`Updating user profile for: ${mobileNumber}`, userData);
      const startTime = Date.now();

      const result = await this.makeRequest<ApiResponse>(`/users-normal/profile?mobileNumber=${mobileNumber}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });

      const duration = Date.now() - startTime;
      console.log(`UpdateProfile API completed in ${duration}ms`);
      console.log('UpdateProfile API response:', JSON.stringify(result, null, 2));

      return result;
    } catch (error: any) {
      console.log('UpdateProfile API failed:', error.message);

      // If it's a timeout, provide a more user-friendly error
      if (error.message.includes('timeout')) {
        throw new Error('Profile update request timed out. Please check your connection and try again.');
      }

      // Provide more descriptive error messages
      if (error.message.includes('404')) {
        throw new Error('Profile not found');
      } else if (error.message.includes('500')) {
        throw new Error('Server error while updating profile');
      } else if (error.message.includes('400')) {
        throw new Error('Invalid profile data');
      } else {
        throw new Error(`Failed to update profile: ${error.message}`);
      }
    }
  }

  // Cache management methods
  clearCache(): void {
    this.requestCache.clear();
    console.log('API cache cleared');
  }

  clearCacheForUser(mobileNumber: string): void {
    const keysToDelete: string[] = [];
    for (const [key] of this.requestCache.entries()) {
      if (key.includes(mobileNumber)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.requestCache.delete(key));
    console.log(`Cache cleared for user: ${mobileNumber}`);
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.requestCache.size,
      keys: Array.from(this.requestCache.keys()),
    };
  }

}


export const apiService = new ApiService();
