#underscore-i18n-mixin
=====================

###What is this?
A small snippet that overrides `_.template()` to support calls to a `gettext()` function.

###Why?
I made it so that it would be easy to use django's [javascript translation catalog](https://docs.djangoproject.com/en/1.4/topics/i18n/translation/#internationalization-in-javascript-code) from inside an underscore microtemplate. It is probably useful elsewhere as well.

###How do I use it?
Put strings you want translated inside a tag that `<%t 'looks like this' %>`.

###How does it work?
It is really simple. It essentially transforms your tags `<%= gettext('into this') %>` and then passes it into the original `_.template()` function. 