'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'reviews-all':
      return list;

    case 'reviews-recent':
      return list;

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




