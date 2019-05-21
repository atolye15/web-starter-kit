import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import lazypipe from 'lazypipe';
import postcss from 'gulp-postcss';
import uncss from 'uncss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import flexBugsFixes from 'postcss-flexbugs-fixes';
import cssnano from 'cssnano';

import configs from '../../configs';
import { isProduction } from '../utils/parseArguments';
import noop from '../utils/noop';
import { notifierErrorHandler } from '../utils/notifier';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

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

export default function(cb) {
  const uncssOptions = {
    html: [`${envPath}/*.html`],
    ignore: configs.uncss.ignore,
    htmlroot: envPath,
  };

  const stylesMinChannel = lazypipe()
    .pipe(
      postcss,
      [
        configs.uncss.active ? uncss.postcssPlugin(uncssOptions) : function() {},
        cssnano({ discardComments: { removeAll: true } }),
      ],
    )
    .pipe(
      rename,
      { suffix: '.min' },
    )
    .pipe(
      gulp.dest,
      `${envPath}/${configs.paths.assets.css}`,
    );

  /**
   * Warning:
   *   1. Returning the gulp stream causes an uncompleted task, I suppose because of the lazypipe.
   *      So we used the cb function to finish the task.
   *   2. For best performance, don't add Sass partials to `gulp.src`
   */

  return gulp
    .src([`${configs.paths.src}/scss/**/*.scss`], { sourcemaps: true })
    .pipe(plumber({ errorHandler: notifierErrorHandler }))
    .pipe(sass({ precision: 10, importer: inlineCssImporter }))
    .pipe(
      postcss([
        autoprefixer({ cascade: false }),
        flexBugsFixes(),
        isProduction ? mqpacker() : function() {},
      ]),
    )

    .pipe(
      gulp.dest(`${envPath}/${configs.paths.assets.css}`, {
        sourcemaps: isProduction ? false : '.',
      }),
    )
    .pipe(isProduction ? stylesMinChannel() : noop())
    .on('end', cb);
}
