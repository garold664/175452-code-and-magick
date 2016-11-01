'use strict';

define(['./review', './load'], function(Review, load) {
  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;
  var templateReviewElement = templateContainer.firstElementChild;
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');


  hideElement(reviewsFilter);
  load(REVIEWS_LOAD_URL, showReviews);

  function showReviews(data) {
    renderReviews(data);
    showElement(reviewsFilter);
  }

  function renderReviews(reviews) {
    reviews.forEach(function(review) {
      var reviewObj = new Review(review, templateReviewElement);
      var reviewElement = reviewObj.element;
      reviewsList.appendChild(reviewElement);
    });
  }

  function showElement(element) {
    element.classList.remove('invisible');
  }

  function hideElement(element) {
    element.classList.add('invisible');
  }

});

