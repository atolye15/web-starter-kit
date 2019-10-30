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

function flattenFilePath(filePath) {
  if (filePath.dirname === '.') {
    return filePath;
  }

  return Object.assign(filePath, {
    basename: `${filePath.dirname.split('/').join('-')}-${filePath.basename}`,
    dirname: '.',
  });
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
      rename(filePath =>
        flattenFilePath(
          // Here we use Object.assign instead of object spread operator(...) because
          // we should not lose the object reference. Otherwise, rename will not work correctly
          Object.assign(filePath, { basename: filePath.basename.replace(/(\.html)$/, '') }),
        ),
      ),
    )
    .pipe(gulp.dest(envPath))
    .on('error', notifierErrorHandler);
}
