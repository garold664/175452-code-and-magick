'use strict';

define(function() {
  function inherit(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  }

  return inherit;
});

