const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/mushroom-strategy.ts",
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "mushroom-strategy.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
