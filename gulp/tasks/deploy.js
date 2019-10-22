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

export function deployPublic() {
  return gulp.src(`${configs.paths.src}/public/**/*`).pipe(gulp.dest(`${configs.paths.deploy}/`));
}

export default {
  styles: deployStyles,
  scripts: deployScripts,
  images: deployImages,
  public: deployPublic,
};
