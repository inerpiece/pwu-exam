module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {'40': '9rem','20': '5rem', '12': '3rem'},
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
