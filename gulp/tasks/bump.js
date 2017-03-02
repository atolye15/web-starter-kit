
module.exports = function({gulp, $}) {
  return function() {
    return gulp.src('./configs.js')
      .pipe($.bump())
      .pipe(gulp.dest('./'));
  };
};
