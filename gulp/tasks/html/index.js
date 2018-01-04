import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import twig from 'gulp-twig';
import rename from 'gulp-rename';

import configs from '../../../configs';
import twigController from '../../../src/twig/controller';

const helperFunctions = [
  {
    name: 'assets',
    func: args => args,
  },
  {
    name: 'isFileExists',
    func: filePath => fs.existsSync(path.resolve(__dirname, '../../../src/twig', filePath)),
  },
];

export default function({ isProduction }) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function() {
    /**
     * 'production' değişkeni çalışma ortamının production olup olmadığı
     * bilgisini depolar. Bu yüzden src/twig/data.json içerisinde production
     * adında bir değişken tanımlamayın!
     */
    twigController.data.production = isProduction;

    return gulp
      .src(`${configs.paths.src}/twig/pages/**/*.twig`)
      .pipe(plumber({ errorHandler: notify.onError('Hata: <%= error.message %>') }))
      .pipe(
        twig({
          data: twigController.data,
          functions: helperFunctions.concat(twigController.functions),
          filters: twigController.filters,
        }),
      )
      .pipe(
        rename(filePath => {
          filePath.basename = filePath.basename.replace(/(\.html)$/, '');
          return filePath;
        }),
      )
      .pipe(gulp.dest(envPath));
  };
}
