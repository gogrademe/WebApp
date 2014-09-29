var React = require('react');

var HourPicker = React.createClass({
    getDefaultProps: function() {
        return {
            hour: 0
        };
    },

    render: function() {
        var children = [],
            i;

        children.push(React.DOM.div({
            className: 'label',
            children: 'Hours'
        }));

        for (i = 0; i < 24; i++) {
            children.push(React.DOM.div({
                children: i,
                className: i === this.props.hour ? 'selected' : '',
                onClick: this.handleClickHour.bind(this, i)
            }));
        }

        return React.DOM.div({
            className: 'hour-picker picker-selector ' + (this.props.mode !== 'hours' ? 'hidden' : ''),
            children: children
        });
    },

    handleClickHour: function(hour, e) {
        this.props.updateTime(hour);
        this.props.changeMode('time');
    }
});

module.exports = HourPicker;
