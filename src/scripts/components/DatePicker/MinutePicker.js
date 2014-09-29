var React = require('react');

var MinutePicker = React.createClass({
    getDefaultProps: function() {
        return {
            minute: 0
        };
    },

    render: function() {
        var children = [],
            i;

        children.push(React.DOM.div({
            className: 'label',
            children: ['Minutes']
        }));

        for (i = 0; i < 60; i += 3) {
            children.push(React.DOM.div({
                children: i,
                className: i === this.props.minute ? 'selected' : '',
                onClick: this.handleClickMinute.bind(this, i)
            }));
        }

        return React.DOM.div({
            className: 'minute-picker picker-selector ' + (this.props.mode !== 'minutes' ? 'hidden' : ''),
            children: children
        });
    },

    handleClickMinute: function(minute, e) {
        this.props.updateTime(null, minute);
        this.props.changeMode('time');
    }
});


module.exports = MinutePicker;
