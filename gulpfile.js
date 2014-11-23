// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('connect', function() {
  connect.server({
    root: './build',
    livereload: true
  });
});

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';
 
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'));
  gulp.src('./src/views/*.html')
    .pipe(gulp.dest('./build/views'));
 // gulp.src(htmlSrc)
 //   .pipe(changed(htmlDst))
 //   .pipe(minifyHTML())
 //   .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/scripts/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/scripts/'));
/*  gulp.src(['./src/scripts/*.js'])
    .pipe(concat('app.js'))
    .pipe(stripDebug())
    .pipe(gulp.dest('./build/scripts/'));*/
  gulp.src(['./src/lib/script/angular.js'])
    .pipe(concat('angular.js'))
    .pipe(gulp.dest('./build/scripts/'));
  gulp.src(['./src/lib/script/angular-route.js'])
    .pipe(concat('angular-route.js'))
    .pipe(gulp.dest('./build/scripts/'));
  gulp.src(['./src/lib/script/bootstrap.min.js'])
    .pipe(concat('bootstrap.min.js'))
    .pipe(gulp.dest('./build/scripts/'));
  gulp.src(['./src/lib/script/jquery-1.11.1.min.js'])
    .pipe(concat('jquery-1.11.1.min.js'))
    .pipe(gulp.dest('./build/scripts/'));
  gulp.src(['./src/mockserver/**/*.json'])
    .pipe(gulp.dest('./build/mockserver/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
  gulp.src(['./src/lib/css/bootstrap.min.css'])
    .pipe(concat('bootstrap.min.css'))
    .pipe(gulp.dest('./build/styles/'));
  gulp.src(['./src/lib/css/bootstrap-theme.min.css'])
    .pipe(concat('bootstrap-theme.min.css'))
    .pipe(gulp.dest('./build/styles/'));
});

// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles', 'connect'], function() {
  // watch for HTML changes
  gulp.watch('./src/*.html', function() {
    gulp.run('htmlpage');
  });
 
  // watch for JS changes
  gulp.watch('./src/scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });
 
  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('styles');
  });

// Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['build/**']).on('change', livereload.changed);
});