
var Panel = require('../components/Panel.jsx');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;


var StudentsList = React.createClass({
  render: function() {
    return (
      <Panel title="Students">
        Some Table will go here
      </Panel>
    );
  }
});


var StudentsPage = React.createClass({
  render: function() {
    return (
      <div>
        <Locations contextual className="content-area">
          <Location path="/" handler={StudentsList} />
        </Locations>
      </div>
    );
  }
});

module.exports = StudentsPage;



