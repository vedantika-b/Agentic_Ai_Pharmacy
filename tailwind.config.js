/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#0F6D57',
          DEFAULT: '#0F6D57',
        },
        sidebar: {
          dark: '#0A4F41',
        },
        accent: {
          green: '#19A07D',
        },
        background: {
          light: '#F5F7F6',
          dark: '#0B1B2B',
        },
        card: {
          light: '#FFFFFF',
          dark: '#0F2235',
        },
        text: {
          dark: '#1F2937',
          light: '#E5E7EB',
        },
      },
      boxShadow: {
        'card-light': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-dark': '0 0 15px rgba(25, 160, 125, 0.1)',
      },
    },
  },
  plugins: [],
}
