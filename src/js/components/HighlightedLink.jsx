var React = require('react');
var Router = require('react-router-component');
var utils = require('../utils');
var urlPattern = require('url-pattern');

var HighlightedLink = React.createClass({

  mixins: [Router.NavigatableMixin],

  isActive: function() {
    if (this.props.matchPattern) {
      var pattern = urlPattern.newPattern(this.props.matchPattern);
      console.log(!!pattern.match(this.getPath()));
      return !!pattern.match(this.getPath());
    } else { return false; }
  },
  render: function() {
    var className;
    if (this.props.activeClassName && this.isActive()) {
      className = this.props.activeClassName;
    }
    var link = Router.Link(null, this.props.children);
    return (
      <li className={className}>
      {this.transferPropsTo(link)}
      </li>);
  }
});

module.exports = HighlightedLink;