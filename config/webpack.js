var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
      './src/scripts/index.js',
      './src/less/main.less'
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
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin("style.css")
    ] : [
      new webpack.DefinePlugin(
        {
          'process.env.NODE_ENV': '"development"'
          // 'process.env.API_URI': JSON.stringify(process.env.API_URI)
          }
        ),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("style.css"),
      new require('./css-fix-loader.js')()

    ],
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ls']
    },

    module: {
      loaders: [{
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|woff|eot|woff2|ttf|svg)$/,
        loader: 'url-loader?limit=100000' },
      {
        test: /\.(less|config)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
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
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel?experimental'],
        exclude: /node_modules/
      },
      {
        test: /\.ls$/,
        loader: 'livescript-loader'
      }]
    }
  };
};
