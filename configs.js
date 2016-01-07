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
      js     : 'js',
      css    : 'css',
      img    : 'img',
      fonts  : 'css/fonts',
      libs   : 'js/libs'
    }
  },
  proxyUrl: 'localhost/web-starter-kit/'
  jsFiles: ['main1.js', 'deneme.js'],
  vendorFiles: ['dene.js']
}

module.exports = configs