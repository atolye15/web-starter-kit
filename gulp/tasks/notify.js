
module.exports = function({gulp, configs, $}, text) {
  return function() {
    return gulp.src('')
      .pipe($.notify(text))
      .on('end', function() {
        $.util.log($.util.colors.green(
          '\n==============================================\n' +
          text +
          '\n=============================================='
        ));
      });
  };
};
