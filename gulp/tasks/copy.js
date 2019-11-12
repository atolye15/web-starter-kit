import gulp, { parallel } from 'gulp';
import configs from '../../configs';
import { envPath } from '../utils/env';

export function copyImages() {
  return gulp
    .src(`${configs.paths.src}/img/**/*`)
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.img}`));
}

export function copyFonts() {
  return gulp
    .src(`${configs.paths.src}/fonts/**/*`)
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.fonts}`));
}

export function copyPublic() {
  return gulp
    .src([`public/**/*`, '!public/.gitkeep'], { dot: true })
    .pipe(gulp.dest(`${envPath}/`));
}

export default parallel(copyImages, copyFonts, copyPublic);
