'use strict';


define(['./form', './game', './gallery', './reviews'], function(form, Game, Gallery, Reviews) {
  var reviews = new Reviews();
  reviews.init();

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
    if (location.hash !== 'undefined') {
      if (target.nodeName !== 'IMG') {
        return;
      }

      var src = (target.src.substr(location.origin.length + 1));
      location.hash = 'photo/' + src;
    } else {
      var currentElement = target.parentNode;
      var elements = document.querySelectorAll('.photogallery-image');
      elements = Array.prototype.slice.call(elements);
      var index = elements.indexOf(currentElement);
      if (index === -1) {
        return;
      }
      gallery.render(index + 1);
    }
  }

  function retrieveSrcs(elements) {
    return Array.prototype.map.call(elements, function(element) {
      return element.src;
    });
  }
});

