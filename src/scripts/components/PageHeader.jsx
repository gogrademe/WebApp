"use strict";

var React = require('react');

var PageHeader = React.createClass({
  render(){
    return (
      <div className="header segment">
        <div className="container">
          <h3 className="ui header">
            <span>
              {this.props.primary}
            </span>
            <span className="sub header">
              {this.props.secondary}
            </span>
          </h3>
          <div className="right actions">
            {this.props.right}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PageHeader;
