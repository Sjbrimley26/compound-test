const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./lambda.js",

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "lambda.js",
    library: "lambda",
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },

  target: 'node',

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ]
  },

  externals: [
    "long",
    "uglify-es",
    "uglify-es/package.json"
  ]
};
