// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var path = require('path');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var bases = {
 app: 'src/',
 dist: 'dist/',
};

// var paths = {
//  scripts: ['scripts/**/*.js', '!scripts/libs/'],
//  libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
//  styles: ['styles/**/*.css'],
//  html: ['index.html', '404.html'],
//  images: ['images/**/*.png'],
//  extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
// };


gulp.task('clean', function () {
  return gulp.src(bases.dist)
    .pipe(clean());
});

// Lint Task
gulp.task('lint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('less', function () {
  gulp.src('src/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('dist/css'))
});
gulp.task('bower', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist'));
});
// Concatenate & Minify App
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist'));
});
gulp.task('copy', function() {
 // Copy html
 gulp.src('src/**/*.html')
 .pipe(gulp.dest('dist'));


});

// Watch Files For Changes
gulp.task('watch', function() {
     gulp.watch('src/js/*.js', ['lint', 'scripts']);
     gulp.watch('src/index.html', ['copy']);
     gulp.watch('src/less/*.less', ['less']);
});

// Default Task
gulp.task('default', ['copy', 'lint', 'less', 'scripts', 'watch']);