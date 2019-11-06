const paths = {
  src: 'src',
  dev: 'dev',
  dist: 'dist',
  assets: {
    js: 'js',
    css: 'css',
    img: 'img',
    fonts: 'css/fonts',
  },
};

export const namespaces = {
  components: 'src/scss/components',
  objects: 'src/scss/objects',
  partials: 'src/twig/partials',
};

export const browserSyncOptions = {
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
  server: [`${paths.dist}`],
  port: 3000,
  ghostMode: false,
};

export default {
  info: {
    name: 'Project-Name',
    version: '0.1.0',
  },
  paths,
  namespaces,
  entry: {
    styles: [`${paths.src}/app.scss`],
    scripts: [`${paths.src}/index.js`],
    pages: `${paths.src}/templates/pages/**/*.html.twig`,
  },
  uncss: {
    active: true,
    ignore: [new RegExp('^(.[a-z-_.]*)?.(is|has)-.*'), new RegExp('^(.?[a-z-_.[]+)?disabled.*')],
  },
};
