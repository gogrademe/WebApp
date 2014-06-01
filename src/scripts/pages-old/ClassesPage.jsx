
var Panel = require('../components/Panel.jsx');
var Grid = require('react-grid');
// var HomePage = require('./ClassHomePage');
// var StudentsPage = require('./ClassStudentsPage');
// var StudentActions = require('../core/actions/StudentActions');
// var StudentStore = require('../core/stores/StudentStore');


var ReactRouter = require('react-router');
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;



var ClassHome = React.createClass({
  render: function() {
    return (
      <Panel title="Home" hasBody>
        This will be a cool home page for a class!
      </Panel>
    );
  }

});
// var ClassAssignments = React.createClass({
//   render: function() {
//     return (
//       <Panel title="Assignments" hasBody>
//         Assignments
//       </Panel>
//     );
//   }

// });
// var ClassGrades = React.createClass({
//   render: function() {
//     return (
//       <Panel title="Grades" hasBody>
//         Grades
//       </Panel>
//     );
//   }

// });

// var columns = [
//   {
//     name: '#',
//     width: '20%',
//     key: 0,
//     resizeable: true
//   },
//   {
//     name: 'Name',
//     width: '80%',
//     key: 1,
//     resizeable: true
//   }
// ];
// function rows(start, end) {

//   var rRows = [];
//   for (var i = start; i < end; i++) {
//     rRows.push([i, 'Name ' + i]);
//   }
//   console.log(rRows);
//   return rRows;
// }

// var ClassStudents = React.createClass({

//   render: function() {
//     StudentActions.create({firstName: "test"});
//     console.log(StudentStore.getAll());
//     return (
//       <Panel title="Students">
//         <Grid
//           columns={columns}
//           length={10000}
//           rows={rows}
//           rowHeight={40}
//           />
//       </Panel>
//     );
//   }

// });
// var ClassSettings = React.createClass({
//   render: function() {
//     return (
//       <Panel title="Settings" hasBody>
//         Settings
//       </Panel>
//     );
//   }

// });


// var ClassDetail = React.createClass({
//   render: function() {
//     return (
//       <div className="two-col">
//         <Panel title="Nav" className="sidebar">
//           <ul className="sidebar-nav nav">
//             <Link href={this.props.id + '/'} matchPattern="/classes/">Home</Link>
//             <Link href={this.props.id + '/assignments'} matchPattern="/classes/assignments">Assignments</Link>
//             <Link href={this.props.id + '/grades'}>Grades</Link>
//             <Link href={this.props.id + '/students'}>Students</Link>
//             <Link href={this.props.id + '/settings'}>Settings</Link>
//           </ul>
//         </Panel>
//           <Locations contextual className="content-area">
//             <Location path="/" handler={ClassHome} />
//             <Location path="/assignments" handler={ClassAssignments} />
//             <Location path="/grades" handler={ClassGrades} />
//             <Location path="/students" handler={ClassStudents} />
//             <Location path="/settings" handler={ClassSettings} />
//           </Locations>

//       </div>
//     );
//   }
// });
// var ClassList = React.createClass({
//   render: function() {
//     return (
//       <div>
//          Some list
//       </div>
//     );
//   }
// });
var ClassPage = React.createClass({
  render: function() {
    return (
      <div>
        <Route path="classes" path="classes" handler={ClassHome}/>
        <div>
          {this.props.activeRoute}
        </div> 
      </div>
    );
  }
});
// <Route path="classHome" path="classes/home" handler={ClassHome} />
module.exports = ClassPage;
