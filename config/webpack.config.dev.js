var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var getClientEnvironment = require('./env');
var path = require('path');
var paths = require('./paths');

var publicPath = '/';

var publicUrl = '';
// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);


module.exports = {
  devtool: 'eval',
  entry: [
    // 'webpack-hot-middleware/client',
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs
  ],

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: 'bundle.js',
  //   publicPath: '/static/'
  // },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/bundle.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath
  },
  plugins: [
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(env),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.less?$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js)?$/,
        loaders: ['babel'],
        include: paths.appSrc,
        exclude: /node_modules/
      }
    ],
    preLoaders: [
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
