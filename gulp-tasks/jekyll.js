'use strict';

var gulp = require('gulp');
var del = require('del');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();

gulp.task('rm-jekyll-build-directory', function() {
  return del([GLOBAL.bottega.build.docs], {dot: true});
});

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

// jekyll:target [--lang <lang_code,lang_code,...|all>]
// where 'target' is config/target.yml file.
// defaults to '--lang all'.
// 'all' builds for all languages specified in config.yml/langs_available + 'en'.
// builds w/o multilang support if config.yml is missing langs_available.
gulp.task('compile-jekyll:localhost', ['rm-jekyll-build-directory'],
  function(cb) {
    spawnkJekyllBuild('build', 'localhost.yml', cb);
  });

gulp.task('compile-jekyll:prod', ['rm-jekyll-build-directory'],
  function(cb) {
    spawnkJekyllBuild('build', 'staging.yml', cb);
  });

gulp.task('compile-jekyll:devsite', ['rm-jekyll-build-directory'],
  function(cb) {
    spawnkJekyllBuild('build', 'devsite.yml', cb);
  });
