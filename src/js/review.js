'use strict';

define(function() {
  function Review(review, templateReview) {
    this.data = review;
    this.IMAGE_SIZE = 124;
    this.element = templateReview.cloneNode(true);
    this.reviewAuthor = this.element.querySelector('.review-author');
    this.reviewRating = this.element.querySelector('.review-rating');
    this.reviewText = this.element.querySelector('.review-text');
    this.image = new Image();

    this.image.src = this.data.author.picture;
    this.reviewAuthor.title = this.data.author.name;
    this.reviewRating.textContent = this.data.rating;
    this.reviewText.textContent = this.data.description;

    this.quiz = this.element.querySelector('.review-quiz');
    this.quizClassName = 'review-quiz-answer';
    this.quizClassNameActive = 'review-quiz-answer-active';

    this.quizHandler = this.quizHandler.bind(this);
    this.loadHandler = this.loadHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);

    this.quiz.addEventListener('click', this.quizHandler);
    this.image.addEventListener('load', this.loadHandler);
    this.image.addEventListener('error', this.errorHandler);
  }

  Review.prototype.loadHandler = function() {
    this.reviewAuthor.width = this.IMAGE_SIZE;
    this.reviewAuthor.height = this.IMAGE_SIZE;
    this.reviewAuthor.src = this.image.src;
  };

  Review.prototype.errorHandler = function() {
    this.element.classList.add('review-load-failure');
  };

  Review.prototype.quizHandler = function(evt) {
    var target = evt.target;
    var parent = target.parentNode;
    var activeEl = parent.querySelector('.' + this.quizClassNameActive);

    if (activeEl) {
      activeEl.classList.remove(this.quizClassNameActive);
    }
    if (!(target.classList.contains(this.quizClassName))) {
      return;
    }

    target.classList.add(this.quizClassNameActive);
  };

  Review.prototype.remove = function() {
    this.quiz.removeEventListener('click', this.quizHandler);
    this.image.removeEventListener('click', this.loadHandler);
    this.image.removeEventListener('click', this.errorHandler);
  };

  return Review;
});


// function compileReview(review, templateReview) {
//     var IMAGE_SIZE = 124;
//     var reviewElement = templateReview.cloneNode(true);
//     var reviewAuthor = reviewElement.querySelector('.review-author');
//     var reviewRating = reviewElement.querySelector('.review-rating');
//     var reviewText = reviewElement.querySelector('.review-text');
//     var image = new Image();

//     image.onload = function() {
//       reviewAuthor.width = IMAGE_SIZE;
//       reviewAuthor.height = IMAGE_SIZE;
//       reviewAuthor.src = image.src;
//     };

//     image.onerror = function() {
//       reviewElement.classList.add('review-load-failure');
//     };

//     image.src = review.author.picture;
//     reviewAuthor.title = review.author.name;
//     reviewRating.textContent = review.rating;
//     reviewText.textContent = review.description;

//     return reviewElement;
//   }

//   return compileReview;
