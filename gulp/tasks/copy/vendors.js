
module.exports = function({gulp, configs, envPath}) {
  return function() {
    gulp.src(configs.paths.src + '/vendors/**/*')
      .pipe(gulp.dest(envPath + '/' + configs.paths.assets.vendors));
  };
};
