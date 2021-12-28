module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "./src/styles/_base.scss";
            `,
      },
    },
  },
};
