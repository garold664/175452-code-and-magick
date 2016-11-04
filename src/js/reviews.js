'use strict';

define(['./review', './load'], function(Review, load) {
  var REVIEWS_LOAD_URL = '/api/reviews';
  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;
  var templateReviewElement = templateContainer.firstElementChild;
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var filterID;
  var moreReviewsBtn = document.querySelector('.reviews-controls-more');
  var pageNumber = 0;
  var pageSize = 3;

  hideElement(reviewsFilter);
  loadPage('reviews-all', pageNumber);

  showElement(moreReviewsBtn);
  moreReviewsBtn.addEventListener('click', showMoreReviews);

  reviewsFilter.addEventListener('change', applyFilter, true);


  function applyFilter(evt) {
    var target = evt.target;
    if (target.type === 'radio') {
      reviewsList.innerHTML = '';
      pageNumber = 0;
      filterID = target.id;
      loadPage(filterID, pageNumber);
      showElement(moreReviewsBtn);
    }
  }

  function showMoreReviews() {
    loadPage(filterID, ++pageNumber);
  }

  function loadPage(filter, currentPageNumber) {
    var fromItem = currentPageNumber * pageSize;
    var toItem = fromItem + pageSize;

    load(REVIEWS_LOAD_URL, {
      from: fromItem,
      to: toItem,
      filter: filter
    }, showReviews);
  }

  function showReviews(data) {
    renderReviews(data);
    showElement(reviewsFilter);
  }

  function renderReviews(reviews) {
    if (reviews.length < pageSize) {
      hideElement(moreReviewsBtn);
    }

    reviews.forEach(function(item) {
      var review = new Review(item, templateReviewElement.cloneNode(true));
      reviewsList.appendChild(review.element);
    });

  }

  function showElement(element) {
    element.classList.remove('invisible');
  }

  function hideElement(element) {
    element.classList.add('invisible');
  }

});

