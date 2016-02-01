'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('publish-gh-pages', function() {
  return gulp.src(GLOBAL.bottega.build.docs + '/**/*')
    .pipe(ghPages({
      remoteUrl: 'git@github.com:roller-io/bottega.git',
      branch: 'gh-pages'
  }));
});
