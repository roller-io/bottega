'use strict';

var del = require('del');
var gulp = require('gulp');
var minimist = require('minimist');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

requireDir('./gulp-tasks');

// knownOptions = {

// };

GLOBAL.bottega = {
  src: {
    styles: 'src/scss',
    fonts: 'src/fonts',
    docs: 'docs',
    jekyllConfigs: 'docs/_config'
  },
  build: {
    root: 'build',
    styles: 'build/styles',
    fonts: 'build/fonts',
    docs: 'build/docs'
  }
}
GLOBAL.bottega.options = minimist(process.argv.slice(2));//, knownOptions);

console.log('');
console.log('---------------------------------');
console.log('');


gulp.task('clean', del.bind(null,
  [
    GLOBAL.bottega.build.root
  ], {dot: true})
);

gulp.task('develop', function(cb) {
  runSequence(
    'clean',
    [
      'generate-dev-css',
      // 'cp-images',
      'cp-fonts',
      // 'cp-scripts',
    ],
    'compile-jekyll:localhost',
    'start-server',
    'dev-watch-tasks',
    cb);
});

gulp.task('develop:prod', function(cb) {
  runSequence(
    'clean',
    'tests',
    [
      'generate-prod-css',
      'minify-images',
      'cp-fonts',
      'cp-scripts',
    ],
    // 'compile-jekyll:prod',
    [
      'html',
      'minify-images:content'
    ],
    'start-server',
    cb);
});

/**
 * By default we'll kick of the development build
 **/
gulp.task('default', ['develop']);
