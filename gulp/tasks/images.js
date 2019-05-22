import gulp from 'gulp';
import fs from 'fs';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import tap from 'gulp-tap';
import c from 'ansi-colors';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';

import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

export function imagesOptimize() {
  return gulp
    .src([`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/{icons,icons/**}`])
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(newer('.tmp/img'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({ plugins: [{ removeDimensions: true }] }),
      ]),
    )
    .pipe(gulp.dest('.tmp/img'));
}

export function imagesSync() {
  return gulp
    .src(['.tmp/img/**/*', '!.tmp/img/sprite.svg'])
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(
      tap(file => {
        if (!fs.existsSync(`${configs.paths.src}/img/${file.relative}`)) {
          fs.unlinkSync(`.tmp/img/${file.relative}`);
          // eslint-disable-next-line no-console
          console.log(c.red(`[images:sync] >> ${file.relative} deleted from tmp!`));
        }
      }),
    );
}

export function imagesDeploy() {
  return gulp.src('.tmp/img/**/*').pipe(gulp.dest(`${envPath}/${configs.paths.assets.img}`));
}

export function imagesSprite() {
  return gulp
    .src(`${configs.paths.src}/img/icons/**/*.svg`)
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            { removeDimensions: true },
            { removeTitle: true },
            { cleanupNumericValues: true },
            { cleanupListOfValues: true },
            { removeViewBox: false },
            { removeRasterImages: true },
            { sortAttrs: true },
            { transformsWithOnePath: true },
          ],
        }),
      ]),
    )
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest('.tmp/img'))
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.img}`));
}

export default {
  optimize: imagesOptimize,
  sync: imagesSync,
  deploy: imagesDeploy,
  sprite: imagesSprite,
};
