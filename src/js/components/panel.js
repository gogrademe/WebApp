/** @jsx React.DOM */
var React = require('react');

var Panel = React.createClass({
  render: function() {
  return this.transferPropsTo(
    <div>
  <div className="panel panel-default">
    <div className="panel-heading">
    <h3 className="panel-title">{this.props.title}</h3>
    </div>
    <div className="panel-body">
      {this.props.children}
    </div>
  </div>
  </div>
  )
}
});

module.exports = Panel;