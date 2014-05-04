/** @jsx React.DOM */
var React = require('react');

var Panel = React.createClass({
  render: function() {
  return this.transferPropsTo(
  <div className="panel panel-default">
    <div className="panel-heading">
    <h3 className="panel-title">Login</h3>
    </div>
    <div className="panel-body">
      {this.props.children}
    </div>
  </div>
  )
}
});

module.exports = Panel;