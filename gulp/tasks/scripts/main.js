import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import header from 'gulp-header';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import util from 'gulp-util';

import configs from '../../../configs';
import banner from '../../banner';

export default function({ isProduction }) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function() {
    let jsFiles = [];
    if (configs.jsFiles.length) {
      jsFiles = configs.jsFiles.map(path => `${configs.paths.src}/js/${path}`);
    }
    return gulp
      .src(jsFiles)
      .pipe(plumber({ errorHandler: notify.onError('Hata: <%= error.message %>') }))
      .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(babel())
      .pipe(header(banner()))
      .pipe(isProduction ? util.noop() : sourcemaps.write('./'))
      .pipe(gulp.dest('.tmp/js'))
      .pipe(isProduction ? util.noop() : gulp.dest(`${envPath}/${configs.paths.assets.js}`));
  };
}
