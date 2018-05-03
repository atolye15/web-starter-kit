import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import lazypipe from 'lazypipe';
import postcss from 'gulp-postcss';
import uncss from 'uncss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';

import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import util from 'gulp-util';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import flexBugsFixes from 'postcss-flexbugs-fixes';
import cssnano from 'cssnano';

import configs from '../../../configs';

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

export default function({ isProduction }) {
  const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

  return function() {
    const uncssOptions = {
      html: [`${envPath}/*.html`],
      ignore: configs.uncss.ignore,
      htmlroot: envPath,
    };

    const stylesMinChannel = lazypipe()
      .pipe(postcss, [
        configs.uncss.active ? uncss.postcssPlugin(uncssOptions) : function() {},
        cssnano({ discardComments: { removeAll: true } }),
      ])
      .pipe(rename, { suffix: '.min' })
      .pipe(gulp.dest, `${envPath}/${configs.paths.assets.css}`);

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp
      .src([`${configs.paths.src}/scss/**/*.scss`])
      .pipe(plumber({ errorHandler: notify.onError('Hata: <%= error.message %>') }))
      .pipe(isProduction ? util.noop() : sourcemaps.init())
      .pipe(sass({ precision: 10, importer: inlineCssImporter }).on('error', sass.logError))
      .pipe(
        postcss([
          autoprefixer({ cascade: false }),
          flexBugsFixes(),
          isProduction ? mqpacker() : function() {},
        ]),
      )
      .pipe(isProduction ? util.noop() : sourcemaps.write('./'))
      .pipe(gulp.dest(`${envPath}/${configs.paths.assets.css}`))
      .pipe(isProduction ? stylesMinChannel() : util.noop());
  };
}
