import gulp from 'gulp';
import notify from 'gulp-notify';

export default function(text) {
  return function() {
    // Disable console logging
    notify.logLevel(1);

    return gulp.src('').pipe(notify(text));
  };
}
