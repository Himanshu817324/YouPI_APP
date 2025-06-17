/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './screen/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Poppins', 'ui-sans-serif', 'system-ui'],
        serif: ['Georgia', 'ui-serif', 'serif'],
        mono: ['SFMono-Regular', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
        fontWeight: {
          hairline: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      colors: {
        text: {
          light: '#111827',
          dark: '#F9FAFB',
        },
        textPrimary: {
          light: '#F8F8FF',
          dark: '#FFFFFF',
        },
        textSecondary: {
          light: '#004D40',
          dark: '#FFFFFF',
        },
        subText: {
          light: '#4B5563',
          dark: '#9CA3AF',
        },
        subTitle: {
          light: '#1F2937',
          dark: '#D1D5DB',
        },
        textMuted: {
          light: '#6B7280',
          dark: '#9CA3AF',
        },
        textWallet: {
          primary: {
            light: '#111111',
            dark: '#F8F8FF',
          },
          secondary: {
            light: '#111827',
            dark: '#F0F0F0',
          },
        },
        toggle: {
          on: '#00D09C',
          off: '#9CA3AF', //0F172A  1F2937
        },
        background: {
          light: '#e2f8f1',
          dark: '#111827',
          gray: '#ceffe0',
        },
        foreground: {
          light: '#F8FAFC',
          dark: '#1E293B',
        },
        primary: {
          light: '#A3FFE2',
          dark: '#00D09C',
        },
        primaryBackground: {
          light: '#F9FAFB',
          dark: '#1E1F29',
        },
        secondary: {
          light: '#E5E7EB',
          dark: '#2f3130',
        },
        warning: {
          light: '#EF4444',
          dark: '#EF4444',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
        'card-foreground': {
          light: '#1E293B',
          dark: '#F8FAFC',
        },
        popover: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
        'popover-foreground': {
          light: '#1E293B',
          dark: '#F8FAFC',
        },
        'primary-foreground': {
          light: '#FFFFFF',
          dark: '#FFFFFF',
        },
        'secondary-foreground': {
          light: '#111827',
          dark: '#F9FAFB',
        },
        muted: {
          light: '#E5E7EB',
          dark: '#374151',
        },
        'muted-foreground': {
          light: '#6B7280',
          dark: '#9CA3AF',
        },
        accent: {
          light: '#E0F2FE',
          dark: '#075985',
        },
        'accent-foreground': {
          light: '#0C4A6E',
          dark: '#E0F2FE',
        },
        destructive: {
          light: '#EF4444',
          dark: '#7F1D1D',
        },
        'destructive-foreground': {
          light: '#FFFFFF',
          dark: '#FECACA',
        },
        border: {
          light: '#E5E7EB',
          dark: '#1F2937',
        },
        input: {
          light: '#F3F4F6',
          dark: '#1F2937',
        },
        ring: {
          light: '#3B82F6',
          dark: '#60A5FA',
        },
        sidebar: {
          background: {
            light: '#F3F4F6',
            dark: '#111827',
          },
          foreground: {
            light: '#1F2937',
            dark: '#F9FAFB',
          },
          primary: {
            light: '#1E40AF',
            dark: '#3B82F6',
          },
          'primary-foreground': {
            light: '#FFFFFF',
            dark: '#FFFFFF',
          },
          accent: {
            light: '#E5E7EB',
            dark: '#1F2937',
          },
          'accent-foreground': {
            light: '#111827',
            dark: '#F9FAFB',
          },
          border: {
            light: '#E5E7EB',
            dark: '#374151',
          },
          ring: {
            light: '#60A5FA',
            dark: '#3B82F6',
          },
        },
      },
    },
  },
  plugins: [],
};
