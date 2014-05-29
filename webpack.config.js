var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: {
    app: './src/scripts/app.js'
  },
  target: 'web',
  watch: true,
  debug: true,
  output: {
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: '/assets/',
    fileName: 'main.js',
    chunkFilename: "[hash]/js/[id].js",
  },
  // resolve: {
  //       // Tell webpack to look for required files in bower and node
  //       modulesDirectories: ['bower', '../node_modules'],
  // },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM&harmony=true" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit=10000&minetype=image/jpg" },
      { test: /\.png/, loader: "url-loader?limit=10000&minetype=image/png" },
      { test: /\.js$/, loader: "jsx-loader?harmony=true" },
      { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
      { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
      { test: /\.svg$/,    loader: "file-loader?prefix=font/" }
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    //   new webpack.DefinePlugin({
    //   "process.env": {
    //     "NODE_ENV": JSON.stringify("production")
    //   }
    // }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin()
  ]
};


// var path = require("path");
// var webpack = require("webpack");
// module.exports = {
//   entry: {
//     app: './src/js/GoGradeApp.jsx'
//   },
//   output: {
//     path: path.join(__dirname, 'build'),
//     publicPath: 'build/',
//     fileName: '[name].js',
//     chunkFilename: '[chunkhash].js'
//   },
//   // resolve: {
//   //       // Tell webpack to look for required files in bower and node
//   //       modulesDirectories: ['bower', '../node_modules'],
//   // },
//   module: {
//     loaders: [
//       { test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM" },
//       { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
//       { test: /\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
//       { test: /\.jpg/, loader: "url-loader?limit=10000&minetype=image/jpg" },
//       { test: /\.png/, loader: "url-loader?limit=10000&minetype=image/png" },
//       { test: /\.js$/, loader: "jsx-loader" },
//       { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=10000&mimetype=application/font-woff" },
//       { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
//       { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
//       { test: /\.svg$/,    loader: "file-loader?prefix=font/" }
//     ]
//   },
//   console: true,
//   cache: true
// };