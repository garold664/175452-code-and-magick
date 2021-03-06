'use strict';

define(['./inherit', './base-component', './review-data.js'], function(inherit, BaseComponent) {

  inherit(Review, BaseComponent);

  function Review(review, templateReview) {
    this.data = review;
    this.IMAGE_SIZE = 124;
    this.element = templateReview;
    this.author = this.element.querySelector('.review-author');
    this.rating = this.element.querySelector('.review-rating');
    this.text = this.element.querySelector('.review-text');
    this.image = new Image();

    this.image.src = this.data.getAuthorPicture();
    this.author.title = this.data.getAuthorName();
    this.rating.textContent = this.data.getRating();
    this.text.textContent = this.data.getDescription();

    this.quiz = this.element.querySelector('.review-quiz');

    this.quizHandler = this.quizHandler.bind(this);
    this.loadHandler = this.loadHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);

    this.quiz.addEventListener('click', this.quizHandler);
    this.image.addEventListener('load', this.loadHandler);
    this.image.addEventListener('error', this.errorHandler);
  }

  Review.prototype.loadHandler = function() {
    this.author.width = this.IMAGE_SIZE;
    this.author.height = this.IMAGE_SIZE;
    this.author.src = this.image.src;
  };

  Review.prototype.errorHandler = function() {
    this.element.classList.add('review-load-failure');
  };

  Review.prototype.quizHandler = function(evt) {
    var target = evt.target;
    var parent = target.parentNode;
    var quizClassName = 'review-quiz-answer';
    var quizClassNameActive = 'review-quiz-answer-active';
    var activeEl = parent.querySelector('.' + quizClassNameActive);

    if (activeEl) {
      activeEl.classList.remove(quizClassNameActive);
    }
    if (!(target.classList.contains(quizClassName))) {
      return;
    }

    target.classList.add(quizClassNameActive);
  };

  Review.prototype.remove = function() {
    this.quiz.removeEventListener('click', this.quizHandler);
    this.image.removeEventListener('load', this.loadHandler);
    this.image.removeEventListener('error', this.errorHandler);
  };

  return Review;
});
