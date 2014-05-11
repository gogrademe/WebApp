
var Panel = require('../components/Panel.jsx');

// var HomePage = require('./ClassHomePage');
// var StudentsPage = require('./ClassStudentsPage');


// var Routed = require('Reactful-Router');
// var Link = Routed.NavLink;
// var Router = Routed.Router;
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Link = require('../components/HighlightedLink.jsx');


var ClassHome = React.createClass({
  render: function() {
    return (
      <Panel title="Home" hasBody>
        This will be a cool home page for a class!
      </Panel>
    );
  }

});
var ClassAssignments = React.createClass({
  render: function() {
    return (
      <Panel title="Assignments" hasBody>
        Assignments
      </Panel>
    );
  }

});
var ClassGrades = React.createClass({
  render: function() {
    return (
      <Panel title="Grades" hasBody>
        Grades
      </Panel>
    );
  }

});
var ClassStudents = React.createClass({
  render: function() {
    return (
      <Panel title="Students">
        <table className="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
      </Panel>
    );
  }

});
var ClassSettings = React.createClass({
  render: function() {
    return (
      <Panel title="Settings" hasBody>
        Settings
      </Panel>
    );
  }

});


var ClassMain = React.createClass({
  render: function() {
    return (
      <div className="two-col">
        <Panel title="Nav" className="sidebar">
          <ul className="sidebar-nav nav">
            <Link href="/classes/" matchPattern="/classes/">Home</Link>
            <Link href="/classes/assignments" matchPattern="/classes/assignments">Assignments</Link>
            <Link href="/classes/grades">Grades</Link>
            <Link href="/classes/students">Students</Link>
            <Link href="/classes/settings">Settings</Link>
          </ul>
        </Panel>
          <Locations contextual className="content-area">
            <Location path="/" handler={ClassHome} />
            <Location path="/assignments" handler={ClassAssignments} />
            <Location path="/grades" handler={ClassGrades} />
            <Location path="/students" handler={ClassStudents} />
            <Location path="/settings" handler={ClassSettings} />
          </Locations>

      </div>
    );
  }
});

module.exports = ClassMain;
