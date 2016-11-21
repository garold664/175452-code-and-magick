'use strict';

define(function() {
  var ReviewData = function(data) {
    this.data = data;
  };

  ReviewData.prototype.getAuthorPicture = function() {
    return this.data.author.picture;
  };

  ReviewData.prototype.getAuthorName = function() {
    return this.data.author.name;
  };

  ReviewData.prototype.getRating = function() {
    return this.data.rating;
  };

  ReviewData.prototype.getDescription = function() {
    return this.data.description;
  };

  return ReviewData;
});
