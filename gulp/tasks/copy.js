import gulp from 'gulp';
import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

export function copyFonts() {
  return gulp
    .src(`${configs.paths.src}/fonts/**/*`)
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.fonts}`));
}

export function copyVendors() {
  return gulp
    .src(`${configs.paths.src}/vendors/**/*`)
    .pipe(gulp.dest(`${envPath}/${configs.paths.assets.vendors}`));
}

export default {
  fonts: copyFonts,
  vendors: copyVendors,
};
