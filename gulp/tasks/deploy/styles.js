
module.exports = function({gulp, configs, envPath}) {
  return function() {
    gulp.src(envPath + '/' + configs.paths.assets.css + '/**/*')
      .pipe(gulp.dest(configs.paths.deploy + '/' + configs.paths.assets.css));
  };
};
