// app/context/OnboardingContext.js (simplified)
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@onboardingCompleted').then((value) => {
      if (value === 'true') setOnboardingCompleted(true);
      setLoading(false);
    });
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('@onboardingCompleted', 'true');
    setOnboardingCompleted(true);
  };

  return (
    <OnboardingContext.Provider
      value={{ onboardingCompleted, loading, completeOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};