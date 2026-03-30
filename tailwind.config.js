/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary: '#ffbf00',
        'primary-container': '#ffbf00',
        secondary: '#283F3B',
        'moss-green': '#283F3B',
        background: '#e5d1d0',
        'on-background': '#283f3b',
        surface: '#ffffff',
        'surface-variant': '#fcfbf8',
        tertiary: '#2EC4B6',
        'tertiary-container': '#2EC4B6',
        'on-tertiary': '#ffffff',
        'secondary-container': '#FF9F1C',
        error: '#ba1a1a',
        'card-bg': '#fcfbf8',
        'background-light': '#E5D1D0',
        'background-dark': '#231e0f',
        'border-thick': '#283F3B',
        'border-dark': '#283F3B',
        'dict-green': '#679436',
        'dict-red': '#ef4444',
        'beige-custom': '#E5D1D0',
        easy: '#679436',
        hard: '#FF4B2B',
        'shadow-dark': '#283F3B',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        chunky: '4px 4px 0px 0px #283F3B',
        'chunky-sm': '2px 2px 0px 0px #283F3B',
        'chunky-lg': '8px 8px 0px 0px #283F3B',
        'chunky-hover': '2px 2px 0px 0px #283F3B',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
}

