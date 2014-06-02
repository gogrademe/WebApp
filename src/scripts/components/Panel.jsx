/** @jsx React.DOM */
var React = require('react');

var PanelBody = React.createClass({
  render: function() {
    return (
      <div className="panel-body">
        {this.props.children}
      </div>
    );
  }
});

var Panel = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.title}</h3>
          </div>
          {this.props.hasBody ? PanelBody(null, this.props.children) : this.props.children}
        </div>
      </div>
    );
  }
});



module.exports = Panel;
