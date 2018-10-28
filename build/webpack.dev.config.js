const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const PORT = 4222;
const HOST = 'http://localhost';
const URL = `${HOST}:${PORT}`;

module.exports = {
  mode: 'development',
  entry: [
    '../src/index.tsx'
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, '../dist'),
    publicPath: ''
  },
  context: path.resolve(__dirname, '../src'),
  devtool: 'source-map',
  devServer: {
    stats: {
      cached: true,
      chunkModules: false,
      colors: true
    },
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, '../src'),
    port: PORT,
    publicPath: URL,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "../src"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
      tslint: path.resolve(__dirname, "../tslint.json"),
    }),

    new HtmlWebpackPlugin({
      template: "../src/app.html",
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

  ],
}
