

import React from 'react';

var Split = React.createClass({
  render(){
    return (
      <div className="two-col">
        {this.props.detailView}
      </div>
    );
  }
});

module.exports = {
  List: require('./list'),
  Detail: require('./detail')
};
