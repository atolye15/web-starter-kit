import gulp, { parallel } from 'gulp';
import dirSync from 'gulp-directory-sync';

import errorHandler from '../../utils/errorHandler';
import configs from '../../../configs';
import { paths } from '../../../kss/configs';

export function syncFonts() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/fonts`, `${paths.dist}/${paths.assets.fonts}`, {
        ignore: '.gitkeep',
      }),
    )
    .on('error', errorHandler);
}

export function syncImages() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/img`, `${paths.dist}/${paths.assets.images}`, {
        ignore: ['.gitkeep'],
        nodelete: 'sprite.svg',
      }),
    )
    .on('error', errorHandler);
}
export default parallel(syncFonts, syncImages);
