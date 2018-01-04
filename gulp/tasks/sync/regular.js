import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import directorySync from 'gulp-directory-sync';

import configs from '../../../configs';

export default function({ isProduction }, src, dist) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function() {
    return gulp
      .src('')
      .pipe(plumber({ errorHandler: notify.onError('Hata: <%= error.message %>') }))
      .pipe(
        directorySync(`${configs.paths.src}/${src}`, `${envPath}/${dist}`, {
          printSummary: true,
        }),
      );
  };
}
