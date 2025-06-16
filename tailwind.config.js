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
      colors: {
        text:{
          light: "#fff",
          dark: "#000"
        },
        background: {
          light: '#e2f8f1',
          dark: 'hsl(222.2 84% 4.9%)',
        },
        foreground: {
          light: 'hsl(222.2 84% 4.9%)',
          dark: 'hsl(210 40% 98%)',
        },
        card: {
          light: 'hsl(0 0% 100%)',
          dark: 'hsl(222.2 84% 4.9%)',
        },
        'card-foreground': {
          light: 'hsl(222.2 84% 4.9%)',
          dark: 'hsl(210 40% 98%)',
        },
        popover: {
          light: 'hsl(0 0% 100%)',
          dark: 'hsl(222.2 84% 4.9%)',
        },
        'popover-foreground': {
          light: 'hsl(222.2 84% 4.9%)',
          dark: 'hsl(210 40% 98%)',
        },
        primary: {
          light: 'hsl(222.2 47.4% 11.2%)',
          dark: 'hsl(210 40% 98%)',
        },
        'primary-foreground': {
          light: 'hsl(210 40% 98%)',
          dark: 'hsl(222.2 47.4% 11.2%)',
        },
        secondary: {
          light: 'hsl(210 40% 96.1%)',
          dark: 'hsl(217.2 32.6% 17.5%)',
        },
        'secondary-foreground': {
          light: 'hsl(222.2 47.4% 11.2%)',
          dark: 'hsl(210 40% 98%)',
        },
        muted: {
          light: 'hsl(210 40% 96.1%)',
          dark: 'hsl(217.2 32.6% 17.5%)',
        },
        'muted-foreground': {
          light: 'hsl(215.4 16.3% 46.9%)',
          dark: 'hsl(215 20.2% 65.1%)',
        },
        accent: {
          light: 'hsl(210 40% 96.1%)',
          dark: 'hsl(217.2 32.6% 17.5%)',
        },
        'accent-foreground': {
          light: 'hsl(222.2 47.4% 11.2%)',
          dark: 'hsl(210 40% 98%)',
        },
        destructive: {
          light: 'hsl(0 84.2% 60.2%)',
          dark: 'hsl(0 62.8% 30.6%)',
        },
        'destructive-foreground': {
          light: 'hsl(210 40% 98%)',
          dark: 'hsl(210 40% 98%)',
        },
        border: {
          light: 'hsl(214.3 31.8% 91.4%)',
          dark: 'hsl(217.2 32.6% 17.5%)',
        },
        input: {
          light: 'hsl(214.3 31.8% 91.4%)',
          dark: 'hsl(217.2 32.6% 17.5%)',
        },
        ring: {
          light: 'hsl(222.2 84% 4.9%)',
          dark: 'hsl(212.7 26.8% 83.9%)',
        },
        sidebar: {
          background: {
            light: 'hsl(0 0% 98%)',
            dark: 'hsl(240 5.9% 10%)',
          },
          foreground: {
            light: 'hsl(240 5.3% 26.1%)',
            dark: 'hsl(240 4.8% 95.9%)',
          },
          primary: {
            light: 'hsl(240 5.9% 10%)',
            dark: 'hsl(224.3 76.3% 48%)',
          },
          'primary-foreground': {
            light: 'hsl(0 0% 98%)',
            dark: 'hsl(0 0% 100%)',
          },
          accent: {
            light: 'hsl(240 4.8% 95.9%)',
            dark: 'hsl(240 3.7% 15.9%)',
          },
          'accent-foreground': {
            light: 'hsl(240 5.9% 10%)',
            dark: 'hsl(240 4.8% 95.9%)',
          },
          border: {
            light: 'hsl(220 13% 91%)',
            dark: 'hsl(240 3.7% 15.9%)',
          },
          ring: {
            light: 'hsl(217.2 91.2% 59.8%)',
            dark: 'hsl(217.2 91.2% 59.8%)',
          },
        },
      },
    },
  },
  plugins: [],
};
