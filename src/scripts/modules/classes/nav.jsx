var React = require('react');
var RRouter = require('rrouter');
// var Link = require('../../components/HighlightedLink.jsx');
var Link = RRouter.Link;

var Panel = require('../../components/Panel.jsx');

var Nav = React.createClass({
  render: function() {
    return this.transferPropsTo(
        <Panel title="Nav" className="sidebar">
          <ul className="sidebar-nav nav">
            <Link to="/classes" matchPattern="/classes/assignments">Back</Link>
            <Link to="home" currentClass={this.props.currentClass} matchPattern="/classes/assignments">Home</Link>
            <Link to="assignments" currentClass={this.props.currentClass} matchPattern="/classes/assignments">Assignments</Link>
          </ul>
        </Panel>
    );
  }
});

module.exports = Nav;
