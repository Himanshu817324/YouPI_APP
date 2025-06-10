import { NavigatorScreenParams } from '@react-navigation/native';

// -------- Onboarding Stack --------
export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
};

// -------- Auth Stack --------
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// -------- Main Tab Stack --------
export type TabStackParamList = {
  Home: undefined;
  Wallet: undefined;
  Activity: undefined;
  Profile: undefined;
};

// -------- Main Stack --------
export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabStackParamList>;
};

// -------- Root Stack --------
export type RootStackParamList = {
  Splash: undefined;
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
  NotFound: undefined;
};
