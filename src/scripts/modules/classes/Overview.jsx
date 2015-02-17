var ref$, find, filter, ceiling, isItNaN, sum, map, reject, mean, groupBy, uniqueBy, flatten;
var React = require('react');

var NewTable = require('../../components/NewTable.ls');
var api = require('../../api/api.ls');

var Grid = NewTable.Grid;

var _ = require('lodash');

var ref$ = require('prelude-ls'), find = ref$.find, filter = ref$.filter, ceiling = ref$.ceiling, isItNaN = ref$.isItNaN, sum = ref$.sum, map = ref$.map, reject = ref$.reject, mean = ref$.mean, groupBy = ref$.groupBy, uniqueBy = ref$.uniqueBy, flatten = ref$.flatten;
var GradeOverview = React.createClass({
  getInitialState: function(){
    return {
      students: [],
      grades: [],
      assignments: []
    };
  },
  getGrades: function(){
    api.grade.find({
      classId: this.props.classId,
      termId: this.props.termId
    }).then((data) => {
      this.setState({grades: data});
    });
  },
  getStudents: function(){
    api.enrollment.find({
      classId: this.props.classId,
      termId: this.props.termId
    }).then((data) =>{
      this.setState({students: data});
    });
  },
  getAssignments: function(){
    api.assignment.find({
      classId: this.props.classId,
      termId: this.props.termId
    }).then((data) => {
      this.setState({assignments: data});
    });
  },
  groupTypes: function(){
    return uniqueBy(function(it){
      return it.id;
    })(
    map(function(it){
      return it.type;
    })(
    this.state.assignments));
  },
  aByType: function(){
    return groupBy(function(it){
      return it.typeId;
    })(
    this.state.assignments);
  },
  buildCols: function(){
    var i$, ref$, len$, x;
    var cols = [{
      key: "student.name",
      display: "Student",
    }];

    _(this.groupTypes())
      .forEach((x, key) => {
        cols.push({
          key: "types." + x.id,
          display: x.name
        });
      });

    return cols;
  },
  whatItShouldLookLike: {
    student: {
      id: "Something",
      name: "Jake Price"
    },
    types: {
      typeId1: {
        total: "100%"
      },
      typeId2: {
        total: "100%"
      }
    }
  },
  gradeFor: function(studentId, assignmentId) {
    return _.chain(this.state.grades)
      .filter((x) => {
        // console.log(x, assignmentId);
        return x.assignmentId == assignmentId;
      })
      .value();
      // .find((x) => {
      //     return x.personId == studentId;
      // }).value();

  },
  buildData: function() {
    return _.map(this.state.students, (x) =>{
      var res = {
        student: {
          id: x.person.id,
          name: x.person.firstName + " " + x.person.lastName
        },
        types: {}
      };

      // _.chain(this.state.assignments)
      //   .groupBy((x) => { return x.typeId})
      //   .forEach((type) => {
      //     // console.log(type);
      //     // console.log(type);
      //     console.log(res.student.id, type[0].id);
      //     // res.types[type[0].typeId]
      //     // console.log(this.gradeFor(res.student.id, type[0].assignmentId))
      //     // res.types[type[0].typeId] = 100
      //   });


      return res;
    });
  },
  componentWillMount: function(){
    this.getGrades();
    this.getAssignments();
    this.getStudents();
  },
  componentDidMount: function() {
    api.grade.events.addListener("change", this.getGrades);
  },
  componentWillUnmount: function(){
    api.grade.events.removeListener("change", this.getGrades);
  },
  render: function(){
    return (
      <div>
        <Grid columns={this.buildCols()} data={this.buildData()} />
      </div>
    );
  }
});
module.exports = GradeOverview;
