'use strict';

var gulp = require('gulp');
var del = require('del');
var webserver = require('gulp-webserver');

/**

The port number allows you to configure what port to launch the
development server on.

**/

var PORT_NUMBER = 7331;

gulp.task('start-server', function() {
  gulp.src('build')
    .pipe(webserver({
      port: PORT_NUMBER,
      livereload: true,
      open: true,
      fallback: './docs/index.html'
    }));
});
