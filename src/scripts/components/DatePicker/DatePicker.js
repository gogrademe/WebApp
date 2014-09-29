var React = require('react');

var MonthPicker = require('./MonthPicker');
var Month = require('./Month');
var TimePicker = require('./TimePicker');

var months = require('./utils').months;

DatePicker = React.createClass({
    getDefaultProps: function() {
        return {
            startDate: new Date(),
            //endDate: new Date(),
            receiveStartDate: function() {},
            //receiveEndDate: function() {}
        };
    },

    getInitialState: function() {
        return {
            month: this.props.startDate.getMonth(),
            year: this.props.startDate.getFullYear(),
            mode: 'date',
            previousMode: 'date'
        };
    },

    render: function() {
        var props = {
            startDate: this.props.startDate,
            //endDate: this.props.endDate,
            month: this.state.month,
            year: this.state.year,
            receiveStartDate: this.props.receiveStartDate,
            //receiveEndDate: this.props.receiveEndDate
        };

        return React.DOM.div({
            className: 'date-picker',
            children: [
                this.buildDate(props),
                //this.buildTime(props, 'start-time'),
                //this.buildTime(props, 'end-time'),
                MonthPicker({
                    hidden: this.state.mode !== 'month',
                    changeMode: this.changeMode,
                    changeYear: this.changeYear,
                    changeMonth: this.changeMonth,
                    year: this.state.year,
                    month: this.state.month
                })
            ]
        });
    },

    buildDate: function(props) {
        var className = 'date-picker-page-date';

        if (this.state.mode !== 'date') className += ' hidden';

        return React.DOM.div({
            className: className,
            children: [
                React.DOM.div({
                    className: 'date-picker-header',
                    children: [
                        React.DOM.i({
                            className: 'angle left icon',
                            onClick: this.handlePreviousOnClick
                        }),
                        React.DOM.span({
                            children: months[this.state.month] + ' ' + this.state.year,
                            onClick: this.handleClickMonth
                        }),
                        React.DOM.i({
                            className: 'angle right icon',
                            onClick: this.handleNextOnClick
                        })
                    ]
                }),
                Month(props)
                // React.DOM.div({
                //     className: 'mode-selector',
                //     children: [
                //         React.DOM.div({
                //             children: [
                //                 React.DOM.i({ className: 'fa fa-clock-o '}),
                //                 'Start'
                //             ],
                //             onClick: this.handleClickStart
                //         }),
                //         React.DOM.div({
                //             children: [
                //                 React.DOM.i({ className: 'fa fa-clock-o '}),
                //                 'End'
                //             ],
                //             onClick: this.handleClickEnd
                //         })
                //     ]
                // })
            ]
        });
    },

    // buildTime: function(props, mode) {
    //     return TimePicker({
    //         date: (mode === 'start-time') ? props.startDate : props.endDate,
    //         receiveDate: (mode === 'start-time') ? props.receiveStartDate : props.receiveEndDate,
    //         timeMode: mode,
    //         mode: this.state.mode,
    //         changeMode: this.changeMode
    //     });
    // },

    changeYear: function(year) {
        this.setState({ year: year });
    },

    changeMonth: function(month) {
        this.setState({ month: month });
    },

    changeMode: function(mode) {
        if (!mode) {
            this.previousMode();
            return;
        }
        this.setState({ previousMode: this.state.mode });
        this.setState({ mode: mode });
    },

    previousMode: function() {
        this.changeMode(this.previousMode);
    },

    // handleClickStart: function(e) {
    //     this.changeMode('start-time');
    // },
    //
    // handleClickEnd: function(e) {
    //     this.changeMode('end-time');
    // },

    handlePreviousOnClick: function(e) {
        var month = this.state.month - 1,
            year = this.state.year;

        if (month < 0) {
            month = 11;
            year--;
        }

        this.setState({ month: month, year: year });
    },

    handleNextOnClick: function(e) {
        var month = this.state.month + 1,
            year = this.state.year;

        if (month > 11) {
            month = 0;
            year++;
        }

        this.setState({ month: month, year: year });
    },

    handleClickMonth: function() {
        this.changeMode('month');
    }
});

module.exports = DatePicker;
