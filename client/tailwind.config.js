module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/tw-daterange/dist/index.esm.js",],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primarycolor: "#0a0a27",
        secondarycolor: "#d53b61",
        blackcolor: "#030303",
        lightblue: "#8b8bec",
        graycolor: "#6b7688",
        browncolor: "#46364a",
        whitecolor: "#ffffff",
      },
      backgroundColor:{
          primarycolor: "#0a0a27",
          secondarycolor: "#d53b61",
          blackcolor: "#030303",
          lightblue: "#8b8bec",
          graycolor: "#6b7688",
          browncolor: "#46364a",
          whitecolor: "#ffffff"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      fontFamily:{
        google:['Dancing Script', 'cursive','Sigmar', 'cursive'],
        hometext:['Dancing Script', 'cursive','Sigmar', 'sanserif']
      },
      backgroundImage: {
        "hero-pattern": "url('./src/assets/bgIMG.png')",
      },
    },
  },
  plugins: [],
};
