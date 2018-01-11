/* eslint-disable func-names */
import fs from 'fs';

module.exports = function(Twig) {
  Twig.extendFunction('isFileExists', function(filePath) {
    return fs.existsSync(Twig.path.parsePath(this, filePath));
  });
};
