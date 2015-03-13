"use strict";

var React = require('react');

var Split = React.createClass({
  render: function(){
    return (
      <div className="two-col">
        {this.props.detailView}
      </div>
    );
  }
});

module.exports = {
  List: require('./list.ls'),
  Detail: require('./detail.ls')
};
