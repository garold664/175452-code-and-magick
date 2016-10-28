'use strict';

define(function() {
  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;
  var templateReviewElement = templateContainer.firstElementChild;
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');

  hideElement(reviewsFilter);
  handleJSONPResponse(REVIEWS_LOAD_URL, showReviews);


  function handleJSONPResponse(url, callback, callbackName) {
    if (!callbackName) {
      callbackName = 'cb' + Date.now();
    }

    window[callbackName] = function(data) {
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);
  }

  function showReviews(data) {
    renderReviews(data);
    showElement(reviewsFilter);
  }

  function renderReviews(reviews) {
    reviews.forEach(function(review) {
      var reviewElement = compileReview(review);
      reviewsList.appendChild(reviewElement);
    });
  }

  function compileReview(review) {
    var IMAGE_SIZE = 124;
    var reviewElement = templateReviewElement.cloneNode(true);
    var reviewAuthor = reviewElement.querySelector('.review-author');
    var reviewRating = reviewElement.querySelector('.review-rating');
    var reviewText = reviewElement.querySelector('.review-text');
    var image = new Image();

    image.onload = function() {
      reviewAuthor.width = IMAGE_SIZE;
      reviewAuthor.height = IMAGE_SIZE;
      reviewAuthor.src = image.src;
    };

    image.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    image.src = review.author.picture;
    reviewAuthor.title = review.author.name;
    reviewRating.textContent = review.rating;
    reviewText.textContent = review.description;

    return reviewElement;
  }

  function showElement(element) {
    element.classList.remove('invisible');
  }

  function hideElement(element) {
    element.classList.add('invisible');
  }
});

