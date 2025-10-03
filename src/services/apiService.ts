// apiService.ts

const BASE_URL = 'https://youpi-backend-fv2g.onrender.com/api';

export interface User {
  id: number;
  mobileNumber: string;
  fullName: string;
  email: string;
  fireBaseUUID: string;
  gender: string;
  active: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CheckUserResponse {
  user: boolean;
  exists: boolean;
}

export interface ApiResponse {
  success: boolean;
  user: User;
  message?: string;
  token?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = BASE_URL;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
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

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async checkUser(mobileNumber: string): Promise<CheckUserResponse> {
    return this.makeRequest<CheckUserResponse>('/users-normal/check', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber }),
    });
  }

  async loginUser(mobileNumber: string): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/users-normal/login', {
      method: 'POST',
      body: JSON.stringify({ mobileNumber }),
    });
  }

  async signupUser(userData: {
    mobileNumber: string;
    fullName: string;
    email: string;
    gender: string;
    fireBaseUUID: string;
  }): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/users-normal/create', {
      method: 'POST',
      body: JSON.stringify({ ...userData, password: null }),
    });
  }

  // RESTORED: This function is necessary for editing user profiles later.
  async updateProfile(
    userId: string, // Assuming you might use your backend DB user ID
    userData: Partial<{
      fullName: string;
      email: string;
      gender: string;
    }>
  ): Promise<{ success: boolean; user: User }> {
    // Note: The endpoint might need to be adjusted based on your backend routes.
    // This is based on your original file.
    return this.makeRequest(`/auth/update-profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
}

export const apiService = new ApiService();