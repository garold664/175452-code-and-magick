'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var reviewForm = document.querySelector('.review-form');
  var reviewSubmit = reviewForm.querySelector('.review-submit');
  var formCloseButton = reviewForm.querySelector('.review-form-close');
  var reviewGroupMark = reviewForm.querySelector('.review-form-group-mark');
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

function validateForm(evt) {

  /*switch (evt.target.id) {
    case 'review-name' :
      if (reviewName.validity.valid) {
        reviewLabelName.style.display = 'none';
      } else {
        reviewLabelName.style.display = 'inline-block';
      }
      break;

    case 'review-text' :
      if (reviewText.validity.valid) {
        reviewLabelText.style.display = 'none';
      } else {
        reviewLabelText.style.display = 'inline-block';
      }
      break;

    case 'review-mark-1' :
    case 'review-mark-2' :
    case 'review-mark-3' :
    case 'review-mark-4' :
    case 'review-mark-5' :
      if (!(reviewMark3.checked || reviewMark4.checked || reviewMark5.checked)) {
        reviewText.required = true;
        reviewFields.style.display = 'inline-block';
        reviewLabelText.style.display = 'inline-block';
      } else {
        reviewText.required = false;
        reviewLabelText.style.display = 'none';
      }
      break;
  }*/

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

reviewForm.addEventListener('change', validateForm, false);

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
