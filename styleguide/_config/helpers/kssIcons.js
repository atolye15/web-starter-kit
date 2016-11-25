
module.exports.register = function(Handlebars) {
  'use strict';

  Handlebars.registerHelper('kssIcons', function(doc, block) {
    var accum = '';
    var iconNames = doc.replace(/\n/g, '').split(',');

    iconNames.forEach(item => {
      this.icon = {
        name: item.trim()
      };
      accum += block.fn(this);
    });

    return accum;
  });
};
