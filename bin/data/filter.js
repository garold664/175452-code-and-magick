'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'reviews-all':
      return list;

    case 'reviews-recent':
      return list.filter(function(item) {
        var createdTime = item.created;
        var now = Date.now();
        var millisecondsInDay = (1000 * 60 * 60 * 24);
        var elapsedDays = (now - createdTime)/millisecondsInDay;

        return elapsedDays <= 3;
      }).sort(function(a, b) {
        return b.created - a.created;
      });

    case 'reviews-good':
      return list.filter(function(item) {
        return item.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });

    case 'reviews-bad':
      return list.filter(function(item) {
        return item.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });

    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
  }

  return list;
};




