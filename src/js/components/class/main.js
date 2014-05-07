/** @jsx React.DOM */
var React = require('react');
var Panel = require('../panel');


    var ClassMain = React.createClass({
        render: function() {
            return (
              <div className="two-col">
              <Panel title="Nav" className="sidebar">
              </Panel>
                <Panel title="Teachers" className="content-area">

        </Panel>
        </div>
        )
    }
    });

module.exports = ClassMain;