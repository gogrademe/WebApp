/** @jsx React.DOM */

var React = require('react');
var RRouter = require('rrouter');
var Panel = require('../../components/Panel.jsx');


var Routes = RRouter.Routes;
var Route = RRouter.Route;
var RoutingContextMixin = RRouter.RoutingContextMixin;

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var Nav = require('./nav.jsx');
var Split = React.createClass({
  mixins: [RoutingContextMixin, FluxMixin],
  componentWillMount: function() {
    if (!this.props.detailView) {
      this.navigate(this.props.currentClass + '/home', {replace:true});
    }
  },
  render: function() {
    return (
      <div className="two-col">
        <Nav currentClass={this.props.currentClass} className="sidebar-nav" />
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
var ClassAssignments = require('./Assignments.jsx');
var ClassSettings = require('./Settings.jsx');
module.exports = (
  <Routes path="/" view={ClassHome}>
    <Routes view={Split} path=":currentClass">
      <Route name="home" path="home" detailView={ClassDetail} />
      <Route name="assignments" path="assignments" detailView={ClassAssignments}/>
      <Route name="settings" path="settings" detailView={ClassSettings}/>
    </Routes>
  </Routes>
);
// module.exports = (
//   <Routes path="/" view={ClassHome}>
//     <Route view={Split} path=":currentClass">
//       <Route name="assignments" path="assignments" detailView={ClassAssignments} />
//       <Route path="*" detailView={ClassDetail} />
//     </Route>
//   </Routes>
// );
