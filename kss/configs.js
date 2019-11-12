export const paths = {
  dist: 'styleguide',
  assets: {
    scripts: 'assets/js',
    styles: 'assets/css',
    images: 'assets/img',
    fonts: 'assets/css/fonts',
  },
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
