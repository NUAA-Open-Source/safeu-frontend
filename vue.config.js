module.exports = {
  publicPath: "/",
  outputDir: process.env.outputDir,
  assetsDir: "static",
  productionSourceMap: false,
  pages: {
    index: {
      entry:
        process.env.NODE_ENV === "production"
          ? "./src/main.prod.js"
          : "./src/main.dev.js",
      template:
        process.env.NODE_ENV === "production"
          ? "./public/index.prod.html"
          : "./public/index.dev.html",
    },
  },
  devServer: {
    disableHostCheck: true
  }
};
