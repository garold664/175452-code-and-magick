'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container'),
    reviewForm = document.querySelector('.review-form'),
    reviewSubmit = reviewForm.querySelector('.review-submit'),
    formCloseButton = reviewForm.querySelector('.review-form-close'),
    reviewFields = reviewForm.querySelector('.review-fields'),
    reviewName = reviewForm.querySelector('#review-name'),
    reviewLabelName = reviewForm.querySelector('.review-fields-name'),
    reviewText = reviewForm.querySelector('#review-text'),
    reviewLabelText = reviewForm.querySelector('.review-fields-text'),
    reviewMark3 = reviewForm.querySelector('#review-mark-3'),
    reviewMark4 = reviewForm.querySelector('#review-mark-4'),
    reviewMark5 = reviewForm.querySelector('#review-mark-5');

  reviewSubmit.disabled = true;
  reviewLabelText.style.display = 'none';

  formCloseButton.addEventListener('click', closeForm, false);
  reviewForm.addEventListener('change', validateForm, false);
  reviewForm.addEventListener('input', validateForm, false);
  reviewForm.addEventListener('submit', saveCookies, false);
  window.addEventListener('load', setFromCookies, false);

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


  function setFromCookies() {
    reviewName.value = window.Cookies.get('name') || '';

    if (window.Cookies.get('review-mark')) {
      document.getElementById(window.Cookies.get('review-mark')).checked = true;
    }
  }

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

  function saveCookies() {
    var today = new Date(),
      birthdayOfGH = new Date(),
      diff,
      name = reviewName.value,
      reviewMarkChecked = reviewForm.querySelector('[type=\'radio\']:checked').id;

    birthdayOfGH.setMonth(11);
    birthdayOfGH.setDate(9);

    if (today.getTime() < birthdayOfGH.getTime()) {
      birthdayOfGH.setFullYear(today.getFullYear() - 1);
    }
    diff = today.getTime() - birthdayOfGH.getTime();
    diff = Math.floor(diff / (1000 * 60 * 60 * 24));

    window.Cookies.set('name', name, { expires: diff });
    window.Cookies.set('review-mark', reviewMarkChecked, { expires: diff });
  }

  return form;
})();

