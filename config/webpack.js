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
      new webpack.NoErrorsPlugin()
    ],
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    module: {
      loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel?experimental'],
        exclude: /node_modules/
      }]
    }
  };
};
