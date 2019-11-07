import gulp, { parallel } from 'gulp';
import dirSync from 'gulp-directory-sync';
import c from 'ansi-colors';

import { notifierErrorHandler } from '../../utils/notifier';
import configs from '../../../configs';
import { paths } from '../../../kss/configs';

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
      dirSync(`${configs.paths.src}/fonts`, `${paths.dist}/${paths.assets.fonts}`, {
        printSummary: result => printSummary(result, 'syncFonts'),
        ignore: '.gitkeep',
      }),
    )
    .on('error', notifierErrorHandler);
}

export function syncImages() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/img`, `${paths.dist}/${paths.assets.images}`, {
        printSummary: result => printSummary(result, 'syncImages'),
        ignore: ['.gitkeep', 'icons'],
      }),
    )
    .on('error', notifierErrorHandler);
}
export default parallel(syncFonts, syncImages);
