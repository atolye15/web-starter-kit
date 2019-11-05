import { namespaces } from '../configs';

const namespacesForKss = Object.keys(namespaces).reduce((accumulator, currentValue) => {
  accumulator.push(`${currentValue}:${namespaces[currentValue]}`);
  return accumulator;
}, []);

export default {
  source: ['src/'],
  destination: 'styleguide',
  custom: [],
  extend: 'kss/extend',
  // The css and js paths are URLs, like '/misc/jquery.js'.
  // The following paths are relative to the generated style guide.
  css: ['../dev/css/app.css'],
  js: [],
  verbose: false,
  builder: 'node_modules/@atolye15/kss-node-twig-builder',
  homepage: '../../readme.md',
  title: 'Atölye Style Guide',
  namespace: namespacesForKss,
};
