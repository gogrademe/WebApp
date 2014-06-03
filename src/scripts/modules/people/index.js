/** @jsx React.DOM */

var React = require('react');
var RRouter = require('rrouter');
var Panel = require('../../components/Panel.jsx');


var Routes = RRouter.Routes;
var Route = RRouter.Route;
var RoutingContextMixin = RRouter.RoutingContextMixin;

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);


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

var ListModule = require('./list.jsx');
module.exports = function(props){
  var props = props || null;
  return (
  <Routes path="/" view={ListModule}>
    <Routes view={Split} path=":currentClass" flux={props.flux}>
      <Route name="home" path="home" detailView={UserEdit} flux={props.flux} />
    </Routes>
  </Routes>
)
};
