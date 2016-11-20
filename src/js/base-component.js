'use strict';

define(function() {

  function BaseComponent() {}

  BaseComponent.prototype.show = function(element) {
    element.classList.remove('invisible');
  };

  BaseComponent.prototype.hide = function(element) {
    element.classList.add('invisible');
  };

  BaseComponent.prototype.render = function() {

  };

  BaseComponent.prototype.remove = function() {

  };

  return BaseComponent;
});

