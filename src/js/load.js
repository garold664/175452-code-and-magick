'use strict';

define(['./review-data.js'], function(ReviewData) {
  var getSearchString = function(params) {
    return Object.keys(params).map(function(param) {
      return [param, params[param]].join('=');
    }).join('&');
  };

  function handleJSONPResponse(url, params, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      loadedData = loadedData.map(function(review) {
        return new ReviewData(review);
      });
      callback(loadedData);
    };

    xhr.open('GET', url + '?' + getSearchString(params));
    xhr.send();
  }

  return handleJSONPResponse;
});
