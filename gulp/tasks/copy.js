import gulp from 'gulp';
import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

export function copyImages() {
  return gulp
    .src([`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/{icons,icons/**}`])
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

export default {
  images: copyImages,
  fonts: copyFonts,
  public: copyPublic,
};
