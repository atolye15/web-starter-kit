import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import header from 'gulp-header';

import configs from '../../../configs';
import banner from '../../banner';

export default function({ isProduction }) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function(cb) {
    if (!isProduction) {
      return cb();
    }
    return gulp
      .src(['.tmp/js/libs.js', '.tmp/js/main.js'])
      .pipe(plumber({ errorHandler: notify.onError('Hata: <%= error.message %>') }))
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(header(banner()))
      .pipe(gulp.dest(`${envPath}/${configs.paths.assets.js}`));
  };
}
