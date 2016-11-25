
module.exports = function({gulp, configs, envPath}) {
  return function() {
    gulp.src(envPath + '/' + configs.paths.assets.img + '/**/*')
      .pipe(gulp.dest(configs.paths.deploy + '/' + configs.paths.assets.img));
  };
};
