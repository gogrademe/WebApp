/** @jsx React.DOM */
var React = require('react');
var Panel = require('../../components/base/Panel.jsx');


var ClassHome = React.createClass({
  render: function() {
    return (<Panel title="Home" className="content-area" hasBody>
              Something Randome
            </Panel>)
  }
  });

module.exports = ClassHome;