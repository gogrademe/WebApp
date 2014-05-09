/** @jsx React.DOM */
var React = require('react');

var HeaderBar = React.createClass({
    render: function () {
        return (
            <div className="navbar navbar-fixed-top nav-justified navbar-default header header-tall">
                <div className="navbar-header">
                    <div className="nav nav-justified">
                        <h1>
                            <a className="navbar-brand" href="#"><img src="assets/img/lanciv-logo-final.png"/> Cunae Gradebook</a>
                        </h1>
                    </div>
                </div>
            </div>
            );
    }
});

module.exports = HeaderBar;
