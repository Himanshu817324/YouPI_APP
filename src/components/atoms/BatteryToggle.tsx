import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BatteryToggleProps {
  isOn: boolean;
  onToggle: () => void;
  glowAnim: Animated.Value;
}

export const BatteryToggle = ({ isOn, onToggle, glowAnim }: BatteryToggleProps) => (
  <TouchableOpacity
    onPress={onToggle}
    style={[
      styles.container,
      isOn ? styles.containerActive : styles.containerInactive,
    ]}
    activeOpacity={0.7}
  >
    <Animated.View
      style={[
        styles.iconWrapper,
        { transform: [{ scale: isOn ? glowAnim : 1 }] },
      ]}
    >
      <Ionicons
        name={isOn ? 'battery-charging' : 'battery-dead'}
        size={24}
        color={isOn ? '#4ADE80' : '#9CA3AF'}
      />
    </Animated.View>
    {isOn && (
      <View
        style={[
          styles.activeIndicator,
          styles.activeIndicatorColor,
        ]}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  containerActive: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
  },
  containerInactive: {
    backgroundColor: 'rgba(156, 163, 175, 0.2)',
  },
  iconWrapper: {
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 10,
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 6,
  },
  activeIndicatorColor: {
    backgroundColor: '#4ADE80',
  },
});
