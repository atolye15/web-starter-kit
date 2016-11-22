
import fs from 'fs';
import path from 'path';

const helperFunctions = [
  {
    name: 'assets',
    func: args => {
      return args;
    }
  },
  {
    name: 'isFileExists',
    func: filePath =>
      fs.existsSync(path.resolve(__dirname, '../../../src/twig', filePath))
  }
];

module.exports = function({gulp, configs, $, twigController, isProduction, envPath}) {
  return function() {
    /**
     * 'production' değişkeni çalışma ortamının production olup olmadığı
     * bilgisini depolar. Bu yüzden src/twig/data.json içerisinde production
     * adında bir değişken tanımlamayın!
     */
    twigController.data.production = isProduction;
    return gulp.src(configs.paths.src + '/twig/pages/**/*.twig')
      .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
      .pipe($.twig({
        data: twigController.data,
        functions: helperFunctions.concat(twigController.functions),
        filters: twigController.filters
      }))
      .pipe($.rename(path => {
        path.basename = path.basename.replace(/(\.html)$/, '');
        return path;
      }))
      .pipe(gulp.dest(envPath));
  };
};
