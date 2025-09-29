/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        fg: 'var(--color-fg)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0, 0%, 0%, 0.1)',
        'neon': '0 0 20px var(--color-accent)',
        'neon-lg': '0 0 40px var(--color-accent)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { boxShadow: '0 0 5px var(--color-accent)' },
          '100%': { boxShadow: '0 0 20px var(--color-accent), 0 0 30px var(--color-accent)' },
        },
        'glow': {
          '0%': { textShadow: '0 0 5px var(--color-accent)' },
          '100%': { textShadow: '0 0 10px var(--color-accent), 0 0 15px var(--color-accent)' },
        },
      },
    },
  },
  plugins: [],
}
