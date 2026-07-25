/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        sidebar: {
          DEFAULT: '#1E3A8A',
          hover: '#1E40AF',
          active: '#1D4ED8',
        },
        healthBg: '#F8FAFC',
        cardBorder: '#E2E8F0',
        textPrimary: '#1E293B',
        textSecondary: '#64748B',
        healthSuccess: '#16A34A',
        healthWarning: '#F59E0B',
        healthDanger: '#DC2626',
        healthInfo: '#0EA5E9',
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card-soft': '0 4px 20px -2px rgba(30, 41, 59, 0.05)',
        'card-hover': '0 10px 25px -3px rgba(37, 99, 235, 0.1)',
        'government': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
