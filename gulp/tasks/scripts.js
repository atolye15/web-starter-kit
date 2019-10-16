import gulp from 'gulp';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

import configs from '../../configs';
import noop from '../utils/noop';
import { isProduction } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

export function scriptsMain() {
  let jsFiles = [];
  if (configs.jsFiles.length) {
    jsFiles = configs.jsFiles.map(path => `${configs.paths.src}/js/${path}`);
  }

  return gulp
    .src(jsFiles, { sourcemaps: true })
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest('.cache/js', { sourcemaps: isProduction ? false : '.' }))
    .pipe(isProduction ? noop() : gulp.dest(`${envPath}/${configs.paths.assets.js}`))
    .on('error', notifierErrorHandler);
}

export function scriptsLibs(cb) {
  if (!configs.libFiles.length) {
    return cb();
  }

  const libFiles = configs.libFiles.map(path => `${configs.paths.src}/libs/${path}`);

  return gulp
    .src(libFiles, { sourcemaps: true })
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('.cache/js', { sourcemaps: isProduction ? false : '.' }))
    .pipe(isProduction ? noop() : gulp.dest(`${envPath}/${configs.paths.assets.js}`))
    .on('error', notifierErrorHandler);
}

export function scriptsCombine(cb) {
  if (!isProduction) {
    return cb();
  }

  return gulp
    .src(['.cache/js/libs.js', '.cache/js/main.js'], { allowEmpty: true })
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.js}`))
    .on('error', notifierErrorHandler);
}

export default { libs: scriptsLibs, main: scriptsMain, combine: scriptsCombine };
