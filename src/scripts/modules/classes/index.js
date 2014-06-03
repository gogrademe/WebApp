/** @jsx React.DOM */

var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps')
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
    var detailViewWithProps = cloneWithProps(this.props.detailView, {currentClass: this.props.currentClass});
    return (
      <div className="two-col">
        <Nav currentClass={this.props.currentClass} className="sidebar-nav" />
          {detailViewWithProps}
      </div>
    )
  }
});


var ClassDetail = require('./detail.jsx');
var ClassList = require('./list.jsx');
var ClassAssignments = require('./Assignments.jsx');
var ClassSettings = require('./Settings.jsx');
module.exports = (
  <Routes path="/" view={ClassList}>
    <Routes view={Split} name="detail" path=":currentClass">
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
