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
  reviewForm.addEventListener('input', validateForm, false);
  reviewForm.addEventListener('submit', setCookiesFromForm, false);
  window.addEventListener('load', fillFormFromCookies, false);

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


  function fillFormFromCookies() {
    var reviewMarkFromCookies = window.Cookies.get('review-mark');
    var reviewNameFromCookies = window.Cookies.get('review-name');
    var reviewMarkToCheck;

    reviewName.value = reviewNameFromCookies || '';

    if (reviewMarkFromCookies) {
      reviewMarkToCheck = document.getElementById(reviewMarkFromCookies);
      reviewMarkToCheck.checked = true;
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

  function setCookiesFromForm() {
    var today = new Date();
    var birthdayOfGraceHopper = new Date();
    var diff;
    var name = reviewName.value;
    var reviewMarkChecked = reviewForm.elements['review-mark'].value;
    var millisecondsInDay = (1000 * 60 * 60 * 24);

    console.log(reviewMarkChecked);

    birthdayOfGraceHopper.setMonth(11);
    birthdayOfGraceHopper.setDate(9);

    if (today.getTime() < birthdayOfGraceHopper.getTime()) {
      birthdayOfGraceHopper.setFullYear(today.getFullYear() - 1);
    }
    diff = today.getTime() - birthdayOfGraceHopper.getTime();
    diff = Math.floor(diff / millisecondsInDay);

    console.log(diff);
    window.Cookies.set('review-name', name, { expires: diff });
    window.Cookies.set('review-mark', reviewMarkChecked, { expires: diff });
  }

  return form;
})();

