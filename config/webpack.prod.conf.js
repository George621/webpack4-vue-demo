const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

  module: {
    rules: [
      { 
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]---[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require("autoprefixer")],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '@import "./src/styles/_variables.scss";'
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ // 多文件入口配置
      hash: true,
      template: './index.html',
      filename: 'index.html', //relative to root of the application
      chunks: ['index1', 'manifest', 'vendor', 'common', 'styles']
    }),
    new HtmlWebpackPlugin({
      template: './index1.html',
      filename: 'index1.html',
      chunks: ['index1', 'manifest', 'vendor', 'common', 'styles']
    }),
    new HtmlWebpackPlugin({
      template: './index2.html',
      filename: 'index2.html',
      chunks: ['index2', 'manifest', 'vendor', 'common', 'styles']
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css"
    })
    // new CleanWebpackPlugin(['dist']),
  ],
});

module.exports = webpackConfig;