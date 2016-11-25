/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Atolye15
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import fs from 'fs';
// import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import lazypipe from 'lazypipe';
import kss from 'kss';

import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
// import pkg from './package.json';
import configs from './configs.js';
import twigController from './src/twig/controller.js';

import * as tasks from './gulp/tasks';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const isProduction = $.util.env.prod;
const deploy = $.util.env.deploy;
const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

const today = $.util.date('dd-mm-yyyy HH:MM');

const banner = [
  '/*!',
  ' * ' + configs.info.description,
  ' * ' + configs.info.author.name + ' < ' + configs.info.author.email + ' >',
  ' * Version ' + configs.info.version + ' ( ' + today + ' )',
  ' */\n\n'
].join('\n');

const globals = {
  gulp,
  del,
  fs,
  runSequence,
  browserSync,
  lazypipe,
  kss,
  configs,
  twigController,
  $,
  reload,
  isProduction,
  deploy,
  envPath,
  banner,
  pagespeed
};

/**
 * STYLES
 * Sass dosyalarını derleme ve prefix ekleme
 */

// Lint styles
gulp.task('styles:lint', tasks.styles.lint(globals));

gulp.task('styles:main', tasks.styles.main(globals));

gulp.task('styles', cb =>
  runSequence(
    'styles:lint',
    'styles:main',
    cb
  )
);

/**
 * SCRIPTS
 * Javascript dosyalarının derleme işlemleri
 */

gulp.task('scripts:babel', tasks.scripts.babel(globals));
gulp.task('scripts:lint', tasks.scripts.lint(globals));
gulp.task('scripts:sync', ['scripts:babel', 'scripts:lint'], tasks.scripts.sync(globals));
gulp.task('scripts:main', ['scripts:sync'], tasks.scripts.main(globals));
gulp.task('scripts:libs', tasks.scripts.libs(globals));
gulp.task('scripts:combine', tasks.scripts.combine(globals));

gulp.task('scripts', cb =>
  runSequence(
    'scripts:libs',
    'scripts:main',
    'scripts:combine',
    cb
  )
);

/**
 * IMAGES
 * Resim optimizasyon işlemleri
 */

// Optimize images
gulp.task('images:optimize', tasks.images.optimize(globals));
gulp.task('images:sync', tasks.images.sync(globals));
gulp.task('images:deploy', tasks.images.deploy(globals));
gulp.task('images:sprite', tasks.images.sprite(globals));

gulp.task('images', cb =>
  runSequence(
    'images:optimize',
    'images:sync',
    'images:deploy',
    cb
  )
);

/**
 * HTML
 * Html(Twig) derleme işlemleri
 */
gulp.task('html:main', tasks.html(globals));
gulp.task('html', cb =>
  runSequence(
    'clean:sprite',
    'images:sprite',
    'html:main',
    cb
  )
);

/**
 * COPY
 * Statik dosyaların kopyalanma işlemleri
 */

gulp.task('copy:fonts', tasks.copy.fonts(globals));
gulp.task('copy:vendors', tasks.copy.vendors(globals));

/**
 * CLEAN
 * Klasör temizleme işlemleri
 */

// Clean output directory
gulp.task('clean:dist', () => del([envPath + '/*'], {dot: true}));
gulp.task('clean:imgCache', () => del(['.tmp/img/*'], {dot: true}));
gulp.task('clean:babelCache', () => del(['.tmp/babel/*'], {dot: true}));
gulp.task('clean:tempJs', () => del(['.tmp/js/*'], {dot: true}));
gulp.task('clean:deployFolder', () => del([configs.paths.deploy + '/*'], {dot: true, force: true}));
gulp.task('clean:sprite', () => del(['.tmp/img/sprite.svg'], {dot: true}));

/**
 * DEPLOY
 * Build edilmiş assetslerin backend tarafından kullanılabilecek deploy klasörüne
 * kopyalanma işlemleri
 */

gulp.task('deploy:styles', tasks.deploy.styles(globals));
gulp.task('deploy:scripts', tasks.deploy.scripts(globals));
gulp.task('deploy:images', tasks.deploy.images(globals));
gulp.task('deploy:vendors', tasks.deploy.vendors(globals));

gulp.task('deploy', cb => {
  if (!deploy) {
    return cb();
  }
  return runSequence(
    ['clean:deployFolder'],
    ['deploy:styles', 'deploy:scripts', 'deploy:images', 'deploy:vendors'],
    cb
  );
});

/**
 * NOTIFY
 * Notifikasyon işlemleri
 */

gulp.task('notify:build',
  tasks.notify(globals, 'Build işlemi başarılı bir şekilde tamamlandı.')
);

/**
 * BUILD
 * Build işlemleri bu task çağırılarak yapılır
 * Burada yapılan işlemlerin sırası önemlidir.
 */
gulp.task('build', cb =>
  runSequence(
    ['clean:dist', 'clean:tempJs'],
    ['styles', 'scripts', 'html', 'images', 'copy:fonts', 'copy:vendors'],
    'deploy',
    'notify:build',
    cb
  )
);

/**
 * SYNC
 * Klasörlerin eşitlenme işlemleri
 * Bu taskklar sadece watch aktifken çalışır
 * Tüm dosyaların sürekli tekrardan kopyalanmaması için tanımlanmıştır.
 */

// src deki font klasörü ile dist'deki font klasörünü eşitler.
gulp.task('sync:build-fonts', tasks.sync.regular(
  globals, 'fonts', configs.paths.assets.fonts
));

// src deki resim klasörü ile dist'deki resim klasörünü eşitler.
gulp.task('sync:build-image', tasks.sync.regular(
  globals, 'img', configs.paths.assets.img
));

// src deki vendors klasörü ile dist'deki vendors klasörünü eşitler.
gulp.task('sync:build-vendors', tasks.sync.regular(
  globals, 'vendors', configs.paths.assets.vendors
));

// deploy pathdeki css klasörü ile dist'deki css klasörünü eşitler.
gulp.task('sync:deploy-styles', tasks.sync.deploy(globals, 'css'));

// deploy pathdeki javascript klasörü ile dist'deki javascript klasörünü eşitler.
gulp.task('sync:deploy-scripts', tasks.sync.deploy(globals, 'js'));

// deploy pathdeki image klasörü ile dist'deki image klasörünü eşitler.
gulp.task('sync:deploy-images', tasks.sync.deploy(globals, 'img'));

// deploy pathdeki image klasörü ile dist'deki image klasörünü eşitler.
gulp.task('sync:deploy-vendors', tasks.sync.deploy(globals, 'vendors'));

/**
 * WATCH
 * Watch files for changes & reload
 */

gulp.task('serve', () => {
  browserSync(configs.browserSync);

  gulp.watch([configs.paths.src + '/twig/**/*.{twig,html}'], ['html:main', reload])
    .on('change', () => {
      if (configs.uncss.active) {
        return runSequence('styles:main');
      }
    });
  gulp.watch([configs.paths.src + '/img/{icons,icons/**}'], ['html'], reload);
  gulp.watch([configs.paths.src + '/sass/**/*.scss'], () => {
    runSequence('styles', 'sync:deploy-styles', reload);
  });
  gulp.watch([configs.paths.src + '/fonts/**/*'], () => {
    runSequence('sync:build-fonts', 'sync:deploy-styles', reload);
  });
  gulp.watch([configs.paths.src + '/js/**/*.js'], () => {
    runSequence('scripts:main', 'scripts:combine', 'sync:deploy-scripts', reload);
  });
  gulp.watch([configs.paths.src + '/libs/**/*.js'], () => {
    runSequence('scripts:libs', 'scripts:combine', 'sync:deploy-scripts', reload);
  });
  gulp.watch([configs.paths.src + '/vendors/**'], () => {
    runSequence('sync:build-vendors', 'sync:deploy-vendors', reload);
  });
  gulp.watch([
    `${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/{icons,icons/**}`
  ], () => {
    runSequence('sync:build-image', 'sync:deploy-images', reload);
  });
  gulp.watch(['configs.js'], ['build', reload]);
});

/**
 * PAGE SPEED
 * Run PageSpeed Insights
 */

gulp.task('pagespeed', tasks.pagespeed(globals));

/**
 * Generates KSS living styleguide
 */

gulp.task('styleguide', cb => {
  return kss(configs.styleGuide, cb);
});
