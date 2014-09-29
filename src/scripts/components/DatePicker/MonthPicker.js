var React = require('react');


var months = require('./utils').months;

var MonthPicker = React.createClass({
    getDefaultProps: function() {
        return {
            month: 0,
            year: 2014,
            hidden: true,
            changeYear: function() {},
            changeMonth: function() {},
            changeMode: function() {}
        };
    },

    render: function() {
        var children = [],
            i;

        for (i = 0; i < 12; i++) {
            children.push(React.DOM.div({
                className: this.props.month === i ? 'selected' : '',
                children: months[i].substr(0,3),
                onClick: this.handleClickMonth.bind(this, i)
            }));
        }

        return React.DOM.div({
            className: this.props.hidden ? 'hidden' : '',
            children: [
                React.DOM.div({
                    className: 'date-picker-header',
                    children: [
                        React.DOM.i({
                            className: 'fa fa-angle-left',
                            onClick: this.handlePreviousOnClick
                        }),
                        React.DOM.span({
                            children: this.props.year
                        }),
                        React.DOM.i({
                            className: 'fa fa-angle-right',
                            onClick: this.handleNextOnClick
                        })
                    ]
                }),
                React.DOM.div({
                    className: 'month-picker picker-selector',
                    children: children
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

    handlePreviousOnClick: function() {
        this.props.changeYear(this.props.year - 1);
    },

    handleNextOnClick: function() {
        this.props.changeYear(this.props.year + 1);
    },

    handleClickMonth: function(month) {
        this.props.changeMonth(month);
        this.props.changeMode('date');
    },

    handleClickDate: function() {
        this.props.changeMode('date');
    }
});

module.exports = MonthPicker;
