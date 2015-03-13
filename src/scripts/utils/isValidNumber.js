
"use strict";

function validNumber(number) {
  number = Number(number);

  if (number !== number) {
    return {
      error: 'Must be a number'
    };
  }
}

module.exports = validNumber;
