import gulp from 'gulp';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import through2 from 'through2';

import configs from '../../configs';
import { envPath } from '../utils/env';
import spriteStore from '../utils/spriteStore';
import errorHandler from '../utils/errorHandler';

export default function sprite() {
  return gulp
    .src(`${configs.paths.src}/img/icons/**/*.svg`)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(
      through2.obj((file, encoding, callback) => {
        spriteStore.setSprite(file.contents.toString());
        callback(null, file);
      }),
    )
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.img}`))
    .on('error', errorHandler);
}
