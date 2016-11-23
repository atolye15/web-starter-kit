
module.exports = function({gulp, configs, $, browserSync}) {
  return function() {
    return gulp.src([
      `${configs.paths.src}/sass/**/*.scss`, `!${configs.paths.src}/sass/vendors/**`
    ])
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.scssLint())
      .pipe(browserSync.active ? $.util.noop() : $.scssLint.failReporter('E'));
  };
};
