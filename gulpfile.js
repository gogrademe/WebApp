/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var WebpackDevServer = require('webpack-dev-server');

// Settings
var RELEASE = !!argv.release; // Minimize and optimize during a build?
var DEST = RELEASE ? './build' : './stage'; // The build output folder
// var AUTOPREFIXER_BROWSERS = [ // https://github.com/ai/autoprefixer
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
// ];

var src = {};
var watch = false;

// The default task
gulp.task('default', ['serve']);

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// 3rd party libraries
gulp.task('vendor', function() {
    return merge(
        gulp.src('./src/semantic/build/packaged/themes/**/*.*')
        .pipe(gulp.dest(DEST + '/themes'))
    );
});

// Static files
gulp.task('assets', function() {
    src.assets = 'src/assets/**';
    return gulp.src(src.assets)
        .pipe($.changed(DEST))
        .pipe(gulp.dest(DEST))
        .pipe($.size({
            title: 'assets'
        }));
});

// HTML pages
gulp.task('pages', function() {
    src.pages = 'src/pages/**/*.html';
    return gulp.src(src.pages)
        .pipe($.changed(DEST))
        .pipe($.if(RELEASE, $.htmlmin({
            removeComments: true,
            collapseWhitespace: true
        })))
        .pipe(gulp.dest(DEST));
});



// CSS style sheets
gulp.task('styles', function() {
    src.styles = 'src/less/main.less';
    return gulp.src(['./src/semantic/src/**/*.less', './src/less/main.less'])
        .pipe($.plumber())
        .pipe($.less({
            paths: [path.join(__dirname, '/src', '/less')],
            sourceMap: !RELEASE,
            sourceMapBasepath: __dirname
        }))
        .on('error', console.error.bind(console))
        .pipe($.concat('styles.css'))
        // .pipe($.autoprefixer({
        //     browsers: AUTOPREFIXER_BROWSERS
        // }))
        .pipe($.if(RELEASE, $.minifyCss()))
        .pipe(gulp.dest(DEST + '/css'))
        .pipe($.size({
            title: 'styles'
        }));
});

// Build the app from source code
gulp.task('build', ['clean'], function(cb) {
    runSequence(['vendor', 'assets', 'pages', 'styles'], cb);
});


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var config = require('./config/webpack.js')(RELEASE);

    new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      hot: true,
      stats: { colors: true },
    }).listen(3000, '0.0.0.0', function (err, result) {
      if (err) {
        console.log(err);
      }

      console.log('Listening at 0.0.0.0:3000');
    });
});



// Launch a lightweight HTTP Server
gulp.task('serve', function(cb) {

    watch = true;

    runSequence('build', function() {
        gulp.start('webpack-dev-server');

        gulp.watch(src.styles, ['styles']);
        cb();
    });
});
