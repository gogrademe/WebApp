var React = require('react');

var Icon = React.createClass({
  render() {
    return (
      <i className={joinClasses('ui field', error)}
    );
  }
});

module.exports = Icon;
