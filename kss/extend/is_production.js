/* eslint-disable func-names, import/no-extraneous-dependencies */
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

module.exports = function(Twig) {
  Twig.extendFunction('is_production', function() {
    return argv.prod;
  });
};
/* eslint-enable */
