const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {  // './src/index.js',
        'index':'./src/index.js',
        'index1':'./src/index1.js',
        'index2':'./src/index2.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: [resolve('node_modules')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {  // img loader
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8*1024
                }
            }, {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 75
                    },
                    optipng: {
                        enabled: true
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false
                    }
                }
            }
        ]
      },
      {  //css loader
        test: /\.(s*)css$/,
        loader: 'sass-loader',
         options: {
             sourceMap: true
         },
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ // 多文件入口配置
      hash: true,
      template: './index.html',
      filename: 'index.html', //relative to root of the application
      chunks:['index1','manifest','vendor','common','styles']
    }),
    new HtmlWebpackPlugin({   
      template: './index1.html',
      filename: 'index1.html',
      chunks:['index1','manifest','vendor','common','styles']
    }),
    new HtmlWebpackPlugin({
        template: './index2.html',
        filename: 'index2.html',
        chunks:['index2','manifest','vendor','common','styles']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css"
    })
    // new CleanWebpackPlugin(['dist']),
  ],
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
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
}
