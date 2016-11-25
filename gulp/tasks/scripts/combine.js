
module.exports = function({gulp, configs, $, isProduction, envPath, banner}) {
  return function(cb) {
    if (!isProduction) {
      return cb();
    }
    return gulp.src([
      '.tmp/js/libs.js',
      '.tmp/js/main.js'
    ])
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.concat('app.min.js'))
      .pipe($.uglify())
      .pipe($.size({title: 'App Js'}))
      .pipe($.header(banner))
      .pipe(gulp.dest(envPath + '/' + configs.paths.assets.js));
  };
};
