import gulp from 'gulp';
import bump from 'gulp-bump';

export default function() {
  return gulp
    .src('./configs.js')
    .pipe(bump())
    .pipe(gulp.dest('./'));
}
