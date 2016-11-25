
module.exports = function({gulp, configs, $}, text) {
  return function() {
    return gulp.src('')
      .pipe($.notify(text));
  };
};
