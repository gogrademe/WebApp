/** @jsx React.DOM */
'use strict';
var React = require('react');
var RRouter = require('rrouter');

var Routes = RRouter.Routes;
var Route = RRouter.Route;
var RoutingContextMixin = RRouter.RoutingContextMixin;


var Nav = require('./nav.jsx');

var Split = React.createClass({
  mixins: [RoutingContextMixin],
  getDefaultProps: function() {
    return {detail: function() { }};
  },
  componentWillMount: function() {
    // if (!this.props.detailView) {
    //   this.navigate(this.props.currentClass + '/home', {replace:true});
    // }
  },
  render: function() {
    console.log(this.props.detail);
    var detailView = this.props.detail;
    return (
      <div className="two-col">
        <Nav currentClass={this.props.currentClass} className="sidebar-nav" />
        <detailView test="someTestProp"/>
      </div>
    );
  }
});


var ClassDetail = require('./detail.jsx');
var ClassList = require('./list.jsx');
var ClassAssignments = require('./Assignments.jsx');
var ClassSettings = require('./Settings.jsx');

module.exports = function(props){
  console.log(props)
  var props = props || null;
  return (
  <Routes path="/" view={ClassList}>
    <Routes view={Split} name="detail" path=":currentClass">
      <Route name="home" path="home" detailView={ClassDetail} />
      <Route name="assignments" path="assignments" detailView={ClassAssignments}/>
      <Route name="settings" path="settings" detailView={ClassSettings}/>
    </Routes>
  </Routes>
);
};
