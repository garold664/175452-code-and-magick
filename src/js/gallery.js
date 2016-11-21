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
  }

  Gallery.prototype.onHashChange = function() {
    var hash = String.prototype.match.call(location.hash, /#photo\/(\S+)/);
    if (hash !== null) {
      console.log(hash[1]);
      console.log(location.origin.length);
      this.render(hash[1]);
    } else {
      this.remove();
    }
  };

  Gallery.prototype.setActivePicture = function(currentNumber) {
    this.activePicture = currentNumber;

    var img = new Image();
    img.src = this.pictures[currentNumber - 1];

    this.preview.removeChild(this.preview.lastChild);
    this.preview.appendChild(img);
    this.currentPictureNumber.innerText = currentNumber;
  };

  Gallery.prototype.showPrevious = function() {
    var index = (this.activePicture > 1) ? this.activePicture - 1 : this.pictures.length;
    this.setActivePicture(index);
  };

  Gallery.prototype.showNext = function() {
    var index = (this.activePicture < this.pictures.length) ? this.activePicture + 1 : 1;
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
  };

  return Gallery;
});
