const { defineConfig } = require("@vue/cli-service");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: "asset",
        },
      ],
    },
    optimization: {
      minimizer: [
        "...",
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["mozjpeg", { progressive: true, quality: 100 }],
                ["pngquant", { quality: [0.7, 0.9] }],
                [
                  "svgo",
                  {
                    plugins: [
                      {
                        name: "preset-default",
                        params: {
                          overrides: {
                            removeViewBox: false,
                            addAttributesToSVGElement: {
                              params: {
                                attributes: [
                                  { xmlns: "http://www.w3.org/2000/svg" },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],
    },
  },
});
