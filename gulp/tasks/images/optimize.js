import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import configs from '../../../configs';

export default function() {
  return function() {
    return gulp
      .src([`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/{icons,icons/**}`])
      .pipe(plumber({ errorHandler: notify.onError('Hata: <%= error.message %>') }))
      .pipe(newer('.tmp/img'))
      .pipe(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({ plugins: [{ removeDimensions: true }] }),
        ]),
      )
      .pipe(gulp.dest('.tmp/img'));
  };
}
