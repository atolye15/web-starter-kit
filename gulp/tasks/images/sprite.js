import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';

import configs from '../../../configs';

export default function({ isProduction }) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function() {
    return gulp
      .src(`${configs.paths.src}/img/icons/**/*.svg`)
      .pipe(imagemin([imagemin.svgo({ plugins: [{ removeDimensions: true }] })]))
      .pipe(rename({ prefix: 'icon-' }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename({ basename: 'sprite' }))
      .pipe(gulp.dest('.tmp/img'))
      .pipe(gulp.dest(`${envPath}/${configs.paths.assets.img}`));
  };
}
