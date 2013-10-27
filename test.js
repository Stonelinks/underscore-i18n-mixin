var _ = require('underscore');
require('./underscore-i18n-mixin');

// dummy gettext
var gettext = function(a) {
  return a;
}

_.each(['hey', 'hi', 'ho'], function(a) {
  console.log(a);
});

console.log(_.template('hey! you <%t \'got\' %> <%= thing %>'))
