

import React from 'react';

var PageHeader = React.createClass({
  render(){
    return (
      <div className="page-header">
        <h3>
          {this.props.primary} <small>{this.props.secondary}</small>
        </h3>
        <div className="right actions">
          {this.props.right}
        </div>
      </div>
    );
  }
});

module.exports = PageHeader;

//
// <span className="sub header">
//   {this.props.secondary}
// </span>
