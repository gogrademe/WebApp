
import moment from 'moment';

var allowedFromats = ['L', 'l'];
function validDate(date) {
  if (!moment(date, allowedFromats, true).isValid()) {
    return {
      error: 'Invalid date'
    };
  }
}

module.exports = validDate;
