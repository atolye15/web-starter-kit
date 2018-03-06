const configs = {
  info: {
    name: 'Project-Name',
    version: '0.1.0',
  },
  paths: {
    src: 'src',
    dev: 'dev',
    dist: 'dist',
    deploy: '../web/assets',
    assets: {
      js: 'js',
      css: 'css',
      img: 'img',
      fonts: 'css/fonts',
      vendors: 'js/vendors',
    },
  },
  jsFiles: ['main.js'],
  libFiles: [],
  browserSync: {
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Proxy an EXISTING vhost. Browsersync will wrap your vhost with a proxy URL to view your site
    // proxy: 'localhost/web-starter-kit/',
    // Disable open automatically when Browsersync starts.
    open: false,
    // Allow scroll syncing across breakpoints
    // scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['./'],
    port: 3000,
  },
  styleGuide: {
    source: ['src/scss'],
    destination: 'styleguide/',
    custom: ['HideOriginal', 'Colors', 'Icons'],
    extend: 'kss/extend',
    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: ['../dev/css/main.css'],
    js: [],
    verbose: false,
    builder: 'kss/builders/atolye15',
    homepage: '../../readme.md',
    title: 'Atölye Style Guide',
  },
  pagespeed: {
    url: 'example.com',
    strategy: 'mobile', // mobile | desktop
  },
  uncss: {
    active: true,
    ignore: [new RegExp('^(.[a-z-_.]*)?.(is|has)-.*'), new RegExp('^(.?[a-z-_.[]+)?disabled.*')],
  },
};

module.exports = configs;
