var express = require('express');
var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");

var app = express();
var compiler = webpack(require('./webpack.config'));

app.use(express.static(__dirname + '/build'));

app.use(webpackMiddleware(compiler), {
    // all options optional

    noInfo: false,
    // display no info to console (only warnings and errors)

    quiet: false,
    // display nothing to the console

    lazy: true,
    // switch into lazy mode
    // that means no watching, but recompilation on every request

    watchDelay: 300,
    // delay after change (only lazy: false)

    publicPath: "/build/assets/",
    // public path to bind the middleware to
    // use the same as in webpack

    headers: { "X-Custom-Header": "yes" },
    // custom headers

    stats: {
        colors: true
    }
    // options for formating the statistics
}));
server.listen(8020, "localhost", function() {console.log('listening')});