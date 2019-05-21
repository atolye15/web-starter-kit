import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import plumber from 'gulp-plumber';
import twig from 'gulp-twig';
import rename from 'gulp-rename';

import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';
import twigController from '../../src/twig/controller';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

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

export default function() {
  /**
   * The variable 'production' stores information about whether the working environment is production.
   * So do not define this variable in `src/twig/data.json`!
   */
  twigController.data.production = isProduction;

  return gulp
    .src(`${configs.paths.src}/twig/pages/**/*.twig`)
    .pipe(
      plumber({
        errorHandler: notifierErrorHandler,
      }),
    )
    .pipe(
      twig({
        data: twigController.data,
        functions: helperFunctions.concat(twigController.functions),
        filters: twigController.filters,
      }),
    )
    .pipe(
      rename(filePath => {
        // eslint-disable-next-line no-param-reassign
        filePath.basename = filePath.basename.replace(/(\.html)$/, '');
        return filePath;
      }),
    )
    .pipe(gulp.dest(envPath));
}
