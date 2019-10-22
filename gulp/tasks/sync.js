import gulp from 'gulp';
import dirSync from 'gulp-directory-sync';
import c from 'ansi-colors';

import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

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
export function syncFontsInBuild() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/fonts`, `${envPath}/${configs.paths.assets.fonts}`, {
        printSummary: result => printSummary(result, 'sync:build-fonts'),
      }),
    )
    .on('error', notifierErrorHandler);
}

export function syncImgInBuild() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(
      dirSync(`${configs.paths.src}/img`, `${envPath}/${configs.paths.assets.img}`, {
        printSummary: result => printSummary(result, 'sync:build-image'),
      }),
    )
    .on('error', notifierErrorHandler);
}

export default {
  build: { fonts: syncFontsInBuild, image: syncImgInBuild },
};
