/* eslint-disable camelcase, import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import cx from 'classnames';

import { isProduction } from '../gulp/utils/parseArguments';
import configs from '../configs';

const envPath = isProduction ? configs.paths.dist : configs.paths.dev;

function html_classes(...args) {
  return cx(...args);
}

function html_attributes(obj) {
  return Object.keys(obj)
    .filter(k => k !== '_keys') // remove "_keys" property which added by Twig
    .reduce((acc, cur) => {
      if (typeof obj[cur] === 'boolean') {
        return obj[cur] ? `${acc} ${cur}` : `${acc}`;
      }
      return `${acc} ${cur}="${obj[cur]}"`;
    }, '')
    .trim();
}

function asset(file) {
  return path.resolve(__dirname, `/${envPath}/`, file);
}

function is_file_exists(filePath) {
  return fs.existsSync(path.resolve(__dirname, path.dirname(this.path), filePath));
}

function is_production() {
  return isProduction;
}

export default { html_classes, html_attributes, asset, is_file_exists, is_production };
/* eslint-enable */
