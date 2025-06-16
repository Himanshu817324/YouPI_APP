/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './screen/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        text:{
          light: "#fff",
          dark: "#000"
        },
        background: {
          light: '#e2f8f1',
          dark: '#12141C',
          primary: '#00D09C',
        },
        title: {
          light: '#111111',
          dark: '#ffffff',
        },
        subtitle: {
          light: '#111111',
          dark: '#000',
        },
        primary: '#00D09C',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
