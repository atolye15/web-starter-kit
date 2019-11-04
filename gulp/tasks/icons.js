import gulp from 'gulp';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import through2 from 'through2';

import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

export function iconsSprite() {
  return gulp
    .src(`${configs.paths.src}/img/icons/**/*.svg`)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(
      through2.obj((file, encoding, cb) => {
        configs.styleGuide.svgSprite = file.contents.toString();
        cb();
      }),
    )
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest(`${configs.styleGuide.destination}/kss-assets`))
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.img}`))
    .on('error', notifierErrorHandler);
}

export default {
  sprite: iconsSprite,
};
