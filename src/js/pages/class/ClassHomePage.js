/** @jsx React.DOM */
var React = require('react');
var Panel = require('../../components/panel');


var ClassHome = React.createClass({
  render: function() {
    return (<Panel title="Home" className="content-area">
              Something Randome
            </Panel>)
  }
  });

module.exports = ClassHome;