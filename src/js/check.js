'use strict';
function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    }

    return 'Я никуда не попал';
  }

  if (typeof a === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    var distancePath = a.reduce(function(sum, item, i) {
      return sum + (item * b[i]);
    }, 0);

    return 'Я прошёл ' + distancePath + ' метров';
  }

  if (Array.isArray(a) && !(Array.isArray(b))) {
    var numberOfSteps = a.reduce(function(sum, item) {
      return sum + item;
    });

    return 'Я прошёл ' + numberOfSteps + ' шагов';
  }

  return 'Переданы некорректные данные';
}
getMessage();
