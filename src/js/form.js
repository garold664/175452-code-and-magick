'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var reviewForm = document.querySelector('.review-form');
  var reviewSubmit = reviewForm.querySelector('.review-submit');
  var formCloseButton = reviewForm.querySelector('.review-form-close');
  var reviewFields = reviewForm.querySelector('.review-fields');
  var reviewName = reviewForm.querySelector('#review-name');
  var reviewLabelName = reviewForm.querySelector('.review-fields-name');
  var reviewText = reviewForm.querySelector('#review-text');
  var reviewLabelText = reviewForm.querySelector('.review-fields-text');
  var reviewMark3 = reviewForm.querySelector('#review-mark-3');
  var reviewMark4 = reviewForm.querySelector('#review-mark-4');
  var reviewMark5 = reviewForm.querySelector('#review-mark-5');

  reviewSubmit.disabled = true;
  reviewLabelText.style.display = 'none';

  formCloseButton.addEventListener('click', closeForm, false);
  reviewForm.addEventListener('change', validateForm, false);


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

  function validateForm() {
    if (!(reviewMark3.checked || reviewMark4.checked || reviewMark5.checked)) {
      reviewText.required = true;
    } else {
      reviewText.required = false;
    }

    if (reviewForm.checkValidity()) {
      reviewFields.style.display = 'none';
      reviewSubmit.disabled = false;
    } else {
      reviewFields.style.display = 'inline-block';
      reviewSubmit.disabled = true;

      if (reviewName.validity.valid) {
        reviewLabelName.style.display = 'none';
      } else {
        reviewLabelName.style.display = 'inline-block';
      }

      if (reviewText.validity.valid) {
        reviewLabelText.style.display = 'none';
      } else {
        reviewLabelText.style.display = 'inline-block';
      }
    }
  }

  function closeForm(evt) {
    evt.preventDefault();
    form.close();
  }

  return form;
})();
