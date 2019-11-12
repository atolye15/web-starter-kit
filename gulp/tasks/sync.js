import gulp, { parallel } from 'gulp';
import dirSync from 'gulp-directory-sync';

import configs from '../../configs';
import { envPath } from '../utils/env';
import errorHandler from '../utils/errorHandler';

export function syncFonts() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/fonts`, `${envPath}/${configs.paths.assets.fonts}`, {
        ignore: '.gitkeep',
      }),
    )
    .on('error', errorHandler);
}

export function syncImages() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/img`, `${envPath}/${configs.paths.assets.img}`, {
        ignore: ['.gitkeep'],
        nodelete: 'sprite.svg',
      }),
    )
    .on('error', errorHandler);
}
export default parallel(syncFonts, syncImages);
