(function(root, factory) {

  if (typeof exports !== 'undefined') {

    // Node/CommonJS
    factory(root, exports, require('underscore'));
  }
  else if (typeof define === 'function' && define.amd) {

    // AMD
    define(['underscore', 'exports'], function(_, exports) {

      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global _.
      root._ = factory(root, exports, _);
    });
  }
  else {

    // Browser globals
    root._ = factory(root, {}, root._);
  }
}(this, function(root, _, _orig) {

  // kind of confusing, but since underscore is a dependency and what is being exported, we have to do this
  _ = _orig;

  var origTemplateFunc = _.template;

  var translateTag = /<%t([\s\S]+?)%>/g;

  // taken and modified from underscores microtemplating function
  _.mixin({

    template: function(text, data, settings) {

      var matcher = new RegExp(translateTag.source + '|$', 'g');

      text = text.replace(matcher, function(match, translate) {
        if (translate) {
          return match.replace('<%t', '<%= gettext(').replace('%>', ') %>');
        }
        else {
          return match;
        }
      });

      return origTemplateFunc(text, data, settings);
    }
  });

  return _;
}));
