'use strict';

define(function() {
  function compileReview(review, templateReview) {
    var IMAGE_SIZE = 124;
    var reviewElement = templateReview.cloneNode(true);
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

  return compileReview;
});
