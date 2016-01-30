'use strict';

var gulp = require('gulp');

require('gulp-watch');

gulp.task('dev-watch-tasks', function () {
  // browserSync.init({
  //   port: 7332,
  //   proxy: 'localhost:7331',
  //   logLevel: 'silent',
  //   // Prevent browser sync from display in page notifications
  //   notify: false,
  //   open: false
  // });

  gulp.watch([GLOBAL.bottega.src.styles + '/**/*.scss',
    GLOBAL.bottega.docs + '/**/*.scss'], ['generate-dev-css']);

  // gulp.watch([GLOBAL.bottega.src.scripts + '/**/*.js'], ['cp-scripts']);
  //
  // gulp.watch([GLOBAL.bottega.src.imgs + '/**/*'], ['cp-images']);

  gulp.watch([
      GLOBAL.bottega.src.docs + '/**/*'
    ],
    ['compile-jekyll:localhost']);

  // gulp.watch([GLOBAL.bottega.gae + '/**/*'], ['copy-appengine-config']);
});
