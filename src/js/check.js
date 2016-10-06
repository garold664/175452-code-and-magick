function getMessage(a, b) {
  switch (typeof a) {
    case "boolean":
      if (a) {
        return "Я попал в " + b;
      }
      return "Я никуда не попал";

    case "number":
      return "Я прыгнул на " + a * 100 + " сантиметров";

    case "object":
      if (Array.isArray(a) && Array.isArray(b)) {
        var distancePath = 0;
        for (var i = 0, maxA = a.length; i < maxA; i++) {
          distancePath += a[i] * b[i];
        }
        return "Я прошёл " + distancePath + " метров";
      } else if (!(Array.isArray(b))) {
        var numberOfSteps = 0;
        for (var i = 0, maxA = a.length; i < maxA; i++) {
          numberOfSteps += a[i];
        }
        return "Я прошёл " + numberOfSteps + " шагов";
      } else if (!(Array.isArray(a))) {
        var numberOfSteps = 0;
        for (var i = 0, maxB = b.length; i < maxB; i++) {
          numberOfSteps += b[i];
        }
        return "Я прошёл " + numberOfSteps + " метров";
      } else {
        return "Переданы некорректные данные";
      }
    default:
      return "Переданы некорректные данные";
  }
}


