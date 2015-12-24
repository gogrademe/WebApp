var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [{
      test: /\.less?$/,
      loader: 'style!css!less'
    }, {
      test: /\.(gif|png)?$/,
      loader: 'url-loader?mimetype=image/png'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=[name].[ext]'
    }, {
      test: /\.(js)?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src/js'),
      exclude: /node_modules/
    }]
  }
};
