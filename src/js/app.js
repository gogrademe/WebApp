/** @jsx React.DOM */

var React = require('react');


window.React = React;

var GoGradeApp = require('./components/GoGradeApp');

React.renderComponent(
    <GoGradeApp />,
    document.getElementById('app')
);
