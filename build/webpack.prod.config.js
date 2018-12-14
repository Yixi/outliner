const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require(
  "webpack-bundle-analyzer").BundleAnalyzerPlugin
const tsImportPluginFactory = require('ts-import-plugin')

const PORT = 4222;
const HOST = 'http://localhost';
const URL = `${HOST}:${PORT}`;

module.exports = {
  mode: 'production',
  entry: {
    app: '../src/index.tsx'
  },
  output: {
    filename: 'app.[hash:7].js',
    path: path.join(__dirname, '../dist'),
    chunkFilename: "[name].[chunkhash].js",
    publicPath: ''
  },
  context: path.resolve(__dirname, '../src'),
  devtool: 'hidden-source-map',
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "../src"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory([
                    {
                      style: false,
                      libraryName: 'lodash',
                      libraryDirectory: null,
                      camel2DashComponentName: false
                    }

                  ])
                ]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            },
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ]
  },
  stats: {
    cached: true,
    chunks: false,
    chunkModules: false,
    colors: true,
    modules: false,
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
      verbose: true,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new HtmlWebpackPlugin({
      template: "../src/app.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:7].css",
      chunkFilename: "[id].[hash:7].css"
    }),
    new webpack.HashedModuleIdsPlugin(),

    // prints more readable module names in the browser console on HMR updates
    //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin(),
  ],
}
