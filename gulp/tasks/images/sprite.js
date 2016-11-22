
module.exports = function({gulp, configs, $, envPath}) {
  return function() {
    return gulp.src(configs.paths.src + '/img/icons/**/*.svg')
      .pipe($.imagemin([
        $.imagemin.svgo({plugins: [{removeDimensions: true}]})
      ]))
      .pipe($.rename({prefix: 'icon-'}))
      .pipe($.svgstore({inlineSvg: true}))
      .pipe($.rename({basename: 'sprite'}))
      .pipe(gulp.dest('.tmp/img'))
      .pipe(gulp.dest(envPath + '/' + configs.paths.assets.img));
  };
};
