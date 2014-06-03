var React = require('react');
var RRouter = require('rrouter');
var Link = require('../../components/HighlightedLink.jsx');

var Panel = require('../../components/Panel.jsx');

var Nav = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <Panel title="Nav" className="sidebar">
        <ul className="sidebar-nav nav">
          <Link to="detail/home"  currentClass={this.props.currentClass} matchPattern="/classes/assignments">Home</Link>
          <Link to="detail/assignments" currentClass={this.props.currentClass} matchPattern="/classes/assignments">Assignments</Link>
          <Link to="detail/settings" currentClass={this.props.currentClass} matchPattern="/classes/assignments">Settings</Link>
        </ul>
      </Panel>
    );
  }
});

module.exports = Nav;
