/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'blue': {
        'light': "#C8E7F9",
        'dark': "#2C582",
      },
      'purple': {
        'light': "#EFE2FE",
        'dark': "#574195",
      },
      'pink': {
        'light': "#FEDDE6",
        'dark': "#922B6C",
      },
      'orange': {
        'light': "#FEECB8",
        'dark': "#91472C",
      },
      'klaus-blue': '#475DE5',
      'gray': {
        'light': '#E5E5E5',
        'dark': '#718096', 
      },
      'gray-blue': '#EDF2F7',
      'highlight-gray': '#F7FAFC',
      'black': '#1A202C'
    },
    extend: {},
  },
  plugins: [],
};
