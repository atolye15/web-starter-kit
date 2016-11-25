
module.exports = function({gulp, configs, $, fs, del}) {
  return function() {
    gulp.src('.tmp/babel/**/*')
      .pipe($.foreach((stream, file) => {
        if (!fs.existsSync(configs.paths.src + '/js/' + file.relative)) {
          del('.tmp/babel/' + file.relative);
          $.util.log(
            $.util.colors.red('[scripts:sync] >> ' + file.relative + ' deleted from tmp!')
          );
        }
        return stream;
      }));
  };
};
