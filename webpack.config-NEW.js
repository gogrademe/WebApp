var path = require("path");
var webpack = require("webpack");
module.exports = {
    // This is the main file that should include all other JS files
    entry: "./src/js/app.js",
    target: "web",
    debug: true,
    // We are watching in the gulp.watch, so tell webpack not to watch
    watch: false,
    // watchDelay: 300,
    output: {
        path: path.join(__dirname, "dist", "assets"),
        publicPath: "/assets/",
        // If you want to generate a filename with a hash of the content (for cache-busting)
        // filename: "main-[hash].js",
        filename: "main.js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        // Tell webpack to look for required files in bower and node
        modulesDirectories: ['src/bower', 'node_modules'],
    },
    module: {
        loaders: [{
            test: /\.css/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.gif/,
            loader: "url-loader?limit=10000&minetype=image/gif"
        }, {
            test: /\.jpg/,
            loader: "url-loader?limit=10000&minetype=image/jpg"
        }, {
            test: /\.png/,
            loader: "url-loader?limit=10000&minetype=image/png"
        }, {
            test: /\.js$/,
            loader: "jsx-loader"
        }, {
            test: /\.woff$/,
            loader: "url-loader?prefix=font/&limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf$/,
            loader: "file-loader?prefix=font/"
        }, {
            test: /\.eot$/,
            loader: "file-loader?prefix=font/"
        }, {
            test: /\.svg$/,
            loader: "file-loader?prefix=font/"
        }],
        noParse: /\.min\.js/
    },
    plugins: [
        // If you want to minify everything
        // new webpack.optimize.UglifyJsPlugin()
    ]
};