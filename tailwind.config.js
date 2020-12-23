module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,md}"],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    container: false
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
        }
      })
    }
  ],
};
