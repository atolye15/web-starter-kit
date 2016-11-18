
module.exports = function({gulp, configs, $}) {
  return function() {
    var babelFiles = [];
    if (configs.jsFiles.length) {
      babelFiles = configs.jsFiles.map(path => {
        return configs.paths.src + '/js/' + path;
      });
    }
    return gulp.src(babelFiles, {base: 'src/js'})
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.newer('.tmp/babel'))
      .pipe($.babel())
      .pipe($.size({title: 'Babel'}))
      .pipe(gulp.dest('.tmp/babel'));
  };
};
