var React = require('react');

var Icon = React.createClass({
  render() {
    console.warn('WARN: Icon has been deprecated.');
    return (
      <i className={joinClasses('ui field', error)}
    );
  }
});

module.exports = Icon;
