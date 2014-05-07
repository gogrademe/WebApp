/** @jsx React.DOM */
var React = require('react');
var Panel = require('../../components/panel');
var HomePage = require('./ClassHomePage');
var StudentsPage = require('./ClassStudentsPage');


    var ClassMain = React.createClass({
        render: function() {
            return (
              <div className="two-col">
              <Panel title="Nav" className="sidebar">
              something
              </Panel>

        </div>
        )
    }
    });

module.exports = ClassMain;