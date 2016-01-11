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
  lint: {
    scripts : true
  },
  paths: {
    src: 'src',
    dev: 'dev',
    dist: 'dist',
    assets: {
      js      : 'js',
      css     : 'css',
      img     : 'img',
      fonts   : 'css/fonts',
      vendors : 'js/libs'
    }
  },
  browserSync: {
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'WSK',
    // Proxy an EXISTING vhost. Browsersync will wrap your vhost with a proxy URL to view your site
    proxy: 'localhost/web-starter-kit/',
    // Disable open automatically when Browsersync starts.
    open: false,
    // Allow scroll syncing across breakpoints
    // scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    // server: [configs.paths.dev],
    port: 3000
  },
  jsFiles: ['main1.js', 'deneme.js'],
  libFiles: ['dene.js']
}

module.exports = configs
