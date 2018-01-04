/* eslint-disable */
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const flexBugsFixes = require('postcss-flexbugs-fixes');
const cssnano = require('cssnano');

module.exports = function({ gulp, configs, $, lazypipe, banner, isProduction, envPath }) {
  return function(cb) {
    const uncssOptions = {
      html: [envPath + '/*.html'],
      ignore: configs.uncss.ignore,
    };

    const stylesMinChannel = lazypipe()
      .pipe(() => (configs.uncss.active ? $.uncss(uncssOptions) : $.util.noop()))
      .pipe($.postcss, [cssnano({ discardComments: { removeAll: true } })])
      .pipe($.rename, { suffix: '.min' })
      .pipe($.header, banner)
      .pipe(gulp.dest, envPath + '/' + configs.paths.assets.css);

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp
      .src([configs.paths.src + '/scss/**/*.scss'])
      .pipe($.plumber({ errorHandler: $.notify.onError('Hata: <%= error.message %>') }))
      .pipe(isProduction ? $.util.noop() : $.sourcemaps.init())
      .pipe($.sass({ precision: 10 }).on('error', $.sass.logError))
      .pipe(
        $.postcss([
          autoprefixer(configs.autoprefixerBrowsers),
          flexBugsFixes(),
          isProduction ? mqpacker() : function() {},
        ]),
      )
      .pipe($.header(banner))
      .pipe(isProduction ? $.util.noop() : $.sourcemaps.write('./'))
      .pipe(gulp.dest(envPath + '/' + configs.paths.assets.css))
      .pipe(isProduction ? stylesMinChannel() : $.util.noop())
      .pipe($.size({ title: 'Css' }));
  };
};
