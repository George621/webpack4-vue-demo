const path = require('path');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {  // './src/index.js',
    'index': './src/index.js',
    'index1': './src/index1.js',
    'index2': './src/index2.js',
  },
  output: {
    filename: '[name].[hash:6].js',
    chunkFilename: '[name].[hash:6].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({ 
      hash: true,
      template: './index.html',
      filename: 'index.html', //relative to root of the application
      chunks: ['index1', 'manifest', 'vendor', 'common', 'styles']
    }),
    // new HtmlWebpackPlugin({  // 多文件入口配置
    //   template: './index1.html',
    //   filename: 'index1.html',
    //   chunks: ['index1', 'manifest', 'vendor', 'common', 'styles']
    // }),
    // new HtmlWebpackPlugin({
    //   template: './index2.html',
    //   filename: 'index2.html',
    //   chunks: ['index2', 'manifest', 'vendor', 'common', 'styles']
    // }),
  ]

};