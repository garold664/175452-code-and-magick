'use strict';

define(function() {
  function Gallery(pictures) {
    this.pictures = pictures;
    this.overlayGallery = document.querySelector('.overlay-gallery');
    this.overlayGalleryPreview = this.overlayGallery.querySelector('.overlay-gallery-preview');
    this.overlayGalleryControlLeft = this.overlayGallery.querySelector('.overlay-gallery-control-left');
    this.overlayGalleryControlRight = this.overlayGallery.querySelector('.overlay-gallery-control-right');
    this.previewNumberCurrent = this.overlayGallery.querySelector('.preview-number-current');
    this.previewNumberTotal = this.overlayGallery.querySelector('.preview-number-total');
    this.overlayGalleryClose = this.overlayGallery.querySelector('.overlay-gallery-close');
  }

  Gallery.prototype.setActivePicture = function(currentNumber) {
    this.activePicture = currentNumber;
    var img = new Image();
    img.src = this.pictures[currentNumber - 1];
    this.overlayGalleryPreview.removeChild(this.overlayGalleryPreview.lastChild);
    this.overlayGalleryPreview.appendChild(img);
    this.previewNumberCurrent.innerText = currentNumber;

  };
  Gallery.prototype.show = function(currentNumber) {
    var self = this;

    this.overlayGallery.classList.remove('invisible');
    this.previewNumberTotal.innerText = this.pictures.length;
    this.overlayGalleryClose.onclick = function() {
      self.hide();
    };

    this.overlayGalleryControlLeft.onclick = function() {
      if (self.activePicture > 1) {
        self.setActivePicture(self.activePicture - 1);
      } else {
        self.setActivePicture(self.pictures.length);
      }
    };

    this.overlayGalleryControlRight.onclick = function() {
      if (self.activePicture < self.pictures.length) {
        self.setActivePicture(self.activePicture + 1);
      } else {
        self.setActivePicture(1);
      }
    };

    this.setActivePicture(currentNumber);
  };

  Gallery.prototype.hide = function() {
    this.overlayGallery.classList.add('invisible');

    this.overlayGalleryClose.onclick = null;
    this.overlayGalleryControlLeft.onclick = null;
    this.overlayGalleryControlRight.onclick = null;
  };

  return Gallery;
});
