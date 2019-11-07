import gulp, { parallel } from 'gulp';
import dirSync from 'gulp-directory-sync';

import configs from '../../configs';
import { envPath } from '../utils/env';
import { notifierErrorHandler } from '../utils/notifier';

export function syncFonts() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/fonts`, `${envPath}/${configs.paths.assets.fonts}`, {
        ignore: '.gitkeep',
      }),
    )
    .on('error', notifierErrorHandler);
}

export function syncImages() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/img`, `${envPath}/${configs.paths.assets.img}`, {
        ignore: ['.gitkeep', 'icons'],
      }),
    )
    .on('error', notifierErrorHandler);
}
export default parallel(syncFonts, syncImages);
