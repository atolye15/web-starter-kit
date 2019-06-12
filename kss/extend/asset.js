/* eslint-disable func-names */

module.exports = function(Twig) {
  Twig.extendFunction('asset', file => `../dev/${file}`);
};
