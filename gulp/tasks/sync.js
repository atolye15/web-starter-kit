/* eslint-disable no-console */
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dirSync from 'gulp-directory-sync';
import c from 'ansi-colors';

import configs from '../../configs';
import { isProduction, isDeploy } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

function printSummary(result, taskName) {
  console.log(
    c.green(
      `${taskName}: [created: ${result.created}, updated: ${result.updated}, deleted: ${
        result.removed
      }, unchanged: ${result.same}]`,
    ),
  );
}

/**
 * Build
 */
export function syncFontsInBuild() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(
      dirSync(`${configs.paths.src}/fonts`, `${envPath}/${configs.paths.assets.fonts}`, {
        printSummary: result => printSummary(result, 'sync:build-fonts'),
      }),
    );
}

export function syncImgInBuild() {
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(
      dirSync(`${configs.paths.src}/img`, `${envPath}/${configs.paths.assets.img}`, {
        printSummary: result => printSummary(result, 'sync:build-image'),
      }),
    );
}

export function syncVendorsInBuild() {
  return gulp.src('dummy.ext', { allowEmpty: true }).pipe(
    dirSync(`${configs.paths.src}/vendors`, `${envPath}/${configs.paths.assets.vendors}`, {
      printSummary: result => printSummary(result, 'sync:build-vendors'),
    }),
  );
}

/**
 * Deploy
 */

export function syncCssInDeploy(cb) {
  if (!isDeploy) {
    return cb();
  }

  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(
      dirSync(
        `${envPath}/${configs.paths.assets.css}`,
        `${configs.paths.deploy}/${configs.paths.assets.css}`,
        {
          printSummary: result => printSummary(result, 'sync:deploy-css'),
        },
      ),
    );
}

export function syncJsInDeploy(cb) {
  if (!isDeploy) {
    return cb();
  }
  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(
      dirSync(
        `${envPath}/${configs.paths.assets.js}`,
        `${configs.paths.deploy}/${configs.paths.assets.js}`,
        {
          printSummary: result => printSummary(result, 'sync:deploy-js'),
        },
      ),
    );
}

export function syncImgInDeploy(cb) {
  if (!isDeploy) {
    return cb();
  }

  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(
      dirSync(
        `${envPath}/${configs.paths.assets.img}`,
        `${configs.paths.deploy}/${configs.paths.assets.img}`,
        {
          printSummary: result => printSummary(result, 'sync:deploy-img'),
        },
      ),
    );
}

export function syncVendorsInDeploy(cb) {
  if (!isDeploy) {
    return cb();
  }

  return gulp
    .src('dummy.ext', { allowEmpty: true })
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(
      dirSync(
        `${envPath}/${configs.paths.assets.vendors}`,
        `${configs.paths.deploy}/${configs.paths.assets.vendors}`,
        {
          printSummary: result => printSummary(result, 'sync:deploy-vendors'),
        },
      ),
    );
}

export default {
  deploy: {
    css: syncCssInDeploy,
    js: syncJsInDeploy,
    img: syncImgInDeploy,
    vendors: syncVendorsInDeploy,
  },
  build: { fonts: syncFontsInBuild, image: syncImgInBuild, vendors: syncVendorsInBuild },
};
