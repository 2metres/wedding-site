var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    jsonlint = require("gulp-jsonlint"),
    fontFace  = require('stylus-font-face'),
    nib = require('nib'),
    jeet = require('jeet'),
    rupture = require('rupture');

gulp.task('default', ['stylus', 'lint', 'js','server']);

gulp.task('stylus', function () {
  gulp.src('./assets/stylesheets/style.styl')
    .pipe( stylus({use: [nib(), jeet(), rupture(), fontFace()]}) )
    .pipe(gulp.dest('./public'));
});

gulp.task('js', function() {
  gulp.src('./assets/javascripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
  gulp.src('./assets/javascripts/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/'));
  gulp.src('./assets/javascripts/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/'));
});

gulp.task('json', function() {
  gulp.src("./data/*.json")
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

gulp.task('test', ['json']);

gulp.task('server', function () {
  require('./app');
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'styl js jade png jpg gif json'
  }).on('restart', ['stylus', 'js']);
});

gulp.task("lint", function () {
  gulp.src(["*.js", "*.json"])
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});
