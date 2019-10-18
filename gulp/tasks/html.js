import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import twig from 'gulp-twig';
import rename from 'gulp-rename';
import cx from 'classnames';

import configs, { namespaces } from '../../configs';
import { isProduction } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

const helperFunctions = [
  {
    name: 'html_classes',
    func: (...args) => cx(...args),
  },
  {
    name: 'html_attributes',
    func: obj =>
      Object.keys(obj)
        .filter(k => k !== '_keys') // remove "_keys" property which added by Twig
        .reduce((acc, cur) => {
          if (typeof obj[cur] === 'boolean') {
            return obj[cur] ? `${acc} ${cur}` : `${acc}`;
          }
          return `${acc} ${cur}="${obj[cur]}"`;
        }, '')
        .trim(),
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

/**
 * Usage
 *
 * components usage {% include '@components/*' %}
 * partials usage {% include '@partials/*' %}
 */

export default function() {
  return gulp
    .src(`${configs.paths.src}/twig/pages/**/*.twig`)
    .pipe(
      twig({
        functions: helperFunctions,
        namespaces,
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
