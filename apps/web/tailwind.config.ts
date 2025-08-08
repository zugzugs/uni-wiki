import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './styles/**/*.{ts,tsx,css}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'hsl(262 83% 58%)',
          foreground: 'hsl(0 0% 100%)'
        },
        accent: {
          DEFAULT: 'hsl(189 94% 43%)',
          foreground: 'hsl(0 0% 100%)'
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(ellipse at top, rgba(124,58,237,0.35), transparent 55%), radial-gradient(ellipse at bottom, rgba(34,211,238,0.25), transparent 55%)'
      }
    }
  },
  plugins: [animate]
} satisfies Config