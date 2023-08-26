const { defineConfig } = require("@vue/cli-service");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    mode: process.env.NODE_ENV || 'development',
    // optimization: {
    //   minimizer: [
    //     "...",
    //     new ImageMinimizerPlugin({
    //       minimizer: {
    //         implementation: ImageMinimizerPlugin.imageminMinify,
    //         options: {
    //           plugins: [
    //             ["gifsicle", { interlaced: true }],
    //             ["mozjpeg", { progressive: true, quality: 100 }],
    //             ["pngquant", { quality: [0.7, 0.9] }],
    //             [
    //               "svgo",
    //               {
    //                 plugins: [
    //                   {
    //                     name: "preset-default",
    //                     params: {
    //                       overrides: {
    //                         removeViewBox: false,
    //                         addAttributesToSVGElement: {
    //                           params: {
    //                             attributes: [
    //                               { xmlns: "http://www.w3.org/2000/svg" },
    //                             ],
    //                           },
    //                         },
    //                       },
    //                     },
    //                   },
    //                 ],
    //               },
    //             ],
    //           ],
    //         },
    //       },
    //     }),
    //   ],
    // },
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 15000,
        maxSize: 250000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
      },
    },
  },
});
