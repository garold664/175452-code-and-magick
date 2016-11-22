'use strict';

define(['./inherit', './base-component'], function(inherit, BaseComponent) {

  inherit(Gallery, BaseComponent);

  function Gallery(pictures) {
    this.pictures = pictures;
    this.overlay = document.querySelector('.overlay-gallery');
    this.preview = this.overlay.querySelector('.overlay-gallery-preview');

    this.buttonPrevious = this.overlay.querySelector('.overlay-gallery-control-left');
    this.buttonNext = this.overlay.querySelector('.overlay-gallery-control-right');
    this.currentPictureNumber = this.overlay.querySelector('.preview-number-current');
    this.picturesQuantity = this.overlay.querySelector('.preview-number-total');
    this.buttonClose = this.overlay.querySelector('.overlay-gallery-close');

    this.photoContainer = document.querySelector('.photogallery');
    this.lastParent = this.photoContainer.querySelector('a:last-of-type');
    this.firstParent = this.photoContainer.querySelector('a:first-of-type');

    this.onHashChange = this.onHashChange.bind(this);

    window.addEventListener('hashchange', this.onHashChange);
    window.addEventListener('load', this.onHashChange);
  }

  Gallery.prototype.onHashChange = function() {
    var hash = String.prototype.match.call(location.hash, /#photo\/(\S+)/);
    if (hash !== null) {
      this.render(hash[1]);
    } else {
      this.remove();
    }
  };

  Gallery.prototype.setActivePicture = function(currentPicture) {
    var img = new Image();
    var index;
    if (typeof currentPicture === 'string') {
      img.src = currentPicture;

      var pic = document.querySelector('img[src="' + currentPicture + '"]');
      var currentElement = pic.parentNode;
      var elements = document.querySelectorAll('.photogallery-image');
      elements = Array.prototype.slice.call(elements);
      index = elements.indexOf(currentElement);
      if (index === -1) {
        return;
      }
      ++index;

    } else {
      img.src = this.pictures[currentPicture - 1];
      index = currentPicture;
    }

    this.activePicture = currentPicture;
    this.preview.removeChild(this.preview.lastChild);
    this.preview.appendChild(img);
    this.currentPictureNumber.innerText = index;
  };

  Gallery.prototype.showPrevious = function() {
    if (typeof this.activePicture !== 'number') {
      var currentPic = document.querySelector('img[src="' + this.activePicture + '"]');
      var parent = currentPic.parentNode;
      var prevParent = parent.previousElementSibling;

      prevParent = ((prevParent) && (prevParent.tagName === 'A')) ? prevParent : this.lastParent;
      var prevPic = prevParent.firstElementChild;

      location.hash = 'photo/' + prevPic.src.substr(location.origin.length + 1);
    } else {
      var index = (this.activePicture > 1) ? this.activePicture - 1 : this.pictures.length;
      this.setActivePicture(index);
    }
  };

  Gallery.prototype.showNext = function() {
    if (typeof this.activePicture !== 'number') {
      var currentPic = document.querySelector('img[src="' + this.activePicture + '"]');
      var parent = currentPic.parentNode;
      var nextParent = parent.nextElementSibling;

      nextParent = ((nextParent) && (nextParent.tagName === 'A')) ? nextParent : this.firstParent;
      var nextPic = nextParent.firstElementChild;

      location.hash = 'photo/' + nextPic.src.substr(location.origin.length + 1);
    } else {
      var index = (this.activePicture < this.pictures.length) ? this.activePicture + 1 : 1;
      this.setActivePicture(index);
    }
  };
  Gallery.prototype.render = function(currentNumber) {
    this.show(this.overlay);
    this.picturesQuantity.innerText = this.pictures.length;

    this.remove = this.remove.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
    this.showNext = this.showNext.bind(this);

    this.buttonClose.addEventListener('click', this.remove);
    this.buttonPrevious.addEventListener('click', this.showPrevious);
    this.buttonNext.addEventListener('click', this.showNext);

    this.setActivePicture(currentNumber);
  };

  Gallery.prototype.remove = function() {
    this.hide(this.overlay);

    this.buttonClose.removeEventListener('click', this.remove);
    this.buttonPrevious.removeEventListener('click', this.showPrevious);
    this.buttonNext.removeEventListener('click', this.showNext);

    location.hash = '';
  };

  return Gallery;
});
