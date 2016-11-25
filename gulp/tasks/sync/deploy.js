
module.exports = function({gulp, configs, $, envPath, deploy}, folderName) {
  return function(cb) {
    if (!deploy) {
      return cb();
    }
    return gulp.src('')
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.directorySync(
        envPath + '/' + configs.paths.assets[folderName],
        configs.paths.deploy + '/' + configs.paths.assets[folderName],
        {printSummary: true}
      ));
  };
};
