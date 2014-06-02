/** @jsx React.DOM */

var React = require('react');
var RRouter = require('rrouter');
var Routes = RRouter.Routes;
var Route = RRouter.Route;
var RoutingContextMixin = RRouter.RoutingContextMixin;

var Nav = require('./nav.jsx');
var Split = React.createClass({
  mixins: [RoutingContextMixin],
  componentWillMount: function() {
    console.log(this.props.detailView);
    console.log(this.getRouting());
    if (!this.props.detailView) {
      this.navigate(this.props.currentClass + '/home', {replace:true});
    }
  },
  render: function() {
    return (
      <div>
        <Nav currentClass={this.props.currentClass} />
        {this.props.detailView}
      </div>
    )
  }
});


var UserEdit = React.createClass({
  render: function() {
    return <div>User Edit</div>
  }
});
var ClassHome = React.createClass({
  render: function() {
    return <div>UClassHome</div>
  }
});

var ClassDetail = require('./detail.jsx');

module.exports = (
  <Routes name="classes" view={ClassHome}>
    <Routes view={Split} path=":currentClass">
      <Route name="home" path="home" detailView={ClassDetail} />
      <Route name="assignments" path="assignments" detailView={UserEdit} />

    </Routes>
  </Routes>
);
