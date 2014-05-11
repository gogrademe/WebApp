/** @jsx React.DOM */

require('../less/styles.less');

React = require('react');

var Header = require('./components/header/header');
var GoGradeApp = require('./GoGradeApp.jsx');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Locations>
          <Location path="/" Handler={GoGradeApp}/>
        </Locations>
      </div>
    );
  }
})


React.renderComponent(
    <App />,
    document.getElementById('app')
);