import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import directorySync from 'gulp-directory-sync';

import configs from '../../../configs';

export default function({ isProduction, isDeploy }, folderName) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function(cb) {
    if (!isDeploy) {
      return cb();
    }
    return gulp
      .src('')
      .pipe(plumber({ errorHandler: notify.onError('Hata: <%= error.message %>') }))
      .pipe(
        directorySync(
          `${envPath}/${configs.paths.assets[folderName]}`,
          `${configs.paths.deploy}/${configs.paths.assets[folderName]}`,
          { printSummary: true },
        ),
      );
  };
}
