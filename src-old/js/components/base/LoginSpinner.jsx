show: React.PropTypes.bool.isRequired


/** @jsx React.DOM */
var React = require('react');
var HeaderBar = require('./headerBar');
var HeaderNav = require('./headerNav');
var Header = React.createClass({

        getDefaultProps: function() {
            return {
                loggedIn: false
            };
        },
        render: function() {
            return ( < div > {
                    this.props.loggedIn ? HeaderNav(null) : HeaderBar(null)
                } < /div>
    )
}
});

module.exports = Header;
