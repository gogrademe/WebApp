var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var shell = require('shelljs');

const RELEASE = process.env.NODE_ENV === 'production';
const VERSION = shell.exec('git describe --tags').output;

const entry = './src/js/index';
module.exports = {
  devtool: RELEASE ? false : 'eval',
  stats: { colors: true },
  entry: RELEASE ? [
    entry
  ] : [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    entry
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: RELEASE ? [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __VERSION__: JSON.stringify(VERSION)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].css')
  ]:[
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(VERSION + "-dev")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.less?$/,
        loader: ExtractTextPlugin.extract('css!less')
      },
      {
        test: /\.gif$/,
        loader: "url-loader?mimetype=image/png"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?stage=0'],
        exclude: /node_modules/
      }
    ]
  }
};
