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

  Gallery.prototype.setHash = function(imgIndex) {
    var src = this.pictures[imgIndex - 1].substr(location.origin.length + 1);
    location.hash = 'photo/' + src;
  };

  Gallery.prototype.onHashChange = function() {
    var hash = String.prototype.match.call(location.hash, /#photo\/(\S+)/);

    if (hash !== null) {
      var src = location.origin + '/' + hash[1];
      var index = this.pictures.indexOf(src) + 1;
      this.render(index);

      return;
    }

    this.remove();
  };

  Gallery.prototype.setActivePicture = function(currentPicture) {
    var img = new Image();

    img.src = this.pictures[currentPicture - 1];

    this.activePicture = currentPicture;
    this.preview.removeChild(this.preview.lastChild);
    this.preview.appendChild(img);
    this.currentPictureNumber.innerText = currentPicture;
  };

  Gallery.prototype.showPrevious = function() {
    var index = (this.activePicture > 1) ? this.activePicture - 1 : this.pictures.length;
    if (location.hash !== 'undefined') {
      this.setHash(index);
      return;
    }
    this.setActivePicture(index);
  };

  Gallery.prototype.showNext = function() {
    var index = (this.activePicture < this.pictures.length) ? this.activePicture + 1 : 1;

    if (location.hash !== 'undefined') {
      this.setHash(index);
      return;
    }
    this.setActivePicture(index);
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
