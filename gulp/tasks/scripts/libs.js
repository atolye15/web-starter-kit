import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import util from 'gulp-util';
import header from 'gulp-header';

import configs from '../../../configs';
import banner from '../../banner';

export default function({ isProduction }) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function() {
    let libFiles = [];
    if (configs.libFiles.length) {
      libFiles = configs.libFiles.map(path => `${configs.paths.src}/libs/${path}`);
    }
    return gulp
      .src(libFiles)
      .pipe(plumber({ errorHandler: notify.onError('Hata: <%= error.message %>') }))
      .pipe(sourcemaps.init())
      .pipe(concat('libs.js'))
      .pipe(isProduction ? util.noop() : sourcemaps.write('./'))
      .pipe(header(banner()))
      .pipe(gulp.dest('.tmp/js'))
      .pipe(isProduction ? util.noop() : gulp.dest(`${envPath}/${configs.paths.assets.js}`));
  };
}
