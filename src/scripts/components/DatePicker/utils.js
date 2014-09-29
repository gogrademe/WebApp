module.exports = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  addDay: function (date, days) {
    var ret = new Date();

    ret.setDate(date.getDate() + days || 1);

    return ret;
  },

  isSameDay: function (date1, date2) {
    if (!date1 || !date2) return false;
    return date1.getMonth() === date2.getMonth() &&
      date1.getYear() === date2.getYear() &&
      date1.getDate() === date2.getDate();
  }
};
