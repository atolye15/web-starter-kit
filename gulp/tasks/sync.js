import gulp, { parallel } from 'gulp';
import dirSync from 'gulp-directory-sync';
import c from 'ansi-colors';

import configs from '../../configs';
import { envPath } from '../utils/env';
import { notifierErrorHandler } from '../utils/notifier';

function printSummary(result, taskName) {
  // eslint-disable-next-line no-console
  console.log(
    c.green(
      `${taskName}: [created: ${result.created}, updated: ${result.updated}, deleted: ${result.removed}, unchanged: ${result.same}]`,
    ),
  );
}

/**
 * Build
 */
export function syncFonts() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/fonts`, `${envPath}/${configs.paths.assets.fonts}`, {
        printSummary: result => printSummary(result, 'sync:build-fonts'),
      }),
    )
    .on('error', notifierErrorHandler);
}

export function syncImages() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/img`, `${envPath}/${configs.paths.assets.img}`, {
        printSummary: result => printSummary(result, 'sync:build-image'),
      }),
    )
    .on('error', notifierErrorHandler);
}
export default parallel(syncFonts, syncImages);
