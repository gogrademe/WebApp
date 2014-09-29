var React = require('react');

var days = require('./utils').days;

var DayHeader = React.createClass({
    render: function() {
        var day = days[this.props.day].substr(0, 1);

        return React.DOM.div({
            className: 'day day-header',
            children: day
        });
    }
});


module.exports = DayHeader;
