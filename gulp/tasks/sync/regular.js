
module.exports = function({gulp, configs, $, envPath}, src, dist) {
  return function() {
    return gulp.src('')
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.directorySync(
        configs.paths.src + '/' + src,
        envPath + '/' + dist,
        {printSummary: true}
      ));
  };
};
