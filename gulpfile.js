var gulp = require('gulp');
var path = require('path');


var less = require('gulp-less');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

var dist = './dist';
var src = './src';


gulp.task('less', function () {
  gulp.src('./src/less/styles.less')
    .pipe(plumber())
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browser-sync', function () {
  browserSync.init([src + '/index.html', src + '/js/**', src + '/modules/**/*.*'], {
    notify: true,
    ghostMode: false,
    server: {
      baseDir: src
    }
  });
});

//gulp.task('copy', function () {
//  // Copy html
//  gulp.src(src + '/modules/**')
//    .pipe(gulp.dest(dist + '/modules'));
//  gulp.src(src + '/index.html')
//    .pipe(gulp.dest(dist));
//  gulp.src(src + '/js/**')
//    .pipe(gulp.dest(dist + '/js'));
//
//});

gulp.task('watch', function () {

  gulp.watch('src/less/*.less', ['less']);
  //  gulp.watch(src + '/modules/**', ['copy']);

  //  gulp.watch(src + '*.html', ['bs-reload']);


});

// Default Task
gulp.task('default', function () {
  gulp.start('watch', 'browser-sync');
});