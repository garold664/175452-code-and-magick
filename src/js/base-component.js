'use strict';

define(function() {

  function BaseComponent(element) {
    this.element = element;
  }

  BaseComponent.prototype.addHandler = function(element, event, handler) {
    console.log(this);
    console.log(element);
    handler = handler.bind(this);
    element.addEventListener(event, handler);
  };

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

