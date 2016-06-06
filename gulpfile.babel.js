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
import pngquant from 'imagemin-pngquant';

import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
// import pkg from './package.json';
import configs from './configs.js';
import twigController from './src/twig/controller.js';
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

/**
 * STYLES
 * Sass dosyalarını derleme ve prefix ekleme
 */

// Lint styles
gulp.task('styles:lint', cb => {
  if (!configs.lint.styles) {
    return cb();
  }
  return gulp.src([
    `${configs.paths.src}/sass/**/*.scss`, `!${configs.paths.src}/sass/bootstrap/**`
  ])
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.scssLint())
    .pipe(browserSync.active ? $.util.noop() : $.scssLint.failReporter('E'));
});

gulp.task('styles:main', () => {
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
    .pipe($.cssnano, {discardComments: {removeAll: true}})
    .pipe($.rename, {suffix: '.min'})
    .pipe($.header, banner)
    .pipe(gulp.dest, envPath + '/' + configs.paths.assets.css);

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    configs.paths.src + '/sass/**/*.scss'
  ])
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.sourcemaps.init())
    .pipe($.sass({precision: 10}).on('error', $.sass.logError))
    .pipe(isProduction ? $.mergeMediaQueries({log: true}) : $.util.noop())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(isProduction ? $.util.noop() : $.sourcemaps.write('./'))
    .pipe($.header(banner))
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.css))
    .pipe(isProduction ? stylesMinChannel() : $.util.noop())
    .pipe($.size({title: 'Css'}));
});

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

// Compile Babel
gulp.task('scripts:babel', () => {
  var babelFiles = [];
  if (configs.jsFiles.length) {
    babelFiles = configs.jsFiles.map(path => {
      return configs.paths.src + '/js/' + path;
    });
  }
  return gulp.src(babelFiles, {base: 'src/js'})
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.newer('.tmp/babel'))
    .pipe($.babel())
    .pipe($.size({title: 'Babel'}))
    .pipe(gulp.dest('.tmp/babel'));
});

// Lint JavaScript
gulp.task('scripts:lint', cb => {
  if (!configs.lint.scripts) {
    return cb();
  }
  return gulp.src(configs.paths.src + '/js/**/*.js')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(browserSync.active ? $.util.noop() : $.eslint.failOnError());
});

gulp.task('scripts:sync', ['scripts:babel', 'scripts:lint'], () => {
  gulp.src('.tmp/babel/**/*')
    .pipe($.foreach((stream, file) => {
      if (!fs.existsSync(configs.paths.src + '/js/' + file.relative)) {
        del('.tmp/babel/' + file.relative);
        $.util.log($.util.colors.red('[scripts:sync] >> ' + file.relative + ' deleted from tmp!'));
      }
      return stream;
    }));
});

gulp.task('scripts:main', ['scripts:sync'], () => {
  var jsFiles = [];
  if (configs.jsFiles.length) {
    jsFiles = configs.jsFiles.map(path => {
      return '.tmp/babel/' + path;
    });
  }
  return gulp.src(jsFiles)
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.sourcemaps.init())
    .pipe($.concat('main.js'))
    .pipe($.size({title: 'Js'}))
    .pipe(isProduction ? $.util.noop() : $.sourcemaps.write('./'))
    .pipe($.header(banner))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(isProduction ? $.util.noop() : gulp.dest(envPath + '/' + configs.paths.assets.js));
});

gulp.task('scripts:libs', () => {
  var libFiles = [];
  if (configs.libFiles.length) {
    libFiles = configs.libFiles.map(path => {
      return configs.paths.src + '/libs/' + path;
    });
  }
  return gulp.src(libFiles)
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.sourcemaps.init())
    .pipe($.concat('libs.js'))
    .pipe($.size({title: 'Libraries'}))
    .pipe(isProduction ? $.util.noop() : $.sourcemaps.write('./'))
    .pipe($.header(banner))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(isProduction ? $.util.noop() : gulp.dest(envPath + '/' + configs.paths.assets.js));
});

gulp.task('scripts:combine', cb => {
  if (!isProduction) {
    return cb();
  }
  return gulp.src([
    '.tmp/js/libs.js',
    '.tmp/js/main.js'
  ])
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.concat('app.min.js'))
    .pipe($.uglify())
    .pipe($.size({title: 'App Js'}))
    .pipe($.header(banner))
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.js));
});

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
gulp.task('images:optimize', () => {
  return gulp.src(configs.paths.src + '/img/**/*')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
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
    .pipe(gulp.dest('.tmp/img'));
});

gulp.task('images:sync', () => {
  gulp.src('.tmp/img/**/*')
    .pipe($.foreach((stream, file) => {
      if (!fs.existsSync(configs.paths.src + '/img/' + file.relative)) {
        del('.tmp/img/' + file.relative);
        $.util.log($.util.colors.red('[images:sync] >> ' + file.relative + ' deleted from tmp!'));
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

/**
 * HTML
 * Html(Twig) derleme işlemleri
 */

gulp.task('html', () => {
  /**
   * 'production' değişkeni çalışma ortamının production olup olmadığı
   * bilgisini depolar. Bu yüzden src/twig/data.json içerisinde production
   * adında bir değişken tanımlamayın!
   */
  twigController.data.production = isProduction;
  return gulp.src(configs.paths.src + '/twig/pages/**/*.twig')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.twig({
      data: twigController.data,
      functions: twigController.functions,
      filters: twigController.filters
    }))
    .pipe($.rename(path => {
      path.basename = path.basename.replace(/(\.html)$/, '');
      return path;
    }))
    .pipe(gulp.dest(envPath));
});

/**
 * COPY
 * Statik dosyaların kopyalanma işlemleri
 */

gulp.task('copy:fonts', () => {
  gulp.src(configs.paths.src + '/fonts/**/*')
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.fonts));
});

gulp.task('copy:vendors', () => {
  gulp.src(configs.paths.src + '/vendors/**/*')
    .pipe(gulp.dest(envPath + '/' + configs.paths.assets.vendors));
});

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

/**
 * DEPLOY
 * Build edilmiş assetslerin backend tarafından kullanılabilecek deploy klasörüne
 * kopyalanma işlemleri
 */

gulp.task('deploy:styles', () => {
  gulp.src(envPath + '/' + configs.paths.assets.css + '/**/*')
    .pipe(gulp.dest(configs.paths.deploy + '/' + configs.paths.assets.css));
});

gulp.task('deploy:scripts', () => {
  gulp.src(envPath + '/' + configs.paths.assets.js + '/**/*')
    .pipe(gulp.dest(configs.paths.deploy + '/' + configs.paths.assets.js));
});

gulp.task('deploy:images', () => {
  gulp.src(envPath + '/' + configs.paths.assets.img + '/**/*')
    .pipe(gulp.dest(configs.paths.deploy + '/' + configs.paths.assets.img));
});

gulp.task('deploy:vendors', () => {
  gulp.src(envPath + '/' + configs.paths.assets.vendors + '/**/*')
    .pipe(gulp.dest(configs.paths.deploy + '/' + configs.paths.assets.vendors));
});

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

gulp.task('notify:build', () => {
  return gulp.src('')
    .pipe($.notify('Build işlemi başarılı bir şekilde tamamlandı.'));
});

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
gulp.task('sync:build-fonts', () => {
  return gulp.src('')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.directorySync(
      configs.paths.src + '/fonts',
      envPath + '/' + configs.paths.assets.fonts,
      {printSummary: true}
    ));
});

// src deki resim klasörü ile dist'deki resim klasörünü eşitler.
gulp.task('sync:build-image', () => {
  return gulp.src('')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.directorySync(
      configs.paths.src + '/img',
      envPath + '/' + configs.paths.assets.img,
      {printSummary: true})
    );
});

// src deki vendors klasörü ile dist'deki vendors klasörünü eşitler.
gulp.task('sync:build-vendors', () => {
  return gulp.src('')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.directorySync(
      configs.paths.src + '/vendors',
      envPath + '/' + configs.paths.assets.vendors,
      {printSummary: true})
    );
});

// deploy pathdeki css klasörü ile dist'deki css klasörünü eşitler.
gulp.task('sync:deploy-styles', cb => {
  if (!deploy) {
    return cb();
  }
  return gulp.src('')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.directorySync(
      envPath + '/' + configs.paths.assets.css,
      configs.paths.deploy + '/' + configs.paths.assets.css,
      {printSummary: true}
    ));
});

// deploy pathdeki javascript klasörü ile dist'deki javascript klasörünü eşitler.
gulp.task('sync:deploy-scripts', cb => {
  if (!deploy) {
    return cb();
  }
  return gulp.src('')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.directorySync(
      envPath + '/' + configs.paths.assets.js,
      configs.paths.deploy + '/' + configs.paths.assets.js,
      {printSummary: true}
    ));
});

// deploy pathdeki image klasörü ile dist'deki image klasörünü eşitler.
gulp.task('sync:deploy-images', cb => {
  if (!deploy) {
    return cb();
  }
  return gulp.src('')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.directorySync(
      envPath + '/' + configs.paths.assets.img,
      configs.paths.deploy + '/' + configs.paths.assets.img,
      {printSummary: true}
    ));
});

// deploy pathdeki image klasörü ile dist'deki image klasörünü eşitler.
gulp.task('sync:deploy-vendors', cb => {
  if (!deploy) {
    return cb();
  }
  return gulp.src('')
    .pipe($.plumber({errorHandler: $.notify.onError('Hata: <%= error.message %>')}))
    .pipe($.directorySync(
      envPath + '/' + configs.paths.assets.vendors,
      configs.paths.deploy + '/' + configs.paths.assets.vendors,
      {printSummary: true}
    ));
});

/**
 * WATCH
 * Watch files for changes & reload
 */

gulp.task('serve', () => {
  browserSync(configs.browserSync);

  gulp.watch([configs.paths.src + '/twig/**/*.twig'], ['html', reload]);
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
  gulp.watch([configs.paths.src + '/img/**/*'], () => {
    runSequence('sync:build-image', 'sync:deploy-images', reload);
  });
});

/**
 * PAGE SPEED
 * Run PageSpeed Insights
 */

gulp.task('pagespeed', cb =>
  // Update the below URL to the public URL of your site
  pagespeed('example.com', {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb)
);
