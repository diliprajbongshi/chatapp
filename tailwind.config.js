/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nun: ["Nunito", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
      },
      colors: {
        headingOne: "#11175D",
        para: "#11175D",
        primary: "#5F35F5",
      },
      screens: {
        sm: "375px",
        sml: "415px",
        md: "768px",
   
      },
    },
  },
};
