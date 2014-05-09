var gulp = require('gulp');
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var util = require('gulp-util')
var less = require('gulp-less');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var webpack = require("webpack");


var webpackConfig = require("./webpack.config.js");

var dist = './build';
var src = './src';
var libs = ['react', 'jquery', 'backbone', 'es6-promise', 'superagent', 'events'];


gulp.task('clean', function() {
    return gulp.src('build', {
        read: false
    }).pipe(clean());
});

// gulp.task('less', function () {
//   gulp.src('./src/less/styles.less')
//     .pipe(plumber())
//     .pipe(less({
//       paths: [path.join(__dirname, 'less', 'includes')]
//     }))
//     .pipe(gulp.dest('./build/assets'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });

gulp.task('browser-sync', function () {
  browserSync.init([src + '/index.html'], {
    notify: true,
    ghostMode: false,
    open: false,
    server: {
      baseDir: dist

    }
  });
});

gulp.task('copy', function () {
 // Copy html
 gulp.src(src + '/index.html')
   .pipe(gulp.dest(dist));
gulp.src(src + '/img/*.*')
   .pipe(gulp.dest(dist + '/assets/img'));
gulp.src(src + '/bower/fontawesome/fonts/*.*')
  .pipe(gulp.dest(dist + '/assets/fonts'));
   //     gulp.src(src + '/bower/**/*')
   // .pipe(gulp.dest(dist + '/bower'));

});
// gulp.task('libs', function () {
//   return browserify()
//     .require(libs)
//     .bundle()
//     .on('error', util.log)
//     .pipe(source('libs.js'))
//     .pipe(gulp.dest('./dist'));
// });
// gulp.task('browserify-watch', function() {
//     var bundler = watchify('./src/js/GoGradeApp.jsx')

//     bundler.transform(reactify)
//     bundler.on('update', rebundle)

//   function rebundle () {
//     return bundler
//       .external(libs)
//       .bundle({debug: true})
//       .on('error', util.log)
//       .pipe(source('bundle.js'))
//       .pipe(gulp.dest('./dist'))
//       .pipe(browserSync.reload({
//         stream: true
//     }));
//   }
//   return rebundle();
// });
gulp.task('webpack', function(callback) {
    execWebpack(webpackConfig);
    return callback();
});
var execWebpack = function(config) {
    return webpack(config, function(err, stats) {
        if (err) {
            throw new util.PluginError("execWebpack", err);
        }
        return util.log("[execWebpack]", stats.toString({
            colors: true
        }));
    });
};


gulp.task('watch', function () {
  gulp.watch('src/index.html', ['copy'])
  // gulp.watch('src/less/*.less', ['less']);
  gulp.watch(src + '/js/**/*.*');

  gulp.watch('./build/**/*.*', function(){
    browserSync.reload();
  });
});

gulp.task('build', function(){
  gulp.start('webpack', 'copy');
})

// Default Task
gulp.task('default', ['build'], function () {
  gulp.start('watch','browser-sync');
});