import gulp, { parallel } from 'gulp';

import { paths } from '../../../kss/configs';
import configs from '../../../configs';

export function copyImages() {
  return gulp
    .src(`${configs.paths.src}/img/**/*`)
    .pipe(gulp.dest(`${paths.dist}/${paths.assets.images}`));
}

export function copyFonts() {
  return gulp
    .src(`${configs.paths.src}/fonts/**/*`)
    .pipe(gulp.dest(`${paths.dist}/${paths.assets.fonts}`));
}

export default parallel(copyImages, copyFonts);
