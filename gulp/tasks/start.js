import { watch, series } from 'gulp';
import browserSyncBase from 'browser-sync';

import configs from '../../configs';
import skippable from '../utils/skippable';
import { isProduction } from '../utils/env';
import html from './html';
import styles from './styles';
import scripts from './scripts';
import { syncFonts, syncImages } from './sync';

const browserSync = browserSyncBase.create();

function reload(cb) {
  browserSync.reload();
  cb();
}

export default function start() {
  browserSync.init(configs.browserSync);

  watch(
    [`${configs.paths.src}/**/*.twig`],
    { cwd: './' },
    series(html, skippable(isProduction && configs.uncss.active, styles), reload),
  );

  watch([`${configs.paths.src}/img/icons/*.svg`], series(html, reload));

  watch([`${configs.paths.src}/**/*.scss`], { cwd: './' }, series(styles, reload));

  watch([`${configs.paths.src}/fonts/**/*`], series(syncFonts, reload));

  watch([`${configs.paths.src}/**/*.js`], { cwd: './' }, series(scripts, reload));

  watch(
    [`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/icons/**`],
    series(syncImages, reload),
  );
}
