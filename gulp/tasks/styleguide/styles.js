import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import flexBugsFixes from 'postcss-flexbugs-fixes';

import configs from '../../../configs';
import { paths } from '../../../kss/configs';
import errorHandler from '../../utils/errorHandler';

function inlineCssImporter(url, prev) {
  if (!url.endsWith('.css')) {
    return { file: url };
  }

  const resolvedPath = path.resolve(path.dirname(prev), url);

  if (!fs.existsSync(resolvedPath)) {
    return new Error(`Could not find url: ${url}`);
  }

  const contents = fs.readFileSync(resolvedPath, 'utf-8');

  return { contents };
}

export default function styles() {
  return gulp
    .src(configs.entry.styles, { sourcemaps: true })
    .pipe(sass({ precision: 10, importer: inlineCssImporter }).on('error', errorHandler))
    .pipe(postcss([autoprefixer({ cascade: false }), flexBugsFixes()]))
    .pipe(
      gulp.dest(`${paths.dist}/${paths.assets.styles}`, {
        sourcemaps: '.',
      }),
    )
    .on('error', errorHandler);
}
