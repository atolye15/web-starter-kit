import gulp from 'gulp';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';

import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

export function iconsSprite() {
  return gulp
    .src(`${configs.paths.src}/img/icons/**/*.svg`)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.img}`))
    .on('error', notifierErrorHandler);
}

export default {
  sprite: iconsSprite,
};
