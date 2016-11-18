
module.exports = function({gulp, configs, $, lazypipe, banner, isProduction, envPath}) {
  return function(cb) {
    const stylesMinChannel = lazypipe()
      .pipe($.cssnano, {discardComments: {removeAll: true}})
      .pipe($.rename, {suffix: '.min'})
      .pipe($.header, banner)
      .pipe(gulp.dest, envPath + '/' + configs.paths.assets.css);

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
      configs.paths.src + '/sass/**/*.scss'
    ])
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.sourcemaps.init())
      .pipe($.sass({precision: 10}).on('error', $.sass.logError))
      .pipe(isProduction ? $.mergeMediaQueries({log: true}) : $.util.noop())
      .pipe($.autoprefixer(configs.autoprefixerBrowsers))
      .pipe($.header(banner))
      .pipe(isProduction ? $.util.noop() : $.sourcemaps.write('./'))
      .pipe(gulp.dest(envPath + '/' + configs.paths.assets.css))
      .pipe(isProduction ? stylesMinChannel() : $.util.noop())
      .pipe($.size({title: 'Css'}));
  };
};
