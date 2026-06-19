import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{ts,tsx}',
    './index.html',
    './*/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        forest: {
          DEFAULT: '#1C3A35',
          dark: '#152E29',
        },
        gold: '#C9A96E',
      },
    },
  },
  plugins: [],
} satisfies Config
