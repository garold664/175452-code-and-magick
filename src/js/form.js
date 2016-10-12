'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var reviewForm = document.querySelector('.review-form');
  var reviewSubmit = document.querySelector('.review-submit');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewGroupMark = document.querySelector('.review-form-group-mark');
  var reviewFields = document.querySelector('.review-fields');
  var reviewName = document.querySelector('#review-name');
  var reviewLabelName = document.querySelector('.review-fields-name');
  var reviewText = document.querySelector('#review-text');
  var reviewLabelText = document.querySelector('.review-fields-text');
  var reviewMark3 = document.querySelector('#review-mark-3');
  var reviewMark4 = document.querySelector('#review-mark-4');
  var reviewMark5 = document.querySelector('#review-mark-5');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  reviewSubmit.disabled = true;
  reviewForm.onchange = function() {
    if (this.checkValidity()) {
      reviewFields.style.display = 'none';
      reviewSubmit.disabled = false;
    } else {
      reviewFields.style.display = 'inline-block';
      reviewSubmit.disabled = true;
    }
  };

  reviewName.onchange = function() {
    if (this.validity.valid) {
      reviewLabelName.style.display = 'none';
    } else {
      reviewLabelName.style.display = 'inline-block';
    }
  };

  reviewLabelText.style.display = 'none';
  reviewText.onchange = function() {
    if (this.validity.valid) {
      reviewLabelText.style.display = 'none';
    } else {
      reviewLabelText.style.display = 'inline-block';
    }
  };

  reviewGroupMark.onchange = function() {
    if (!(reviewMark3.checked) && !(reviewMark4.checked) && !(reviewMark5.checked)) {
      reviewText.required = true;
      reviewFields.style.display = 'inline-block';
      reviewLabelText.style.display = 'inline-block';
    } else {
      reviewText.required = false;
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
