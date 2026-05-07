export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      degulardisplay: ['Degular Display', 'sans-serif'], 
      },
      boxShadow: {
        'brand-sm': '0px 4px 8px 0px #5C738314',
        'brand-md': '0px 6px 12px 0px #5C738314',
      },
    },
  },
  plugins: [],
}