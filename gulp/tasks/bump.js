import gulp from 'gulp';
import bump from 'gulp-babel';

export default function() {
  return function() {
    return gulp
      .src('./configs.js')
      .pipe(bump())
      .pipe(gulp.dest('./'));
  };
}
