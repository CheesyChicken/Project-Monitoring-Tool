const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const plugins =
  process.env.NODE_ENV === "production" ? [new BundleAnalyzerPlugin()] : [];
module.exports = {
  devServer: {
    // proxy: 'http://103.97.164.116',
    // disableHostCheck: true,
    // publicPath:process.env.NODE_ENV === 'production',
    port: 10026,
  },

  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins,
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
};
