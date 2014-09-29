var React = require('react');

var HourPicker = require('./HourPicker');
var MinutePicker = require('./MinutePicker');

var TimePicker = React.createClass({
    getDefaultProps: function() {
        return {
            date: new Date(),
            receiveDate: function() {},
            mode: '',
            timeMode: '',
            changeMode: function() {}
        };
    },

    getInitialState: function() {
        return {
            mode: 'time'
        };
    },

    render: function() {
        var className = 'date-picker-page-time ' + this.props.mode;

        if (this.props.timeMode !== this.props.mode) className += ' hidden';

        return React.DOM.div({
            className: className,
            children: [
                React.DOM.div({
                    className: 'label',
                    children: this.props.timeMode === 'start-time' ? 'Start Time' : 'End Time'
                }),
                React.DOM.div({
                    className: 'date-time-container' + (this.state.mode !== 'time' ? ' hidden ' : '') ,
                    children: [
                        React.DOM.i({
                            className: 'fa fa-angle-up',
                            onClick: this.handleClickUpHour
                        }),
                        React.DOM.div(),
                        React.DOM.i({
                            className: 'fa fa-angle-up',
                            onClick: this.handleClickUpMinute
                        }),
                        React.DOM.span({
                            children: [this.props.date.getHours()],
                            onClick: this.handleClickHour
                        }),
                        React.DOM.div({
                            children: [':']
                        }),
                        React.DOM.span({
                            children: [this.props.date.getMinutes()],
                            onClick: this.handleClickMinute
                        }),
                        React.DOM.i({
                            className: 'fa fa-angle-down',
                            onClick: this.handleClickDownHour
                        }),
                        React.DOM.div(),
                        React.DOM.i({
                            className: 'fa fa-angle-down',
                            onClick: this.handleClickDownMinute
                        }),
                    ],
                }),
                HourPicker({
                    mode: this.state.mode,
                    hour: this.props.date.getHours(),
                    updateTime: this.updateTime,
                    changeMode: this.changeMode
                }),
                MinutePicker({
                    mode: this.state.mode,
                    minute: this.props.date.getMinutes(),
                    updateTime: this.updateTime,
                    changeMode: this.changeMode
                }),
                React.DOM.div({
                    className: 'mode-selector',
                    children: [
                        React.DOM.div({
                            children: [
                                React.DOM.i({ className: 'fa fa-calendar'}),
                                'Date'
                            ],
                        })
                    ],
                    onClick: this.handleClickDate
                })
            ]
        });
    },

    changeMode: function(mode) {
        this.setState({mode: mode});
    },

    handleClickHour: function() {
        this.setState({mode: 'hours'});
    },

    handleClickMinute: function() {
        this.setState({mode: 'minutes'});
    },

    handleClickUpHour: function() {
        var hours = this.props.date.getHours() + 1;

        if (hours > 23) hours = 0;

        this.updateTime(hours);
    },

    handleClickUpMinute: function() {
        var minutes = this.props.date.getMinutes() + 1;

        if (minutes > 59) minutes = 0;

        this.updateTime(null, minutes);
    },

    handleClickDownHour: function() {
        var hours = this.props.date.getHours() - 1;

        if (hours < 0) hours = 23;

        this.updateTime(hours);

    },

    handleClickDownMinute: function() {
        var minutes = this.props.date.getMinutes() - 1;

        if (minutes < 0) minutes = 59;

        this.updateTime(null, minutes);
    },

    handleClickDate: function() {
        this.props.changeMode('date');
    },

    updateTime: function(hours, minutes) {
        var date = new Date(this.props.date.getTime());

        if (typeof hours !== 'number') hours = this.props.date.getHours();

        if (typeof minutes !== 'number') minutes = this.props.date.getMinutes();

        date.setHours(hours);
        date.setMinutes(minutes);

        this.props.receiveDate(date);
    }
});

module.exports = TimePicker;
