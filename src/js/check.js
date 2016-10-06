function getMessage(a, b) {

  if ( a === true) {
    return "Я попал в " + b;
  }
  if ( a === false) {
    return "Я никуда не попал";
  }
  if (typeof a == "number") {
    return "Я прыгнул на " + a * 100 + " сантиметров";
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    var distancePath = 0;
    for (var i = 0, l = a.length; i < l; i++) {
      distancePath += a[i] * b[i];
    }
    return "Я прошёл " + distancePath + " метров";
  }
  if (Array.isArray(a) && !(Array.isArray(b))) {
    var numberOfSteps = a.reduce(function(prev, curr) {
      return prev + curr;
    });
    return "Я прошёл " + numberOfSteps + " шагов";
  }
  return "Переданы некорректные данные";

}
