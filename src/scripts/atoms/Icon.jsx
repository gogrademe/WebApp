var React = require('react');

var Icon = React.createClass({
  render() {
    console.warn('WARN: Icon has been depreciated.');
    return (
      <i className={joinClasses('ui field', error)}
    );
  }
});

module.exports = Icon;
