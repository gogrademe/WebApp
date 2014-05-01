var gulp = require('gulp');
var path = require('path');


var less = require('gulp-less');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

var dist = './dist';
var src = './src';


gulp.task('less', function () {
  gulp.src('./src/less/styles.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./src/css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('clean', function() {
  return gulp.src(dist, {read: false})
    .pipe(clean());
});

gulp.task('server', function (next) {
  var connect = require('connect');
  var server = connect();

  server.use(connect.static(dist)).listen(process.env.PORT || 9900, next);
});

gulp.task('copy', function () {
  // Copy html
  gulp.src(src + '/modules/**')
    .pipe(gulp.dest(dist));


});

gulp.task('watch', ['server'], function () {

  gulp.watch('src/less/*.less', ['less']);
  gulp.watch(src + '/modules/**', ['copy']);

  var server = livereload();
  gulp.watch(['dist/**']).on('change', function (file) {
    server.changed(file.path);
  });

});

// Default Task
gulp.task('default', ['clean'], function(){
  gulp.start('less', 'watch');
});