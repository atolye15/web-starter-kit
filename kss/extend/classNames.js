/* eslint-disable func-names, import/no-extraneous-dependencies */
import cx from 'classnames';

module.exports = function(Twig) {
  Twig.extendFunction('classNames', (...args) => cx(...args));
};
