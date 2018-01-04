import gulp from 'gulp';
import configs from '../../../configs';

export default function({ isProduction }) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function() {
    return gulp
      .src(`${envPath}/${configs.paths.assets.js}/**/*`)
      .pipe(gulp.dest(`${configs.paths.deploy}/${configs.paths.assets.js}`));
  };
}
