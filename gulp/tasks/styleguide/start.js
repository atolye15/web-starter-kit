import { watch, series } from 'gulp';
import browserSyncBase from 'browser-sync';

import { browserSyncOptions } from '../../../kss/configs';
import configs from '../../../configs';

import styles from './styles';
import scripts from './scripts';
import { syncFonts, syncImages } from './sync';
import sprite from './sprite';
import generate from './generate';
import build from './build';

const browserSync = browserSyncBase.create();

function reload(cb) {
  browserSync.reload();
  cb();
}

function start() {
  browserSync.init(browserSyncOptions);

  watch([`${configs.paths.src}/**/*.twig`], { cwd: './' }, series(generate, reload));

  watch([`${configs.paths.src}/img/icons/*.svg`], series(sprite, generate, reload));

  watch([`${configs.paths.src}/**/*.scss`], { cwd: './' }, series(styles, generate, reload));

  watch([`${configs.paths.src}/fonts/**/*`], series(syncFonts, reload));

  watch([`${configs.paths.src}/**/*.js`], { cwd: './' }, series(scripts, generate, reload));

  watch(
    [`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/icons/**`],
    series(syncImages, reload),
  );
}

export default series(build, start);
