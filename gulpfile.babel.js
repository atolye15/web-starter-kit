/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Atolye15
 *
 */

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import util from 'gulp-util';
import kss from 'kss';
import del from 'del';

import configs from './configs';

import tasks from './gulp/tasks';

const { reload } = browserSync;

const isProduction = util.env.prod;
const isDeploy = util.env.deploy;

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

runSequence.options.ignoreUndefinedTasks = true;

/**
 * STYLES
 * Sass dosyalarını derleme ve prefix ekleme
 */

gulp.task('styles:main', tasks.styles.main({ isProduction }));

gulp.task('styles', ['styles:main']);

/**
 * SCRIPTS
 * Javascript dosyalarının derleme işlemleri
 */

gulp.task('scripts:main', tasks.scripts.main({ isProduction }));
gulp.task('scripts:libs', tasks.scripts.libs({ isProduction }));
gulp.task('scripts:combine', tasks.scripts.combine({ isProduction }));

gulp.task('scripts', cb => runSequence('scripts:libs', 'scripts:main', 'scripts:combine', cb));

/**
 * IMAGES
 * Resim optimizasyon işlemleri
 */

// Optimize images
gulp.task('images:optimize', tasks.images.optimize());
gulp.task('images:sync', tasks.images.sync());
gulp.task('images:deploy', tasks.images.deploy({ isProduction }));
gulp.task('images:sprite', tasks.images.sprite({ isProduction }));

gulp.task('images', cb => runSequence('images:optimize', 'images:sync', 'images:deploy', cb));

/**
 * HTML
 * Html(Twig) derleme işlemleri
 */
gulp.task('html:main', tasks.html({ isProduction }));
gulp.task('html', cb => runSequence('clean:sprite', 'images:sprite', 'html:main', cb));

/**
 * COPY
 * Statik dosyaların kopyalanma işlemleri
 */

gulp.task('copy:fonts', tasks.copy.fonts({ isProduction }));
gulp.task('copy:vendors', tasks.copy.vendors({ isProduction }));

/**
 * CLEAN
 * Klasör temizleme işlemleri
 */

// Clean output directory
gulp.task('clean:dist', () => del([`${envPath}/*`], { dot: true }));
gulp.task('clean:imgCache', () => del(['.tmp/img/*'], { dot: true }));
gulp.task('clean:tempJs', () => del(['.tmp/js/*'], { dot: true }));
gulp.task('clean:deployFolder', () =>
  del([`${configs.paths.deploy}/*`], { dot: true, force: true }),
);
gulp.task('clean:sprite', () => del(['.tmp/img/sprite.svg'], { dot: true }));

/**
 * DEPLOY
 * Build edilmiş assetslerin backend tarafından kullanılabilecek deploy klasörüne
 * kopyalanma işlemleri
 */

gulp.task('deploy:styles', tasks.deploy.styles({ isProduction }));
gulp.task('deploy:scripts', tasks.deploy.scripts({ isProduction }));
gulp.task('deploy:images', tasks.deploy.images({ isProduction }));
gulp.task('deploy:vendors', tasks.deploy.vendors({ isProduction }));

gulp.task('deploy', cb => {
  if (!isDeploy) {
    return cb();
  }
  return runSequence(
    ['clean:deployFolder'],
    ['deploy:styles', 'deploy:scripts', 'deploy:images', 'deploy:vendors'],
    cb,
  );
});

/**
 * NOTIFY
 * Notifikasyon işlemleri
 */

gulp.task('notify:build', tasks.notify('Build işlemi başarılı bir şekilde tamamlandı.'));

/**
 * BUILD
 * Build işlemleri bu task çağırılarak yapılır
 * Burada yapılan işlemlerin sırası önemlidir.
 */
gulp.task('build', cb =>
  runSequence(
    ['clean:dist', 'clean:tempJs'],
    ['html', 'scripts'],
    ['styles', 'images', 'copy:fonts', 'copy:vendors'],
    'deploy',
    'notify:build',
    () => {
      util.log(
        util.colors.green(
          '\n==============================================\n' +
            'Build işlemi başarılı bir şekilde tamamlandı.' +
            '\n==============================================',
        ),
      );
      return cb();
    },
  ),
);

/**
 * SYNC
 * Klasörlerin eşitlenme işlemleri
 * Bu taskklar sadece watch aktifken çalışır
 * Tüm dosyaların sürekli tekrardan kopyalanmaması için tanımlanmıştır.
 */

// src deki font klasörü ile dist'deki font klasörünü eşitler.
gulp.task(
  'sync:build-fonts',
  tasks.sync.regular({ isProduction }, 'fonts', configs.paths.assets.fonts),
);

// src deki resim klasörü ile dist'deki resim klasörünü eşitler.
gulp.task(
  'sync:build-image',
  tasks.sync.regular({ isProduction }, 'img', configs.paths.assets.img),
);

// src deki vendors klasörü ile dist'deki vendors klasörünü eşitler.
gulp.task(
  'sync:build-vendors',
  tasks.sync.regular({ isProduction }, 'vendors', configs.paths.assets.vendors),
);

// deploy pathdeki css klasörü ile dist'deki css klasörünü eşitler.
gulp.task('sync:deploy-styles', tasks.sync.deploy({ isProduction, isDeploy }, 'css'));

// deploy pathdeki javascript klasörü ile dist'deki javascript klasörünü eşitler.
gulp.task('sync:deploy-scripts', tasks.sync.deploy({ isProduction, isDeploy }, 'js'));

// deploy pathdeki image klasörü ile dist'deki image klasörünü eşitler.
gulp.task('sync:deploy-images', tasks.sync.deploy({ isProduction, isDeploy }, 'img'));

// deploy pathdeki image klasörü ile dist'deki image klasörünü eşitler.
gulp.task('sync:deploy-vendors', tasks.sync.deploy({ isProduction, isDeploy }, 'vendors'));

/**
 * WATCH
 * Watch files for changes & reload
 */

gulp.task('serve', () => {
  browserSync(configs.browserSync);

  gulp.watch([`${configs.paths.src}/{twig,scss}/**/*.twig`], { cwd: './' }, e => {
    if (path.extname(e.path) !== '.twig') {
      return;
    }
    runSequence(
      'html:main',
      isProduction && configs.uncss.active ? 'styles:main' : null,
      'styleguide',
      reload,
    );
  });
  gulp.watch([`${configs.paths.src}/img/{icons,icons/**}`], ['html'], reload);
  gulp.watch([`${configs.paths.src}/scss/**/*.scss`], { cwd: './' }, e => {
    if (path.extname(e.path) !== '.scss') {
      return;
    }
    runSequence('styles', 'sync:deploy-styles', 'styleguide', reload);
  });
  gulp.watch([`${configs.paths.src}/fonts/**/*`], () => {
    runSequence('sync:build-fonts', 'sync:deploy-styles', reload);
  });
  gulp.watch([`${configs.paths.src}/js/**/*.js`], { cwd: './' }, () => {
    runSequence('scripts:main', 'scripts:combine', 'sync:deploy-scripts', reload);
  });
  gulp.watch([`${configs.paths.src}/libs/**/*.js`], () => {
    runSequence('scripts:libs', 'scripts:combine', 'sync:deploy-scripts', reload);
  });
  gulp.watch([`${configs.paths.src}/vendors/**`], () => {
    runSequence('sync:build-vendors', 'sync:deploy-vendors', reload);
  });
  gulp.watch(
    [`${configs.paths.src}/img/**/*`, `!${configs.paths.src}/img/{icons,icons/**}`],
    () => {
      runSequence('sync:build-image', 'sync:deploy-images', reload);
    },
  );
  gulp.watch(['configs.js'], ['build', reload]);
});

/**
 * PAGE SPEED
 * Run PageSpeed Insights
 */

gulp.task('pagespeed', tasks.pagespeed());

/**
 * Generates KSS living styleguide
 */

gulp.task('styleguide', () => kss(configs.styleGuide));

gulp.task('bump', tasks.bump());
