const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  //environment specific config goes here
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          'vue-style-loader',
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
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: { vue: 'vue/dist/vue.js' }
  },
  optimization: {
    runtimeChunk: {
      "name": "manifest"
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          enforce: true,
          priority: 10,
          name: 'vendor'
        },
        common: {
          chunks: "all",
          minChunks: 2,
          name: 'common',
          enforce: true,
          priority: 5
        }
      }
    }
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
});

module.exports = webpackConfig;