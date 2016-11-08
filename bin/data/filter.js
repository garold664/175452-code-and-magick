'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'reviews-all':
      return fetchAll(list);

    case 'reviews-recent':
      return fetchRecent(list);

    case 'reviews-good':
      return fetchGood(list);

    case 'reviews-bad':
      return fetchBad(list);

    case 'reviews-popular':
      return fetchPopular(list);
  }

function fetchAll(array) {
  return array;
}

function fetchRecent(array) {
  return array.filter(function(item) {
    var createdTime = item.created;
    var now = Date.now();
    var millisecondsInDay = (1000 * 60 * 60 * 24);
    var elapsedDays = (now - createdTime)/millisecondsInDay;

    return elapsedDays <= 3;
  }).sort(function(a, b) {
    return b.created - a.created;
  });
}

function fetchGood(array) {
  return array.filter(function(item) {
    return item.rating >= 3;
  }).sort(function(a, b) {
    return b.rating - a.rating;
  });
}

function fetchBad(array) {
  return array.filter(function(item) {
    return item.rating < 3;
  }).sort(function(a, b) {
    return a.rating - b.rating;
  });
}

function fetchPopular(array) {
  return array.sort(function(a, b) {
    return b.review_usefulness - a.review_usefulness;
  });
}
};




