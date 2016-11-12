'use strict';

define(['./review', './load'], function(Review, load) {
  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;
  var templateReviewElement = templateContainer.firstElementChild;
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var moreReviewsBtn = document.querySelector('.reviews-controls-more');

  var pageNumber = -1;
  var pageSize = 3;
  var instancesOfReview = [];
  var filterID = 'reviews-all';

  filterID = localStorage.getItem('filterID') || filterID;

  hide(reviewsFilter);
  loadPage();

  show(moreReviewsBtn);
  moreReviewsBtn.addEventListener('click', showMoreReviews);
  reviewsFilter.addEventListener('change', applyFilter, true);

  function applyFilter(evt) {
    var target = evt.target;
    if (target.type !== 'radio') {
      return;
    }
    reviewsList.innerHTML = '';
    instancesOfReview.forEach(function(review) {
      review.remove();
    });
    instancesOfReview = [];

    localStorage.setItem('filterID', target.id);
    filterID = target.id;
    pageNumber = -1;
    loadPage();
    show(moreReviewsBtn);
  }

  function showMoreReviews() {
    loadPage(renderReviews);
  }

  function loadPage(renderFunction) {
    var REVIEWS_LOAD_URL = '/api/reviews';
    var fromItem = ++pageNumber * pageSize;
    var toItem = fromItem + pageSize;

    renderFunction = renderFunction || showReviews;

    load(REVIEWS_LOAD_URL, {
      from: fromItem,
      to: toItem,
      filter: filterID
    }, renderFunction);
  }

  function showReviews(data) {
    renderReviews(data);
    show(reviewsFilter);

    document.getElementById(filterID).checked = true;
  }

  function renderReviews(reviews) {
    if (reviews.length < pageSize) {
      hide(moreReviewsBtn);
    }

    reviews.forEach(function(item) {
      var review = new Review(item, templateReviewElement.cloneNode(true));
      instancesOfReview.push(review);
      reviewsList.appendChild(review.element);
    });
  }

  function show(element) {
    element.classList.remove('invisible');
  }

  function hide(element) {
    element.classList.add('invisible');
  }
});

