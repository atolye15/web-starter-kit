/* jshint node:true */

module.exports.register = function (Handlebars) {
  'use strict';

  function hexToRgb(hex){
    hex = (hex).replace(/#/, '');

    // convert short format to 6 char
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    return {
      r: parseInt(hex[0]+hex[1], 16),
      g: parseInt(hex[2]+hex[3], 16),
      b: parseInt(hex[4]+hex[5], 16)
    };
  }

  function rgbToHsl(rgb){
    var r = rgb.r/255;
    var g = rgb.g/255;
    var b = rgb.b/255;

    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);

    var h = 0;
    var s = 0;
    var l = (max + min) / 2;

    if (max !== min) {

      var d = (max-min);

      s = (l <= 0.5)? (d / (max+min)) : (d / (2-d));

      switch(max) {
        case r:
          h = ((g - b) / d)%6;
          break;
        case g:
          h = ((b - r) / d) + 2;
          break;
        case b:
          h = ((r - g) / d) + 4;
          break;
      }

      h *= 60;

    }

    s *= 100;
    l *= 100;

    return {
      h: h.toFixed(0) + '°',
      s: s.toFixed(1) + '%',
      l: l.toFixed(1) + '%'
    };
  }

  Handlebars.registerHelper('kssColors', function (doc, block) {
    var accum = '';
    var regex = /^(\S+)\s*:\s*(#[0-9A-Fa-f]{3,6})(?:\s*-\s*(.*))?$/gm;
    var test;

    while ((test = regex.exec(doc)) !== null) {
      this.color = {};
      this.color.name = test[1];
      this.color.hex = test[2];
      if (test[3] !== undefined) {
        this.color.description = test[3];
      }

      this.color.rgb = hexToRgb(this.color.hex);
      this.color.hsl = rgbToHsl(this.color.rgb);

      accum += block.fn(this);
    }

    return accum;
  });
};
