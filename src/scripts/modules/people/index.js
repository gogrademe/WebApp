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


var DetailModule = require('./detail.jsx');
var ListModule = require('./list.jsx');
module.exports = function(props){2
  var props = props || null;
  return (
  <Routes path="/" view={ListModule}>

      <Route name="home" path=":person" view={DetailModule} />

  </Routes>
)
};
