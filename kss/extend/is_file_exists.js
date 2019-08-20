/* eslint-disable func-names */
import fs from 'fs';

module.exports = function(Twig) {
  Twig.extendFunction('is_file_exists', function(filePath) {
    return fs.existsSync(Twig.path.parsePath(this, filePath));
  });
};
/* eslint-enable */
