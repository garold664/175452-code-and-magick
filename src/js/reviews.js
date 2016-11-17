'use strict';

define(['./inherit', './base-component', './review', './load'], function(inherit, BaseComponent, Review, load) {

  inherit(Reviews, BaseComponent);
  console.dir(Reviews.prototype);

  function Reviews() {
    var template = document.querySelector('#review-template');
    var templateContainer = 'content' in template ? template.content : template;

    this.templateReviewElement = templateContainer.firstElementChild;
    this.reviewsList = document.querySelector('.reviews-list');
    this.reviewsFilter = document.querySelector('.reviews-filter');
    this.moreReviewsBtn = document.querySelector('.reviews-controls-more');

    this.pageNumber = -1;
    this.pageSize = 3;
    this.instancesOfReview = [];

    // this.showMoreReviews = this.showMoreReviews.bind(this);
    // this.applyFilter = this.applyFilter.bind(this);
  }

  Reviews.prototype.init = function() {
    this.filterID = localStorage.getItem('filterID') || 'reviews-all';

    // this.hide(this.reviewsFilter);
    this.hide.call(this, this.reviewsFilter);
    this.loadPage();
    this.show.call(this, this.moreReviewsBtn);
    // this.show(this.moreReviewsBtn);

    this.addHandler.call(this, this.moreReviewsBtn, 'click', this.showMoreReviews);
    this.addHandler.call(this, this.reviewsFilter, 'change', this.applyFilter);

    // this.moreReviewsBtn.addEventListener('click', this.showMoreReviews);
    // this.reviewsFilter.addEventListener('change', this.applyFilter, true);
  };

  Reviews.prototype.applyFilter = function(evt) {
    var target = evt.target;
    if (target.type !== 'radio') {
      return;
    }

    this.reviewsList.innerHTML = '';
    this.instancesOfReview.forEach(function(review) {
      review.remove();
    });
    this.instancesOfReview = [];

    this.filterID = target.id;
    localStorage.setItem('filterID', this.filterID);

    this.pageNumber = -1;
    this.loadPage();
    this.show(this.moreReviewsBtn);
  };

  Reviews.prototype.showMoreReviews = function() {
    this.loadPage(this.renderReviews);
  };

  Reviews.prototype.loadPage = function(renderFunction) {
    var REVIEWS_LOAD_URL = '/api/reviews';
    var fromItem = ++this.pageNumber * this.pageSize;
    var toItem = fromItem + this.pageSize;

    var callback = renderFunction || this.showReviews;
    callback = callback.bind(this);

    load(REVIEWS_LOAD_URL, {
      from: fromItem,
      to: toItem,
      filter: this.filterID
    }, callback);
  };

  Reviews.prototype.showReviews = function(data) {
    this.renderReviews(data);
    this.show(this.reviewsFilter);

    document.getElementById(this.filterID).checked = true;
  };

  Reviews.prototype.renderReviews = function(reviews) {
    if (reviews.length < this.pageSize) {
      this.hide(this.moreReviewsBtn);
    }

    reviews.forEach(function(item) {
      var review = new Review(item, this.templateReviewElement.cloneNode(true));

      this.instancesOfReview.push(review);
      this.reviewsList.appendChild(review.element);
    }, this);
  };

  // Reviews.prototype.show = function(element) {
  //   element.classList.remove('invisible');
  // };

  // Reviews.prototype.hide = function(element) {
  //   element.classList.add('invisible');
  // };

  return Reviews;
});

