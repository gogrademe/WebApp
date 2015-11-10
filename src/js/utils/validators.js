import Formsy from 'formsy-react';
import moment from 'moment';

module.exports = function() {
    Formsy.addValidationRule('isWeight', (values, value) => {
        const number = Number(value);
        if (number !== number) {
          return false;
        }

        var isInRange = number >= 0.5 && number <= 100;
        return isInRange;
    });
    Formsy.addValidationRule('isDate', function(values, value) {
        var allowedFromats = ['L', 'l'];
        return moment(value, allowedFromats, true).isValid();
    });
    Formsy.addValidationRule('isMoreThan', function (values, value, otherField) {
      // The this context points to an object containing the values
      // {childAge: "", parentAge: "5"}
      // otherField argument is from the validations rule ("childAge")
      return Number(value) > Number(this[otherField]);
    });
    Formsy.addValidationRule('isLessThan', function (values, value, otherField) {
      // The this context points to an object containing the values
      // {childAge: "", parentAge: "5"}
      // otherField argument is from the validations rule ("childAge")
      return Number(value) < Number(this[otherField]);
    });
};
