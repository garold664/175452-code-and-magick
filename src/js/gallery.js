'use strict';

define(function() {
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

  Gallery.prototype.setActivePicture = function(currentNumber) {
    this.activePicture = currentNumber;
    var img = new Image();
    img.src = this.pictures[currentNumber - 1];
    this.preview.removeChild(this.preview.lastChild);
    this.preview.appendChild(img);
    this.currentPictureNumber.innerText = currentNumber;

  };
  Gallery.prototype.show = function(currentNumber) {
    var self = this;

    this.overlay.classList.remove('invisible');
    this.picturesQuantity.innerText = this.pictures.length;
    this.buttonClose.onclick = function() {
      self.hide();
    };

    this.buttonPrevious.onclick = function() {
      if (self.activePicture > 1) {
        self.setActivePicture(self.activePicture - 1);
      } else {
        self.setActivePicture(self.pictures.length);
      }
    };

    this.buttonNext.onclick = function() {
      if (self.activePicture < self.pictures.length) {
        self.setActivePicture(self.activePicture + 1);
      } else {
        self.setActivePicture(1);
      }
    };

    this.setActivePicture(currentNumber);
  };

  Gallery.prototype.hide = function() {
    this.overlay.classList.add('invisible');

    this.buttonClose.onclick = null;
    this.buttonPrevious.onclick = null;
    this.buttonNext.onclick = null;
  };

  return Gallery;
});
