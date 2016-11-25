
module.exports = function({gulp, configs, $}, text) {
  return function() {
    // Disable console logging
    $.notify.logLevel(1);

    return gulp.src('')
      .pipe($.notify(text));
  };
};
