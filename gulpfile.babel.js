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
import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import lazypipe from 'lazypipe';
import pngquant from 'imagemin-pngquant';


import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';
import configs from './configs.js';
import twigController from './src/twig/controller.js';
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const isProduction = $.util.env.prod;
const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

const today = $.util.date('dd-mm-yyyy HH:MM');

const banner = [
  '/*!',
  ' * ' + configs.info.description,
  ' * ' + configs.info.author.name + ' < ' + configs.info.author.email + ' >',
  ' * Version ' + configs.info.version + ' ( ' + today + ' )',
  ' */\n\n'
].join('\n')

//
// Sass dosyalarını derleme ve prefix ekleme
//

gulp.task('styles', () => {

  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 33',
    'chrome >= 36',
    'safari >= 7',
    'opera >= 26',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  const stylesMinChannel = lazypipe()
    .pipe($.minifyCss, { keepSpecialComments: 0 })
    .pipe($.rename, { suffix: '.min' })
    .pipe($.header, banner)
    .pipe(gulp.dest, envPath + '/' + configs.paths.assets.css);

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    configs.paths.src + '/sass/**/*.scss'
  ])
    .pipe($.plumber({errorHandler: $.notify.onError("Hata: <%= error.message %>")}))
    .pipe($.sourcemaps.init())
    .pipe($.sass({ precision: 10 }).on('error', $.sass.logError))
    .pipe(isProduction ? $.mergeMediaQueries({ log: true }) : $.util.noop())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(!isProduction ? $.sourcemaps.write('./') : $.util.noop())
    .pipe($.header(banner))
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.css))
    .pipe(isProduction ? stylesMinChannel() : $.util.noop())
    .pipe($.size({ title: 'Css' }));
});

/**
 * Javascript dosyalarının derleme işlemleri
 */

// Compile Babel
gulp.task('scripts:babel', () => {
  var babelFiles = []
  if (configs.jsFiles.length) {
    babelFiles = configs.jsFiles.map((path) => {
      return configs.paths.src + '/js/' + path
    });
  }
  return gulp.src(babelFiles)
    .pipe($.plumber({errorHandler: $.notify.onError("Hata: <%= error.message %>")}))
    .pipe($.newer('.tmp/babel'))
    .pipe($.babel())
    .pipe($.size({title: 'Babel'}))
    .pipe(gulp.dest('.tmp/babel'))
});

// Lint JavaScript
gulp.task('scripts:lint', () => {
  if (!configs.lint.scripts) return;
  return gulp.src(configs.paths.src + '/js/**/*.js')
    .pipe($.plumber({errorHandler: $.notify.onError("Hata: <%= error.message %>")}))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(!browserSync.active ? $.eslint.failOnError() : $.util.noop())
});

gulp.task('scripts:sync', ['scripts:babel', 'scripts:lint'], () => {
  gulp.src('.tmp/babel/**/*')
    .pipe( $.foreach( (stream, file) => {
      if (!fs.existsSync(configs.paths.src + '/js/' + file.relative)) {
        del('.tmp/babel/'+ file.relative);
        $.util.log($.util.colors.red('[scripts:sync] >> ' + file.relative + ' deleted from tmp!'));
      }
      return stream;
    }));
});

gulp.task('scripts:main', ['scripts:sync'], () => {
  var jsFiles = []
  if (configs.jsFiles.length) {
    jsFiles = configs.jsFiles.map((path) => {
      return '.tmp/babel/' + path
    });
  }
  return gulp.src(jsFiles)
    .pipe($.plumber({errorHandler: $.notify.onError("Hata: <%= error.message %>")}))
    .pipe($.sourcemaps.init())
    .pipe($.concat('main.js'))
    .pipe($.size({title: 'Js'}))
    .pipe(!isProduction ? $.sourcemaps.write('./') : $.util.noop())
    .pipe($.header(banner))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(!isProduction ? gulp.dest(envPath + '/' + configs.paths.assets.js) : $.util.noop())
});

gulp.task('scripts:vendors', () => {
  var vendorFiles = []
  if (configs.vendorFiles.length) {
    vendorFiles = configs.vendorFiles.map((path) => {
      return configs.paths.src + '/vendors/' + path
    });
  }
  return gulp.src(vendorFiles)
    .pipe($.plumber({errorHandler: $.notify.onError("Hata: <%= error.message %>")}))
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendors.js'))
    .pipe($.size({title: 'Vendors'}))
    .pipe(!isProduction ? $.sourcemaps.write('./') : $.util.noop())
    .pipe($.header(banner))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(!isProduction ? gulp.dest(envPath + '/' + configs.paths.assets.js) : $.util.noop())
});

gulp.task('scripts:combine', () => {
  if (!isProduction) return;
  return gulp.src([
    '.tmp/js/vendors.js',
    '.tmp/js/main.js'
  ])
    .pipe($.plumber({errorHandler: $.notify.onError("Hata: <%= error.message %>")}))
    .pipe($.concat('app.min.js'))
    .pipe($.uglify())
    .pipe($.size({title: 'App Js'}))
    .pipe($.header(banner))
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.js))
});

gulp.task('scripts', cb =>
  runSequence(
    'scripts:vendors',
    'scripts:main',
    'scripts:combine',
    cb
  )
);

// Optimize images
gulp.task('images:optimize', () => {
  return gulp.src(configs.paths.src + '/img/**/*')
    .pipe($.plumber({errorHandler: $.notify.onError("Hata: <%= error.message %>")}))
    .pipe($.newer('.tmp/img'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe($.size({title: 'Image Optimize'}))
    .pipe(gulp.dest('.tmp/img'))
});

gulp.task('images:sync', () => {
  gulp.src('.tmp/img/**/*')
    .pipe( $.foreach( (stream, file) => {
      if (!fs.existsSync(configs.paths.src + '/img/' + file.relative)) {
        del('.tmp/img/'+ file.relative);
        $.util.log($.util.colors.red('[images:sync] >>' + file.relative + ' deleted from tmp!'));
      }
      return stream;
    }));
});

gulp.task('images:deploy', () =>
  gulp.src('.tmp/img/**/*')
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.img))
    .pipe($.size({title: 'Images'}))
);

gulp.task('images', cb =>
  runSequence(
    'images:optimize',
    'images:sync',
    'images:deploy',
    cb
  )
);

gulp.task('html', () => {
  /**
   * 'production' değişkeni çalışma ortamının production olup olmadığı
   * bilgisini depolar. Bu yüzden src/twig/data.json içerisinde production
   * adında bir değişken tanımlamayın!
   */
  twigController.data.production = isProduction
  return gulp.src(configs.paths.src + '/twig/pages/**/*.twig')
    .pipe($.plumber({errorHandler: $.notify.onError("Hata: <%= error.message %>")}))
    .pipe($.twig({
      data: twigController.data,
      functions: twigController.functions
    }))
    .pipe(gulp.dest(envPath));
});

gulp.task('copy:fonts', () => {
  //TODO copy taskından önce distdeki klasörün temizlenmesi
  gulp.src(configs.paths.src + '/fonts/*')
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.fonts));
});

gulp.task('copy:libs', () => {
  //TODO copy taskından önce distdeki klasörün temizlenmesi
  gulp.src(configs.paths.src + '/libs/*')
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.libs ));
});

// Clean output directory
gulp.task('clean:dist', cb => del([envPath + '/*'], {dot: true}));
gulp.task('clean:imgCache', cb => del(['.tmp/img/*'], {dot: true}));
gulp.task('clean:babelCache', cb => del(['.tmp/babel/*'], {dot: true}));
gulp.task('clean:tempJs', cb => del(['.tmp/js/*'], {dot: true}));

gulp.task('notify:build', () => {
  return gulp.src('')
    .pipe($.notify('Build işlemi başarılı bir şekilde tamamlandı.'))
});

// Build production files, the default task
gulp.task('build', cb =>
  runSequence(
    ['clean:dist', 'clean:tempJs'],
    ['styles', 'scripts', 'html', 'images', 'copy:fonts', 'copy:libs'],
    'notify:build',
    cb
  )
);

// Watch files for changes & reload
gulp.task('serve', () => {

  browserSync(configs.browserSync);

  gulp.watch([configs.paths.src + '/twig/**/*.twig'], ['html', reload]);
  gulp.watch([configs.paths.src + '/sass/**/*.scss'], ['styles', reload]);
  gulp.watch([configs.paths.src + '/fonts/**/*'], ['copy:fonts', reload]);
  gulp.watch([configs.paths.src + '/js/**/*.js'], ['scripts:main', 'scripts:combine', reload]);
  gulp.watch([configs.paths.src + '/libs/**/*'], ['copy:libs', reload]);
  gulp.watch([configs.paths.src + '/vendors/**/*.js'], ['scripts:vendors', 'scripts:combine', reload]);
  gulp.watch([configs.paths.src + '/img/**/*'], ['images', reload]);
});


// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  // Update the below URL to the public URL of your site
  pagespeed('example.com', {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb)
);

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('dist/scripts/sw'));
});
