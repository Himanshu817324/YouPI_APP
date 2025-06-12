import { NavigatorScreenParams } from '@react-navigation/native';

// -------- Onboarding Stack --------
export type OnboardingStackParamList = {
  WelcomeScreen: undefined;
  OnboardingScreen: undefined;
};

// -------- Auth Stack --------
export type AuthStackParamList = {
  Login: undefined;
  OTP: { phNo: string };
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
  Profile: undefined;
  Settings: undefined;
  Plans: undefined;
};

// -------- Root Stack --------
export type RootStackParamList = {
  Splash: undefined;
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
  NotFound: undefined;
};
