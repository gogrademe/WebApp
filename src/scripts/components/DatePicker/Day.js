var React = require('react');
var isSameDay = require('./utils').isSameDay;


var Day = React.createClass({
    getDefaultProps: function() {
        return {
            date: new Date(),
            current: false,
            receiveStartDate: function() {},
            receiveEndDate: function() {}
        };
    },

    getInitialState: function() {
        return {
            selected: this.isSelected()
        };
    },

    render: function() {
        var className = 'day';

        if (this.props.current) className += ' current';

        if (this.isSelected()) className += ' selected';

        if (isSameDay(this.props.startDate, this.props.date)) className += ' start';

        if (isSameDay(this.props.endDate, this.props.date)) className += ' end';

        return React.DOM.div({
            className: className,
            children: this.props.date.getDate(),
            onClick: this.handleClick
        });
    },

    handleClick: function(e) {
        if (this.isSelected()) {
            if (isSameDay(this.props.date, this.props.startDate)) {
                this.props.receiveStartDate(this.props.endDate);
            } else if (isSameDay(this.props.date, this.props.endDate)) {
                this.props.receiveEndDate(this.props.startDate);
            } else {
                this.props.receiveStartDate(this.props.date);
                this.props.receiveEndDate(this.props.date);
            }

        } else if (this.props.date < this.props.startDate) {
            this.props.receiveStartDate(this.props.date);
        } else {
            this.props.receiveEndDate(this.props.date);
        }
    },

    isSelected: function() {
        return ((this.props.date >= this.props.startDate && this.props.date <= this.props.endDate)
            || isSameDay(this.props.startDate, this.props.date)
            || isSameDay(this.props.endDate, this.props.date));
    }
});

module.exports = Day;
