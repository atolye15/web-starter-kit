
module.exports = function({gulp, configs, $, envPath}) {
  return function() {
    return gulp.src('.tmp/img/**/*')
      .pipe(gulp.dest(envPath + '/' + configs.paths.assets.img))
      .pipe($.size({title: 'Images'}));
  };
};
