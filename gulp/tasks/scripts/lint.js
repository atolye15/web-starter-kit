
module.exports = function({gulp, configs, $, browserSync}) {
  return function() {
    return gulp.src(configs.paths.src + '/js/**/*.js')
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe(browserSync.active ? $.util.noop() : $.eslint.failOnError());
  };
};
