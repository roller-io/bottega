'use strict';

var gulp = require('gulp');
var del = require('del');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();

/**
 * There is a gotcha with this command!
 *
 * Because we are using RVM to define and lock
 * versions of GEMs, we must use
 * 'bundle exec' to execute commands againsts
 * these GEMs. This ensures Travis
 * uses it's local GEMs in vendor/bundle.
 */
function spawnkJekyllBuild(jekyllCommand, buildConfig, cb) {
  // Handle OS differences in executable name
  var jekyllExecutable = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
  var params = ['exec', jekyllExecutable, jekyllCommand];
  params.push('--config');
  params.push(
    GLOBAL.bottega.src.jekyllConfigs + '/common.yml,' +
    GLOBAL.bottega.src.jekyllConfigs + '/' + buildConfig);
  params.push('--trace');

  var env = Object.create(process.env);

  var jekyllProcess = spawn('bundle', params, {
      env: env,
      stdio: 'inherit'
    });
  jekyllProcess.on('close', cb);
}

gulp.task('rm-jekyll-build-directory', function() {
  return del([GLOBAL.bottega.build.docs], {dot: true});
});

gulp.task('compile-jekyll:localhost', ['rm-jekyll-build-directory'], function(cb) {
    spawnkJekyllBuild('build', 'localhost.yml', cb);
});

gulp.task('compile-jekyll:prod', ['rm-jekyll-build-directory'], function(cb) {
    spawnkJekyllBuild('build', 'production.yml', cb);
});
