
module.exports = function({gulp, configs, $}) {
  return function() {
    return gulp.src([
      `${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/{icons,icons/**}`
    ])
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.newer('.tmp/img'))
      .pipe($.imagemin([
        $.imagemin.gifsicle({interlaced: true}),
        $.imagemin.jpegtran({progressive: true}),
        $.imagemin.optipng({optimizationLevel: 5}),
        $.imagemin.svgo({plugins: [{removeDimensions: true}]})
      ]))
      .pipe($.size({title: 'Image Optimize'}))
      .pipe(gulp.dest('.tmp/img'));
  };
};
