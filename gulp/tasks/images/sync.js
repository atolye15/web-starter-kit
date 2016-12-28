
module.exports = function({gulp, configs, $, fs, del}) {
  return function() {
    return gulp.src(['.tmp/img/**/*', '!.tmp/img/sprite.svg'])
      .pipe($.foreach((stream, file) => {
        if (!fs.existsSync(configs.paths.src + '/img/' + file.relative)) {
          del('.tmp/img/' + file.relative);
          $.util.log($.util.colors.red('[images:sync] >> ' + file.relative + ' deleted from tmp!'));
        }
        return stream;
      }));
  };
};
