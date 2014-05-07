var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var compiler = webpack(require('./webpack.config'));
var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options
    contentBase: "./build",
    // or: contentBase: "http://localhost/",

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point

    // webpack-dev-middleware options
    quite: false,
    noInfo: false,
    lazy: true,
    watchDelay: 300,
    publicPath: "/assets/",
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
});
server.listen(8020, "localhost", function() {});