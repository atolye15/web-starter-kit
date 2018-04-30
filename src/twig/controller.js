/* eslint-disable func-names, import/no-extraneous-dependencies */
import cx from 'classnames';

/**
 * Twig Controller
 * Front-end tarafında Twig dosyalarının HTML e render edilmesi
 * sırasında kullanılacak değişkenler ve fonksiyonlar
 *
 * @type {Object}
 */

const twigController = {
  data: {
    locale: 'tr',
    title: 'Hello, Boys!',
  },
  functions: [
    {
      name: 'classNames',
      func: (...args) => cx(...args),
    },
    {
      name: 'asset',
      func: args => args,
    },
  ],
  filters: [],
};

module.exports = twigController;
