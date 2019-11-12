import gulp from 'gulp';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import through2 from 'through2';

import errorHandler from '../../utils/errorHandler';

import configs from '../../../configs';
import spriteStore from '../../utils/spriteStore';

export default function sprite() {
  return gulp
    .src(`${configs.paths.src}/icons/**/*.svg`)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(
      through2.obj((file, encoding, callback) => {
        spriteStore.setSprite(file.contents.toString());
        callback(null, file);
      }),
    )
    .on('error', errorHandler);
}
