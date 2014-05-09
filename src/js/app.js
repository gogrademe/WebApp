/** @jsx React.DOM */

require('../less/styles.less');

React = require('react');
var GoGradeApp = require('./GoGradeApp.jsx');

React.renderComponent(
    <GoGradeApp />,
    document.getElementById('app')
);