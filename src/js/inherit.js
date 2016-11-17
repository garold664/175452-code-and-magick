'use strict';

define(function() {
  function inherit(child, parent) {
    function EmptyConstructor() {}
    EmptyConstructor.prototype = parent.prototype;

    child.prototype = new EmptyConstructor();
  }

  return inherit;
});

