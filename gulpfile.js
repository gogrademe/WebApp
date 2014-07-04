var gulp = require('gulp');
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var liveify = require('liveify');
var watchify = require('watchify');
var util = require('gulp-util')
var less = require('gulp-less');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');


var build = './build';
var src = './src';


gulp.task('clean', function() {
    return gulp.src('build', {
        read: false
    }).pipe(clean());
});

gulp.task('less', function () {
  gulp.src('./src/less/styles.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./build/assets'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browser-sync', function () {
  browserSync.init([build + '/index.html'], {
    notify: false,
    ghostMode: false,
    open: false,
    server: {
      baseDir: build,
      middleware: [
        modRewrite(['!\.html|\.woff|\.js|\.ttf|\.svg|\.css|\.png$ /index.html [L]'])
      ]
    }
  });
});

gulp.task('copy', function () {
 // Copy html
 gulp.src(src + '/index.html')
   .pipe(gulp.dest(build));
gulp.src(src + '/img/*.*')
   .pipe(gulp.dest(build + '/assets/img'));
gulp.src(src + '/bower/fontawesome/fonts/*.*')
  .pipe(gulp.dest(build + '/assets/fonts'));
   //     gulp.src(src + '/bower/**/*')
   // .pipe(gulp.dest(build + '/bower'));

});

gulp.task('browserify-watch', function() {
    var bundler = watchify('./src/scripts/index.ls')

    bundler.transform(liveify)
    bundler.on('update', rebundle)

  function rebundle () {
    return bundler
      .bundle({debug: true})
      .pipe(plumber())
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build'))
      .pipe(browserSync.reload({
        stream: true
    }));
  }
  return rebundle();
});

gulp.task('watch', function () {
  gulp.start('browserify-watch');
  gulp.watch('src/index.html', ['copy'])
  gulp.watch('src/less/*.less', ['less']);
  // gulp.watch(src + '/js/**/*.*', ['browserify-watch);

});

// Default Task
gulp.task('default',['clean'], function () {
  gulp.start('copy', 'less', 'watch','browser-sync');
});
