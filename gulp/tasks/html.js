import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import twig from 'gulp-twig';
import rename from 'gulp-rename';
import cx from 'classnames';

import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

const helperFunctions = [
  {
    name: 'html_classes',
    func: (...args) => cx(...args),
  },
  {
    name: 'asset',
    func: args => args,
  },
  {
    name: 'is_file_exists',
    func: filePath => fs.existsSync(path.resolve(__dirname, '../../src/twig', filePath)),
  },
  {
    name: 'is_production',
    func: () => isProduction,
  },
];

export default function() {
  return gulp
    .src(`${configs.paths.src}/twig/pages/**/*.twig`)
    .pipe(
      twig({
        functions: helperFunctions,
      }),
    )
    .pipe(
      rename(filePath => {
        // eslint-disable-next-line no-param-reassign
        filePath.basename = filePath.basename.replace(/(\.html)$/, '');
        return filePath;
      }),
    )
    .pipe(gulp.dest(envPath))
    .on('error', notifierErrorHandler);
}
