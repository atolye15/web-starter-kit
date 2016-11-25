const configs = {
  info: {
    name: 'Project-Name',
    version: '1.0.0',
    description: 'Project Desc',
    author: {
      name: 'Atolye15',
      email: 'hello@atolye15.com',
      url: 'http://www.atolye15.com'
    }
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
      vendors: 'js/vendors'
    }
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
    port: 3000
  },
  styleGuide: {
    source: [
      'src/sass'
    ],
    destination: 'styleguide/',
    custom: [
      'HideOriginal',
      'Colors',
      'Icons'
    ],
    helpers: 'styleguide/_config/helpers',
    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
      '../.tmp/css/main.css'
    ],
    js: [],
    homepage: 'styleguide.md',
    template: 'styleguide/_config/templates/kss-node-template'
  },
  pagespeed: {
    url: 'example.com',
    strategy: 'mobile' // mobile | desktop
  },
  uncss: {
    active: true,
    ignore: [
      // new RegExp('^(.[a-z-_.]*)?.(is|has)-.*')
    ]
  },
  autoprefixerBrowsers: [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 33',
    'chrome >= 36',
    'safari >= 7',
    'opera >= 26',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ]
};

module.exports = configs;
