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
  var pictures = Array.prototype.map.call(pictureElements, function(element) {
    return element.src;
  });

  var gallery = new Gallery(pictures);

  var photogallery = document.querySelector('.photogallery');

  photogallery.addEventListener('click', function(evt) {
    var currentElement = evt.target.parentNode;

    console.log(currentElement);
    var elements = document.querySelectorAll('.photogallery-image');

    for (var i = 0; i < elements.length; i++) {
      if (elements[i] === currentElement) {
        gallery.show(i + 1);
        break;
      }
    }
  });
});

