/** @jsx React.DOM */

var Header = require('./header/headerBar');
var LoginForm = require('./login/login');

var React = require('react');
var GoGradeApp = React.createClass({

    render: function() {
        return (<div>
    <Header/>
    <LoginForm/>
    </div>)
    }
    });

module.exports = GoGradeApp;