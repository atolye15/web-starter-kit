import gulp from 'gulp';
import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

export function deployStyles() {
  return gulp
    .src(`${envPath}/${configs.paths.assets.css}/**/*`)
    .pipe(gulp.dest(`${configs.paths.deploy}/${configs.paths.assets.css}`));
}

export function deployImages() {
  return gulp
    .src(`${envPath}/${configs.paths.assets.img}/**/*`)
    .pipe(gulp.dest(`${configs.paths.deploy}/${configs.paths.assets.img}`));
}

export function deployScripts() {
  return gulp
    .src(`${envPath}/${configs.paths.assets.js}/**/*`)
    .pipe(gulp.dest(`${configs.paths.deploy}/${configs.paths.assets.js}`));
}

export function deployVendors() {
  return gulp
    .src(`${envPath}/${configs.paths.assets.vendors}/**/*`)
    .pipe(gulp.dest(`${configs.paths.deploy}/${configs.paths.assets.vendors}`));
}

export default {
  styles: deployStyles,
  scripts: deployScripts,
  images: deployImages,
  vendors: deployVendors,
};
