import { watch, series } from 'gulp';
import browserSyncBase from 'browser-sync';

import configs, { browserSyncOptions } from '../../configs';
import skippable from '../utils/skippable';
import { isProduction } from '../utils/env';
import html from './html';
import styles from './styles';
import scripts from './scripts';
import { syncFonts, syncImages } from './sync';
import sprite from './sprite';
import build from './build';

const browserSync = browserSyncBase.create();

function reload(cb) {
  browserSync.reload();
  cb();
}

function start() {
  browserSync.init(browserSyncOptions);
  process.env.WATCHING = true;

  watch(
    [`${configs.paths.src}/**/*.twig`],
    { cwd: './' },
    series(html, skippable(isProduction && configs.uncssActive, styles), reload),
  );

  watch([`${configs.paths.src}/img/icons/*.svg`], series(sprite, html, reload));

  watch([`${configs.paths.src}/**/*.scss`], { cwd: './' }, series(styles, reload));

  watch([`${configs.paths.src}/fonts/**/*`], series(syncFonts, reload));

  watch([`${configs.paths.src}/**/*.js`], { cwd: './' }, series(scripts, reload));

  watch(
    [`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/icons/**`],
    series(syncImages, reload),
  );
}

export default series(build, start);
