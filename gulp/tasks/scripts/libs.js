
module.exports = function({gulp, configs, $, isProduction, envPath, banner}) {
  return function() {
    var libFiles = [];
    if (configs.libFiles.length) {
      libFiles = configs.libFiles.map(path => {
        return configs.paths.src + '/libs/' + path;
      });
    }
    return gulp.src(libFiles)
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.sourcemaps.init())
      .pipe($.concat('libs.js'))
      .pipe($.size({title: 'Libraries'}))
      .pipe(isProduction ? $.util.noop() : $.sourcemaps.write('./'))
      .pipe($.header(banner))
      .pipe(gulp.dest('.tmp/js'))
      .pipe(isProduction ? $.util.noop() : gulp.dest(envPath + '/' + configs.paths.assets.js));
  };
};
