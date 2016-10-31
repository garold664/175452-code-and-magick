'use strict';


define(['./form', './game', './gallery.js', './reviews'], function(form, Game, Gallery) {
  var game = new Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    form.open(function() {
      game.setGameStatus(Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  form.onClose = function() {
    game.setDeactivated(false);
  };

  var pictureElements = document.querySelectorAll('.photogallery-image img');
  var pictures = retrieveSrcs(pictureElements);
  var gallery = new Gallery(pictures);
  var photogallery = document.querySelector('.photogallery');

  photogallery.addEventListener('click', initGallery);

  function initGallery(evt) {
    var target = evt.target;
    var currentElement;
    var elements;
    var i;
    if (target.nodeName.toLowerCase() !== 'img') {
      return;
    }
    currentElement = target.parentNode;
    elements = document.querySelectorAll('.photogallery-image');
    elements = Array.prototype.slice.call(elements);
    i = elements.indexOf(currentElement);
    if (i === -1) {
      return;
    }
    gallery.show(i + 1);
  }

  function retrieveSrcs(elements) {
    return Array.prototype.map.call(elements, function(element) {
      return element.src;
    });
  }
});

