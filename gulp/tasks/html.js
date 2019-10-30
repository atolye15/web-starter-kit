import gulp from 'gulp';
import twig from 'gulp-twig';
import rename from 'gulp-rename';

import configs, { namespaces } from '../../configs';
import { isProduction } from '../utils/parseArguments';
import { notifierErrorHandler } from '../utils/notifier';
import twigFunctions from '../../twig/functions';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

function normalizeTwigFunction(functions) {
  return Object.keys(functions).reduce((accumulator, currentValue) => {
    accumulator.push({
      name: currentValue,
      func: functions[currentValue],
    });
    return accumulator;
  }, []);
}

export default function() {
  return gulp
    .src(configs.entry.pages)
    .pipe(
      twig({
        functions: normalizeTwigFunction(twigFunctions),
        namespaces,
      }),
    )
    .pipe(
      rename(filePath => {
        // eslint-disable-next-line no-param-reassign
        filePath.basename = filePath.basename.replace(/(\.page.html)$/, '');
        return filePath;
      }),
    )
    .pipe(gulp.dest(envPath))
    .on('error', notifierErrorHandler);
}
