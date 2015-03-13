"use strict";

function validateWeight(number) {
  number = Number(number);

  if (number !== number) {
    return {
      error: 'Must be a number'
    };
  }

  var isInRange = number >= 0.5 && number <= 100;
  if (!isInRange) {
    return {
      error: 'Must be between 0.5% and 100%'
    };
  }
}

module.exports = validateWeight;
