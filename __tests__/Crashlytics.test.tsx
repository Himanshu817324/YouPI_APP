/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { crashlyticsInstance, logCrashlyticsEvent, setCrashlyticsUserId, recordCrashlyticsError } from '../src/config/firebase';

// Mock Firebase Crashlytics
jest.mock('@react-native-firebase/crashlytics', () => ({
  __esModule: true,
  default: () => ({
    log: jest.fn(),
    setUserId: jest.fn(),
    setAttribute: jest.fn(),
    recordError: jest.fn(),
    setCrashlyticsCollectionEnabled: jest.fn(),
  }),
}));

describe('Crashlytics Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('crashlyticsInstance should be defined', () => {
    expect(crashlyticsInstance).toBeDefined();
  });

  test('logCrashlyticsEvent should call crashlytics log', () => {
    const mockLog = jest.fn();
    crashlyticsInstance.log = mockLog;
    
    logCrashlyticsEvent('test_event', { key: 'value' });
    
    expect(mockLog).toHaveBeenCalledWith('test_event');
  });

  test('setCrashlyticsUserId should call crashlytics setUserId', () => {
    const mockSetUserId = jest.fn();
    crashlyticsInstance.setUserId = mockSetUserId;
    
    setCrashlyticsUserId('test_user_123');
    
    expect(mockSetUserId).toHaveBeenCalledWith('test_user_123');
  });

  test('recordCrashlyticsError should call crashlytics recordError', () => {
    const mockRecordError = jest.fn();
    crashlyticsInstance.recordError = mockRecordError;
    
    const testError = new Error('Test error');
    recordCrashlyticsError(testError, 'test_context');
    
    expect(mockRecordError).toHaveBeenCalledWith(testError);
  });

  test('should handle errors gracefully when crashlytics fails', () => {
    // Mock console.error to avoid test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Make crashlytics methods throw errors
    crashlyticsInstance.log = jest.fn().mockImplementation(() => {
      throw new Error('Crashlytics error');
    });
    
    // Should not throw
    expect(() => {
      logCrashlyticsEvent('test_event');
    }).not.toThrow();
    
    consoleSpy.mockRestore();
  });
});
