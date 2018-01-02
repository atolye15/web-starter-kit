module.exports = function({ gulp, configs, $ }) {
  return function() {
    return gulp
      .src([`${configs.paths.src}/sass/**/*.scss`, `!${configs.paths.src}/sass/vendors/**`])
      .pipe($.plumber())
      .pipe(
        $.stylelint({
          reporters: [{ formatter: 'string', console: true }],
        }),
      );
  };
};
