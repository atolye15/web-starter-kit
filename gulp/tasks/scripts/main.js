
module.exports = function({gulp, configs, $, isProduction, envPath, banner}) {
  return function() {
    var jsFiles = [];
    if (configs.jsFiles.length) {
      jsFiles = configs.jsFiles.map(path => {
        return '.tmp/babel/' + path;
      });
    }
    return gulp.src(jsFiles)
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.sourcemaps.init())
      .pipe($.concat('main.js'))
      .pipe($.size({title: 'Js'}))
      .pipe($.header(banner))
      .pipe(isProduction ? $.util.noop() : $.sourcemaps.write('./'))
      .pipe(gulp.dest('.tmp/js'))
      .pipe(isProduction ? $.util.noop() : gulp.dest(envPath + '/' + configs.paths.assets.js));
  };
};
