'use strict';

define(['./inherit', './base-component'], function(inherit, BaseComponent) {

  inherit(Review, BaseComponent);

  function Review(review, templateReview) {
    this.data = review;
    this.IMAGE_SIZE = 124;
    this.element = templateReview;
    this.author = this.element.querySelector('.review-author');
    this.rating = this.element.querySelector('.review-rating');
    this.text = this.element.querySelector('.review-text');
    this.image = new Image();

    this.image.src = this.data.author.picture;
    this.author.title = this.data.author.name;
    this.rating.textContent = this.data.rating;
    this.text.textContent = this.data.description;

    this.quiz = this.element.querySelector('.review-quiz');

    this.addHandler.call(this, this.quiz, 'click', this.quizHandler);
    this.addHandler.call(this, this.image, 'load', this.loadHandler);
    this.addHandler.call(this, this.image, 'error', this.errorHandler);
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
