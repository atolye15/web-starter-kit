module.exports = function({ gulp, configs, $, browserSync }) {
  return function() {
    return gulp
      .src([`${configs.paths.src}/sass/**/*.scss`, `!${configs.paths.src}/sass/vendors/**`])
      .pipe($.plumber())
      .pipe(
        $.stylelint({
          failAfterError: !browserSync.active,
          reporters: [{ formatter: 'string', console: true }],
        }),
      );
  };
};
