var React = require('react');
var RRouter = require('rrouter');
var LinkMixin = RRouter.LinkMixin;
var Link = RRouter.Link;
var utils = require('../utils');
var pattern = require('url-pattern');

var HighlightedLink = React.createClass({
  mixins: [LinkMixin],
  getDefaultProps: function() {
    return {
      activeClassName: 'active'
    };
  },
  onClick: function(e) {
    e.preventDefault();
    this.navigate(this.href());
  },
  isActive: function() {
    var pat = pattern.newPattern(this.href() + '*');

    return !!pat.match(this.getRouting().path);
  },
  render: function() {
    var className;
    if (this.props.activeClassName && this.isActive()) {
      className = this.props.activeClassName;
    }
    return (
      <li className={className}>
        <a href={this.href()} onClick={this.onClick}>
          {this.props.children}
        </a>
      </li>
    );
  }
});

module.exports = HighlightedLink;
