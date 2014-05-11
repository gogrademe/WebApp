var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var express = require('express');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var rev = require('gulp-rev');
var tiny_lr = require('tiny-lr');
var webpack = require("webpack");

var webpackConfig = require("./webpack.config.js");

if (gulp.env.production) {
    webpackConfig.plugins = webpackConfig.plugins.concat(new webpack.optimize.UglifyJsPlugin());
    webpackConfig.output.filename = "main-[hash].js";
}

httpPort = 4000;

gulp.task('clean', function() {
    return gulp.src('build', {
        read: false
    }).pipe(clean());
});

// gulp.task('sass', function() {
//     return gulp.src('src/styles/main.scss').pipe(sass(sassConfig).on('error', gutil.log)).pipe(gulp.env.production ? minifyCSS() : gutil.noop()).pipe(gulp.env.production ? rev() : gutil.noop()).pipe(gulp.dest('dist/assets'));
// });

gulp.task('vendor', function() {
    var paths;
    paths = vendorPaths.map(function(p) {
        return path.resolve("./bower_components", p);
    });
    return gulp.src(paths).pipe(gulp.dest('dist/assets/vendor'));
});

gulp.task('copy', function() {
    return gulp.src(['src/**/*', '!src/scripts', '!src/scripts/**/*', '!src/styles', '!src/styles/**/*']).pipe(gulp.dest('dist'));
});

gulp.task('webpack', function(callback) {
    execWebpack(webpackConfig);
    return callback();
});

gulp.task('dev', ['build'], function() {
    var servers;
    servers = createServers(httpPort, 35729);
    gulp.watch(['./src/**/*'], function(evt) {
        return gulp.run('build');
    });
    return gulp.watch(['./dist/**/*'], function(evt) {
        gutil.log(gutil.colors.cyan(evt.path), 'changed');
        return servers.lr.changed({
            body: {
                files: [evt.path]
            }
        });
    });
});

gulp.task('build', ['webpack', 'sass', 'copy', 'vendor'], function() {});

gulp.task('default', ['build'], function() {
    return setTimeout(function() {
        gutil.log("**********************************************");
        gutil.log("* gulp              (development build)");
        gutil.log("* gulp clean        (rm /dist)");
        gutil.log("* gulp --production (production build)");
        gutil.log("* gulp dev          (build and run dev server)");
        return gutil.log("**********************************************");
    }, 3000);
});
execWebpack = function(config) {
    return webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("execWebpack", err);
        }
        return gutil.log("[execWebpack]", stats.toString({
            colors: true
        }));
    });
};
RunLink