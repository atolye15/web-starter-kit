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
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
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
    .pipe($.newer('.tmp/babel'))
    .pipe($.babel())
    .pipe($.size({title: 'Babel'}))
    .pipe(gulp.dest('.tmp/babel'))
});

// Lint JavaScript
gulp.task('scripts:lint', () => {
  if (!configs.lint.scripts) return;
  return gulp.src(configs.paths.src + '/js/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(!browserSync.active ? $.eslint.failOnError() : $.util.noop())
});

gulp.task('scripts:sync', () => {
  gulp.src('.tmp/babel/**/*')
    .pipe( $.foreach( (stream, file) => {
      if (!fs.existsSync(configs.paths.src + '/js/' + file.relative)) {
        del('.tmp/babel/'+ file.relative);
        $.util.log($.util.colors.red('[scripts:sync] ' + file.relative + ' deleted from tmp!'));
      }
      return stream;
    }));
});

gulp.task('scripts:main', () => {
  var jsFiles = []
  if (configs.jsFiles.length) {
    jsFiles = configs.jsFiles.map((path) => {
      return '.tmp/babel/' + path
    });
  }
  return gulp.src(jsFiles)
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
    .pipe($.concat('app.min.js'))
    .pipe($.uglify())
    .pipe($.size({title: 'App Js'}))
    .pipe($.header(banner))
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.js))
});

gulp.task('scripts', cb =>
  runSequence(
    'scripts:vendors',
    ['scripts:babel', 'scripts:lint'],
    'scripts:sync',
    'scripts:main',
    'scripts:combine',
    cb
  )
);

// Optimize images
gulp.task('images:optimize', () => {
  return gulp.src(configs.paths.src + '/img/**/*')
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
        $.util.log($.util.colors.red('[images:sync] ' + file.relative + ' deleted from tmp!'));
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

// Build production files, the default task
gulp.task('build', cb =>
  runSequence(
    ['clean:dist', 'clean:tempJs'],
    ['styles', 'scripts', 'html', 'images', 'copy:fonts', 'copy:libs'],
    cb
  )
);


// Scan your HTML for assets & optimize them
// gulp.task('html', () => {
//   return gulp.src('app/**/*.html')
//     .pipe($.useref({searchPath: '{.tmp,app}'}))
//     // Remove any unused CSS
//     .pipe($.if('*.css', $.uncss({
//       html: [
//         'app/index.html'
//       ],
//       // CSS Selectors for UnCSS to ignore
//       ignore: []
//     })))

//     // Concatenate and minify styles
//     // In case you are still using useref build blocks
//     .pipe($.if('*.css', $.minifyCss()))

//     // Minify any HTML
//     .pipe($.if('*.html', $.minifyHtml()))
//     // Output files
//     .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
//     .pipe(gulp.dest('dist'));
// });


// Watch files for changes & reload
gulp.task('serve', () => {

  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    proxy: configs.proxyUrl,
    open: false,
    // Allow scroll syncing across breakpoints
    // scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    // server: [configs.paths.dev],
    port: 3000
  });

  gulp.watch([configs.paths.src + '/twig/**/*.twig'], ['html', reload]);
  gulp.watch([configs.paths.src + '/sass/**/*.scss'], ['styles', reload]);
  gulp.watch([configs.paths.src + '/fonts/**/*'], ['copy:fonts', reload]);
  gulp.watch([configs.paths.src + '/js/**/*.js'], ['scripts:main', 'scripts:combine', reload]);
  gulp.watch([configs.paths.src + '/libs/**/*'], ['copy:libs', reload]);
  gulp.watch([configs.paths.src + '/vendors/**/*.js'], ['scripts:vendors', 'scripts:combine', reload]);
  gulp.watch([configs.paths.src + '/img/**/*'], ['images', reload]);
});

// Build and serve the output from the dist build
// gulp.task('serve:dist', ['default'], () =>
//   browserSync({
//     notify: false,
//     logPrefix: 'WSK',
//     // Allow scroll syncing across breakpoints
//     scrollElementMapping: ['main', '.mdl-layout'],
//     // Run as an https by uncommenting 'https: true'
//     // Note: this uses an unsigned certificate which on first access
//     //       will present a certificate warning in the browser.
//     // https: true,
//     server: 'dist',
//     port: 3001
//   })
// );

// Build production files, the default task
// gulp.task('default', ['clean'], cb =>
//   runSequence(
//     'styles',
//     ['lint', 'html', 'scripts', 'images', 'copy'],
//     'generate-service-worker',
//     cb
//   )
// );

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

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    stripPrefix: path.join(rootDir, path.sep)
  });
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
