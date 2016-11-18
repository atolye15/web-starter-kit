
module.exports = function({gulp, configs, envPath}) {
  return function() {
    gulp.src(envPath + '/' + configs.paths.assets.vendors + '/**/*')
      .pipe(gulp.dest(configs.paths.deploy + '/' + configs.paths.assets.vendors));
  };
};
