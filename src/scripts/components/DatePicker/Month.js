var React = require('react');

var DayHeader = require('./DayHeader');
var Day = require('./Day');
var days = require('./utils').days;

var Month = React.createClass({
    getDefaultProps: function() {
        return {
            startDate: new Date(),
            endDate: new Date(),
            month: 0,
            year: 2014,
            receiveStartDate: function() {},
            receiveEndDate: function() {}
        };
    },

    render: function() {
        var date = new Date(this.props.year + '-' + (this.props.month + 1) + '-1'),
            offset = date.getDay(),
            items = [],
            counter = 0,
            i;

        for (i = 0; i < days.length; i++) {
            items.push(DayHeader({day: i}));
        }

        date.setDate(date.getDate() - offset);

        while((this.props.month !== 11 && (date.getMonth() <= this.props.month || date.getFullYear() < this.props.year))
                || (this.props.month === 11 && date.getMonth() !== 0)) {
            items.push(Day({
                date: new Date(date.getTime()),
                current: date.getMonth() === this.props.month,
                startDate: this.props.startDate,
                endDate: this.props.endDate,
                receiveStartDate: this.props.receiveStartDate,
                receiveEndDate: this.props.receiveEndDate,
            }));
            date.setDate(date.getDate() + 1);
        }

        while(date.getDay() !== 0) {
            items.push(Day({
                date: new Date(date.getTime()),
                startDate: this.props.startDate,
                endDate: this.props.endDate,
                receiveStartDate: this.props.receiveStartDate,
                receiveEndDate: this.props.receiveEndDate,
            }));
            date.setDate(date.getDate() + 1);
        }

        return React.DOM.div({
            className: 'month',
            children: items
        });
    }
});

module.exports = Month;
