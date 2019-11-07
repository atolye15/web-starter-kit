export const paths = {
  dist: 'styleguide',
  assets: {
    scripts: 'assets/js',
    styles: 'assets/css',
    images: 'assets/img',
    fonts: 'assets/css/fonts',
  },
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
  port: 3003,
  ghostMode: false,
};

export default {
  source: ['src/'],
  destination: `${paths.dist}`,
  custom: [],
  extend: 'kss/extend',
  // The css and js paths are URLs, like '/misc/jquery.js'.
  // The following paths are relative to the generated style guide.
  css: [`${paths.assets.styles}/app.css`],
  js: [`${paths.assets.scripts}/app.js`],
  verbose: false,
  builder: 'node_modules/@atolye15/kss-node-twig-builder',
  homepage: '../../README.md',
  title: 'Atölye Style Guide',
  namespace: [],
};
