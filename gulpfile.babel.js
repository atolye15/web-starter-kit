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
const isDeploy = argv.deploy;

/**
 * CLEAN
 */

gulp.task('clean:dist', tasks.clean.dist);
gulp.task('clean:tempJs', tasks.clean.tempJs);
gulp.task('clean:deployFolder', tasks.clean.deployFolder);
gulp.task('clean:icons-sprite', tasks.clean.iconsSprite);

/**
 * COPY
 */

gulp.task('copy:images', tasks.copy.images);
gulp.task('copy:fonts', tasks.copy.fonts);
gulp.task('copy:vendors', tasks.copy.vendors);

/**
 * STYLES
 */

gulp.task('styles:main', tasks.styles);
gulp.task('styles', gulp.series('styles:main'));

/**
 * SCRIPTS
 */

gulp.task('scripts:main', tasks.scripts.main);
gulp.task('scripts:libs', tasks.scripts.libs);
gulp.task('scripts:combine', tasks.scripts.combine);

gulp.task('scripts', gulp.series('scripts:libs', 'scripts:main', 'scripts:combine'));

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
 * DEPLOY
 * Copy the builded assets to the deploy folder
 */

gulp.task('deploy:styles', tasks.deploy.styles);
gulp.task('deploy:scripts', tasks.deploy.scripts);
gulp.task('deploy:images', tasks.deploy.images);
gulp.task('deploy:vendors', tasks.deploy.vendors);

gulp.task(
  'deploy',
  gulp.series(
    'clean:deployFolder',
    gulp.parallel('deploy:styles', 'deploy:scripts', 'deploy:images', 'deploy:vendors'),
  ),
);

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
    'clean:tempJs',
    gulp.parallel('html', 'scripts'),
    gulp.parallel('styles', 'copy:images', 'copy:fonts', 'copy:vendors'),
    skippable(isDeploy, 'deploy'),
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
gulp.task('sync:build-fonts', tasks.sync.build.fonts);
gulp.task('sync:build-image', tasks.sync.build.image);
gulp.task('sync:build-vendors', tasks.sync.build.vendors);

// DEPLOY
gulp.task('sync:deploy-styles', tasks.sync.deploy.css);
gulp.task('sync:deploy-scripts', tasks.sync.deploy.js);
gulp.task('sync:deploy-images', tasks.sync.deploy.img);
gulp.task('sync:deploy-vendors', tasks.sync.deploy.vendors);

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
    [`${configs.paths.src}/{twig,scss}/**/*.twig`],
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
    [`${configs.paths.src}/scss/**/*.scss`],
    { cwd: './' },
    gulp.series('styles', 'sync:deploy-styles', 'styleguide', 'reload'),
  );

  gulp.watch(
    [`${configs.paths.src}/fonts/**/*`],
    gulp.series('sync:build-fonts', 'sync:deploy-styles', 'reload'),
  );

  gulp.watch(
    [`${configs.paths.src}/js/**/*.js`],
    { cwd: './' },
    gulp.series('scripts:main', 'scripts:combine', 'sync:deploy-scripts', 'reload'),
  );

  gulp.watch(
    [`${configs.paths.src}/libs/**/*.js`],
    gulp.series('scripts:libs', 'scripts:combine', 'sync:deploy-scripts', 'reload'),
  );

  gulp.watch(
    [`${configs.paths.src}/vendors/**`],
    gulp.series('sync:build-vendors', 'sync:deploy-vendors', 'reload'),
  );

  gulp.watch(
    [`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/icons/**`],
    gulp.series('sync:build-image', 'sync:deploy-images', 'reload'),
  );
});

/**
 * Generates KSS living styleguide
 */

gulp.task('styleguide', () => kss(configs.styleGuide));

gulp.task('bump', tasks.bump);
