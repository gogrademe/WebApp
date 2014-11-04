var React = require('react');
var {Router, Navigation}  = require('react-router');
var api = require('../api/api.ls');
var Header = require('../components/Header');

var LogoutModule = React.createClass({
  mixins: [Navigation],
  displayName: "LogoutModule",
  componentDidMount: function(){
    api.session.del()
    return this.replaceWith("/login");
  },
  render: function() {
    return (
      <div>
        <Header title="Logging Out..."/>
        <div className="main">
          <div className="ui grid">
            <div className="column">
              <div className="ui segment">
                <h2 className="ui center aligned header">
                  Logging Out...
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
module.exports = LogoutModule;
