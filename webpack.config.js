var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    fileName: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit=10000&minetype=image/jpg" },
      { test: /\.png/, loader: "url-loader?limit=10000&minetype=image/png" },
      { test: /\.js$/, loader: "jsx-loader" },
      { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
      { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
      { test: /\.svg$/,    loader: "file-loader?prefix=font/" }
    ]
  },
  console: true,
  cache: true
};