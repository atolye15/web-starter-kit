/* eslint-disable func-names */
module.exports = function(Twig) {
  Twig.extendFunction('html_attributes', obj =>
    Object.keys(obj)
      .filter(k => k !== '_keys') // remove "_keys" property which added by Twig
      .reduce((acc, cur) => {
        if (typeof obj[cur] === 'boolean') {
          return obj[cur] ? `${acc} ${cur}` : `${acc}`;
        }
        return `${acc} ${cur}="${obj[cur]}"`;
      }, '')
      .trim(),
  );
};
/* eslint-enable */
