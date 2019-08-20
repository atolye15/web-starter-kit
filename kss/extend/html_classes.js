/* eslint-disable func-names, import/no-extraneous-dependencies */
import cx from 'classnames';

module.exports = function(Twig) {
  Twig.extendFunction('html_classes', (...args) => cx(...args));
};
/* eslint-enable */
