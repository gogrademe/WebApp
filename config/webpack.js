/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

var webpack = require('webpack');

module.exports = function (release) {
  return {
    output: {
      path: release ? './build/' : '/stage/',
      filename: 'app.js',
      publicPath: release ? '/build/' : '/stage/'
    },

    cache: !release,
    debug: !release,
    devtool: release ? false : "#inline-source-map",
    entry: [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './src/scripts/index.js'
    ],
    stats: {
      colors: true,
      reasons: !release
    },

    plugins: release ? [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.NewWatchingPlugin()
    ],

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ls']
    },

    module: {
      preLoaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint'
      }],
      loaders: [{
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      // {
      //   exclude: /node_modules/,
      //   test: /\.(js|jsx)$/,
      //   loader: 'sweetjs?modules[]=./macros.sjs,readers[]=jsx-reader'
      // },
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'jsx?harmony&stripTypes']
      },
      {
        test: /\.ls$/,
        loader: 'livescript-loader'
      }]
    }
  };
};
