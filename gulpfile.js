var gulp = require('gulp');
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');

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
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browser-sync', function () {
  browserSync.init([src + '/index.html', src + '/modules/**/*.*'], {
    notify: true,
    ghostMode: false,
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
   .pipe(gulp.dest(dist + '/img'));
       gulp.src(src + '/bower/**/*')
   .pipe(gulp.dest(dist + '/bower'));
 // gulp.src(src + '/js/**')
 //   .pipe(gulp.dest(dist + '/js'));

});
// gulp.task('browserify', function() {
//     return browserify({
//       extensions: ['.js'],
//       entries: ['./src/js/app.js']

//     })
//     .transform(reactify)
//         // .bundle({debug: true})
//         //Pass desired output filename to vinyl-source-stream
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('./dist/'));
//         // .pipe(browserSync.reload());
//         // Start piping stream to tasks!
//         // .pipe(gulp.dest('./build/'));
// });
gulp.task('browserify-watch', function() {
    var bundler = watchify('./src/js/app.js')

    bundler.transform(reactify)
    bundler.on('update', rebundle)

  function rebundle () {
    return bundler.bundle()
    .pipe(plumber())
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist'))
         .pipe(browserSync.reload({
      stream: true
    }));
  }
  return rebundle();
});

gulp.task('watch', function () {
  gulp.watch('src/index.html', ['copy'])
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch(src + '/js/**/*.*');
  //  gulp.watch(src + '/modules/**', ['copy']);

  //  gulp.watch(src + '*.html', ['bs-reload']);


});

gulp.task('build', function(){
  gulp.start('copy', 'less');
})

// Default Task
gulp.task('default', ['build'], function () {
  gulp.start('watch','browserify-watch', 'browser-sync');
});