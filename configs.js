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
  components: 'src/components',
  objects: 'src/objects',
  templates: 'src/templates',
};

export const uncssOptions = {
  // We used dist path here because of uncss only works in production
  html: [`${paths.dist}/*.html`],
  htmlroot: paths.dist,
  ignore: [new RegExp('^(.[a-z-_.]*)?.(is|has)-.*'), new RegExp('^(.?[a-z-_.[]+)?disabled.*')],
};

export default {
  info: {
    name: 'Project-Name',
    version: '0.1.0',
  },
  paths,
  namespaces,
  uncssActive: true,
  entry: {
    styles: [`${paths.src}/app.scss`],
    scripts: [`${paths.src}/index.js`],
    pages: `${paths.src}/templates/pages/**/*.html.twig`,
  },
};
