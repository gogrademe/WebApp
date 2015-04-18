
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

var src = {};
var watch = false;

// The default task
gulp.task('default', ['serve']);

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// 3rd party libraries
gulp.task('vendor', function() {
    return merge(
        gulp.src('./src/semantic/src/themes/default/assets/**/*.*')
        .pipe(gulp.dest(DEST + '/assets'))
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
    src.styles = 'src/less/**';
    return gulp.src(['./src/semantic/src/semantic.less', './src/less/main.less'])
        .pipe($.plumber())
        .pipe($.less({
            paths: [path.join(__dirname, '/src', '/less')],
            sourceMap: !RELEASE,
            sourceMapBasepath: __dirname
        }))
        .on('error', console.error.bind(console))
        .pipe($.concat('styles.css'))
        .pipe($.if(RELEASE, $.minifyCss()))
        .pipe(gulp.dest(DEST + '/css'))
        .pipe($.size({
            title: 'styles'
        }));
});

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
        gulp.watch(src.styles, ['styles']);
        gulp.start('webpack-dev-server');
        cb();
    });
});
