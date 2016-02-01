'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();
var mkdirp = require('mkdirp');

// This task moves content into the jekyll directory
gulp.task('cp-fonts', ['fonts:clean'], function() {
  return gulp.src([GLOBAL.bottega.src.fonts + '/**/*'])
    .pipe(gulp.dest(GLOBAL.bottega.build.fonts));//, {prefix: 3}));
});


gulp.task('cp-doc-fonts', ['cp-fonts'], function() {
  mkdirp(GLOBAL.bottega.build.docs + '/fonts/');
  return gulp.src([GLOBAL.bottega.build.fonts + '/**/*'])
    .pipe(gulp.dest(GLOBAL.bottega.build.docs + '/fonts/'));//, {prefix: 3}));
});

gulp.task('fonts:clean', [], function() {
  del.bind(null, [
  GLOBAL.bottega.build.fonts
  ], {dot: true});
});
