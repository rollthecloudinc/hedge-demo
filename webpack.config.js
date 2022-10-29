const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: __dirname + '/dist/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ]
};