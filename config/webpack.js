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
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
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
        test: /\.(png|woff)$/,
        loader: 'url-loader?limit=100000' },
      {
        test: /\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          require.resolve("./css-fix-loader.js"),
          "less-loader"
        ]
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      { test: /\.(eot|woff)$/, loader: 'file' },
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
