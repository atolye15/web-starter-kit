/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Atolye15
 *
 */

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.

import gulp from 'gulp';
import browserSyncBase from 'browser-sync';
import kss from 'kss';
import minimist from 'minimist';

import tasks from './gulp/tasks';
import configs from './configs';
import skippable from './gulp/utils/skippable';

const argv = minimist(process.argv.slice(2));

const browserSync = browserSyncBase.create();

const isProduction = argv.prod;

/**
 * CLEAN
 */

gulp.task('clean:dist', tasks.clean.dist);
gulp.task('clean:icons-sprite', tasks.clean.iconsSprite);

/**
 * COPY
 */

gulp.task('copy:images', tasks.copy.images);
gulp.task('copy:fonts', tasks.copy.fonts);
gulp.task('copy:public', tasks.copy.public);

/**
 * STYLES
 */

gulp.task('styles:main', tasks.styles);
gulp.task('styles', gulp.series('styles:main'));

/**
 * SCRIPTS
 */

gulp.task('scripts:main', tasks.scripts.main);
gulp.task('scripts', gulp.series('scripts:main'));

/**
 * Icons Sprite
 */

gulp.task('icons:sprite', tasks.icons.sprite);

/**
 * HTML
 */

gulp.task('html:main', tasks.html);
gulp.task('html', gulp.series('clean:icons-sprite', 'icons:sprite', 'html:main'));

/**
 * NOTIFY
 */

gulp.task('notify:build', tasks.notify.buildComplete);

gulp.task('log:build-success', tasks.log.buildSuccess);

/**
 * BUILD
 * Build operations are done by calling this task.
 * the sequence of tasks are important!
 */
gulp.task(
  'build',
  gulp.series(
    'clean:dist',
    gulp.parallel('html', 'scripts'),
    gulp.parallel('styles', 'copy:images', 'copy:fonts', 'copy:public'),
    'notify:build',
    'log:build-success',
  ),
);

/**
 * SYNC
 * Synchronization of folders
 * These tasks only work when watch is active
 */

// BUILD
gulp.task('sync:fonts', tasks.sync.fonts);
gulp.task('sync:images', tasks.sync.images);

// Reload
gulp.task('reload', cb => {
  browserSync.reload();
  cb();
});

/**
 * WATCH
 * Watch files for changes & reload
 */

gulp.task('serve', () => {
  browserSync.init(configs.browserSync);

  gulp.watch(
    [`${configs.paths.src}/**/*.twig`],
    { cwd: './' },
    gulp.series(
      'html:main',
      skippable(isProduction && configs.uncss.active, 'styles:main'),
      'styleguide',
      'reload',
    ),
  );

  gulp.watch([`${configs.paths.src}/img/icons/*.svg`], gulp.series('html', 'reload'));

  gulp.watch(
    [`${configs.paths.src}/**/*.scss`],
    { cwd: './' },
    gulp.series('styles', 'styleguide', 'reload'),
  );

  gulp.watch([`${configs.paths.src}/fonts/**/*`], gulp.series('sync:fonts', 'reload'));

  gulp.watch(
    [`${configs.paths.src}/**/*.js`],
    { cwd: './' },
    gulp.series('scripts:main', 'reload'),
  );

  gulp.watch(
    [`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/icons/**`],
    gulp.series('sync:images', 'reload'),
  );
});

/**
 * Generates KSS living styleguide
 */

gulp.task('styleguide', () => kss(configs.styleGuide));

gulp.task('bump', tasks.bump);
