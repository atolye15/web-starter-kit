import cx from 'classnames';

import { isProduction } from '../config/env';

export default [
  {
    name: 'html_classes',
    func: (...args) =>
      cx(...args)
        // remove "_keys" which added by Twig
        .split(' ')
        .filter((k) => k !== '_keys')
        .join(' '),
  },
  {
    name: 'html_attributes',
    func: (obj) =>
      Object.keys(obj)
        .filter((k) => k !== '_keys') // remove "_keys" property which added by Twig
        .reduce((acc, cur) => {
          if (typeof obj[cur] === 'boolean') {
            return obj[cur] ? `${acc} ${cur}` : `${acc}`;
          }
          return `${acc} ${cur}="${obj[cur]}"`;
        }, '')
        .trim(),
  },
  {
    name: 'is_production',
    func: () => isProduction,
  },
];
