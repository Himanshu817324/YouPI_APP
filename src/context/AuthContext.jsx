import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

// 1. Create context
export const AuthContext = createContext();

// 2. Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 3. Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const onboarded = await AsyncStorage.getItem('hasOnboarded');
        if (storedUser) setUser(JSON.parse(storedUser));
        if (onboarded === 'true') setHasOnboarded(true);
      } catch (e) {
        console.error('Failed to load state', e);
      } finally {
        setLoading(false);
      }
    };
    loadState();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const completeOnboarding = async () => {
    setHasOnboarded(true);
    await AsyncStorage.setItem('hasOnboarded', 'true');
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, hasOnboarded, completeOnboarding }}
    >
      {children}
    </AuthContext.Provider>
  );
};