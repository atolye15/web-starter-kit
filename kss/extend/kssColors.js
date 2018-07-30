/* eslint-disable */
module.exports = function(Twig) {
  'use strict';

  function hexToRgb(hex) {
    hex = hex.replace(/#/, '');

    // convert short format to 6 char
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    return {
      r: parseInt(hex[0] + hex[1], 16),
      g: parseInt(hex[2] + hex[3], 16),
      b: parseInt(hex[4] + hex[5], 16),
    };
  }

  function rgbToHsl(rgb) {
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;

    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);

    var h = 0;
    var s = 0;
    var l = (max + min) / 2;

    if (max !== min) {
      var d = max - min;

      s = l <= 0.5 ? d / (max + min) : d / (2 - d);

      switch (max) {
        case r:
          h = ((g - b) / d) % 6;
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h *= 60;
    }

    s *= 100;
    l *= 100;

    return {
      h: h.toFixed(0) + '°',
      s: s.toFixed(1) + '%',
      l: l.toFixed(1) + '%',
    };
  }

  Twig.extend(function(Twig) {
    // example of extending a tag type that would
    // restrict content to the specified "level"
    Twig.exports.extendTag({
      // unique name for tag type
      type: 'kssColors',
      // regex for matching tag
      regex: /^kssColors\s+(.+)$/,

      // what type of tags can follow this one.
      next: ['endkssColors'], // match the type of the end tag
      open: true,
      compile: function(token) {
        var expression = token.match[1];

        // turn the string expression into tokens.
        token.stack = Twig.expression.compile.apply(this, [
          {
            type: Twig.expression.type.expression,
            value: expression,
          },
        ]).stack;

        delete token.match; // cleanup
        return token;
      },
      parse: function(token, context, chain) {
        var doc = Twig.expression.parse.apply(this, [token.stack, context]);

        const output = doc.reduce((acc, curr) => {
          var innerContext = Twig.ChildContext(context);
          innerContext.color = {
            name: curr.name,
            hex: curr.color,
          };

          if (curr.description) {
            innerContext.color.description = curr.description;
          }

          innerContext.color.rgb = hexToRgb(innerContext.color.hex);
          innerContext.color.hsl = rgbToHsl(innerContext.color.rgb);

          acc.push(Twig.parse.apply(this, [token.output, innerContext]));

          Twig.merge(context, innerContext, true);

          return acc;
        }, []);

        return {
          chain: chain,
          output: Twig.output.apply(this, [output]),
        };
      },
    });

    // a matching end tag type
    Twig.exports.extendTag({
      type: 'endkssColors',
      regex: /^endkssColors$/,
      next: [],
      open: false,
    });
  });
};
