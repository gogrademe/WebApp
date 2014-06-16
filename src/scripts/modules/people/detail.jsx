var React = require('react');
var Panel = require('../../components/Panel.jsx');

var PersonDetail = React.createClass({
  render: function() {
    return (
        <Panel hasBody title="Home" className="content-area">
          Detail page!
        </Panel>
    );
  }
});

module.exports = PersonDetail;
