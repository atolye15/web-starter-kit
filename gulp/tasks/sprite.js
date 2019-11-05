import gulp from 'gulp';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';

import configs from '../../configs';
import { envPath } from '../utils/env';
import { notifierErrorHandler } from '../utils/notifier';

export default function sprite() {
  return gulp
    .src(`${configs.paths.src}/img/icons/**/*.svg`)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.img}`))
    .on('error', notifierErrorHandler);
}
