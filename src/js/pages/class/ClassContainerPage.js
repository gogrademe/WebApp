/** @jsx React.DOM */
var React = require('react');
var Panel = require('../../components/base/Panel.jsx');
var HomePage = require('./ClassHomePage');
var StudentsPage = require('./ClassStudentsPage');

var HighlightedLink = require('../../components/HighlightedLink.jsx');

var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;
    var ClassMain = React.createClass({
        render: function() {
            return (
              <div className="two-col">
              <Panel title="Nav" className="sidebar">
                <ul className="sidebar-nav nav">
                  <HighlightedLink activeClassName="active" href="/classes/">Home</HighlightedLink>
                  <HighlightedLink activeClassName="active" href="/classes/assignments">Assignments</HighlightedLink>
                  <HighlightedLink activeClassName="active" href="/classes/grades">Grades</HighlightedLink>
                  <HighlightedLink activeClassName="active" href="/classes/students" matchPath="*/students">Students</HighlightedLink>
                  <HighlightedLink activeClassName="active" href="/classes/settings">Settings</HighlightedLink>
                </ul>
              </Panel>
              <Locations contextual>
                <Location path="/" handler={HomePage} />
                <Location path="/students" handler={StudentsPage} />
              </Locations>
        </div>
        )
    }
    });

module.exports = ClassMain;




  // <ul class="sidebar-nav nav">
  //   <li ui-sref-active="active"><a ui-sref=".home">Home</a></li>
  //   <li ui-sref-active="active"><a ui-sref=".assignments">Assignments</a></li>
  //   <li ui-sref-active="active"><a ui-sref=".gradebook">Grades</a></li>
  //   <li ui-sref-active="active"><a ui-sref=".people">People</a></li>
  //   <li ui-sref-active="active"><a ui-sref=".settings">Settings</a></li>
  // </ul>
