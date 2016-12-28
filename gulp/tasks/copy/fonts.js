
module.exports = function({gulp, configs, envPath}) {
  return function() {
    return gulp.src(configs.paths.src + '/fonts/**/*')
      .pipe(gulp.dest(envPath + '/' + configs.paths.assets.fonts));
  };
};
