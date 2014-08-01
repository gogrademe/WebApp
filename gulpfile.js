var gulp = require('gulp');
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var liveify = require('liveify');
var watchify = require('watchify');
var util = require('gulp-util')
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename     = require('gulp-rename');
var streamify  = require('gulp-streamify');
var uglify     = require('gulp-uglify');


var build = './build';
var src = './src';

var production = process.env.NODE_ENV === 'production';


gulp.task('less', function () {
  gulp.src(['./src/less/**/*.less', './src/semantic/src/**/*.less'])
    .pipe(plumber())
    .pipe(less({
      compress: !production,
      paths: [ path.join(__dirname, src, '/less')]
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(build + '/assets'))
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
  gulp.src(src + '/index.html').pipe(gulp.dest(build));
  gulp.src(src + '/img/*.*').pipe(gulp.dest(build + '/assets/img'));
  gulp.src(src + '/bower/fontawesome/fonts/*.*').pipe(gulp.dest(build + '/assets/fonts'));
  gulp.src(src + '/semantic/build/packaged/themes/**/*.*').pipe(gulp.dest(build + '/themes'));
});

gulp.task('browserify-watch', function() {
    var bundler = watchify(browserify('./src/scripts/index.ls', watchify.args));

    bundler.transform(liveify)
    bundler.on('update', rebundle)

  function rebundle () {
    return bundler
      .bundle()
      .on('error', util.log)
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build'))
      .pipe(browserSync.reload({
        stream: true
    }));
  }
  return rebundle();
});

gulp.task('browserify', function() {
	var bundleMethod = global.isWatching ? watchify : browserify;
	var bundler = bundleMethod({
		// Specify the entry point of your app
		entries: ['./src/scripts/index.ls'],
		// Add file extentions to make optional in your requires
		extensions: ['.ls'],
    debug: !production
	});

	var bundle = function() {
		return bundler
      .transform(liveify)
			// Enable source maps!
			.bundle()
			// Report compile errors
			.on('error', util.log)
			.pipe(source('app.js'))
			// Specify the output destination
			.pipe(gulp.dest(build))
      .pipe(rename('app.min.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(build))
	}

	if(global.isWatching) {
		bundler.on('update', bundle)
	}

	return bundle();
});

gulp.task('watch', function() {
  global.isWatching = true;
  gulp.start('browserify-watch');
  gulp.watch('src/index.html', ['copy'])
  gulp.watch('src/less/**/*.*', ['less']);
});

// Default Task
gulp.task('default', function() {
  gulp.start('copy', 'less', 'watch','browser-sync');
});


gulp.task('build', function() {
  gulp.start('copy', 'less', 'browserify');
});
