var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    stylus = require('gulp-stylus'),
    fontFace  = require('stylus-font-face'),
    nib = require('nib'),
    jeet = require('jeet'),
    rupture = require('rupture');

gulp.task('default', ['stylus', 'lint', 'server']);

gulp.task('stylus', function () {
  gulp.src('./assets/stylesheets/style.styl')
    .pipe(
      stylus({
        use: [nib(), jeet(), rupture(), fontFace()]
      })
    )
    .pipe(gulp.dest('./public'));
});

gulp.task('server', function () {
  require('./app');
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'styl js jade png jpg gif json'
  }).on('restart', ['stylus', 'lint']);
});

gulp.task("lint", function () {
  gulp.src(["*.js", "*.json"])
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});
