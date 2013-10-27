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
  
  // A lot of this was ripped out of underscore

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  var templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    translate: /<%t([\s\S]+?)%>/g
  },

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  noMatch = /(.)^/,

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  },

  escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // taken and modified from underscores microtemplating function
  _.mixin({
    
    template: function(text, data, settings) {
      
      var render;
      var settings = _.defaults({}, settings, _.templateSettings);

      // Combine delimiters into one regular expression via alternation.
      var matcher = new RegExp([
        (templateSettings.translate || noMatch).source,
        (templateSettings.interpolate || noMatch).source,
        (templateSettings.evaluate || noMatch).source
      ].join('|') + '|$', 'g');

      // Compile the template source, escaping string literals appropriately.
      var index = 0;
      var source = "__p+='";
      text.replace(matcher, function(match, translate, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escaper, function(match) {
          return '\\' + escapes[match];
        });

        if (interpolate) {
          source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        }
        if (translate) {
          source += "'+\ngettext(" + translate.trim() + ")+\n'";
        }
        if (evaluate) {
          source += "';\n" + evaluate + "\n__p+='";
        }
        index = offset + match.length;
        return match;
      });
      source += "';\n";
    
      // If a variable is not specified, place data values in local scope.
      if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

      source = "var __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
        source + "return __p;\n";

      try {
        render = new Function(settings.variable || 'obj', '_', source);
      } catch (e) {
        e.source = source;
        throw e;
      }

      if (data) return render(data, _);
      var template = function(data) {
        return render.call(this, data, _);
      };

      // Provide the compiled function source as a convenience for precompilation.
      template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

      return template;      
    }
  });

  return _;
}));
