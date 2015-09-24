

var ref$, find, filter, ceiling, isItNaN, sum, map, reject, mean, groupBy, uniqueBy, flatten;
import React from 'react';

import NewTable from '../../components/NewTable';
import api from '../../api/api';

var Grid = NewTable.Grid;

import _ from 'lodash';

var ref$ = require('prelude-ls'), find = ref$.find, filter = ref$.filter, ceiling = ref$.ceiling, isItNaN = ref$.isItNaN, sum = ref$.sum, map = ref$.map, reject = ref$.reject, mean = ref$.mean, groupBy = ref$.groupBy, uniqueBy = ref$.uniqueBy, flatten = ref$.flatten;
var GradeOverview = React.createClass({
  getInitialState(){
    return {
      students: [],
      grades: [],
      assignments: []
    };
  },
  getGrades(){
    api.attempt.find({
      course_id: this.props.course_id,
      term_id: this.props.term_id
    }).then((data) => {
      this.setState({grades: data});
    });
  },
  getStudents(){
    api.enrollment.find({
      course_id: this.props.course_id,
      term_id: this.props.term_id
    }).then((data) =>{
      this.setState({students: data});
    });
  },
  getAssignments(){
    api.assignment.find({
      course_id: this.props.course_id,
      term_id: this.props.term_id
    }).then((data) => {
      this.setState({assignments: data});
    });
  },
  groupTypes(){
    return uniqueBy(function(it){
      return it.id;
    })(
    map(function(it){
      return it.type;
    })(
    this.state.assignments));
  },
  aByType(){
    return groupBy(function(it){
      return it.typeId;
    })(
    this.state.assignments);
  },
  buildCols(){
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
  gradeFor: function(studentId, assignment_id) {
    return _.chain(this.state.grades)
      .filter((x) => {
        // console.log(x, assignment_id);
        return x.assignment_id === assignment_id;
      })
      .value();
      // .find((x) => {
      //     return x.person_id == studentId;
      // }).value();

  },
  buildData() {
    return _.map(this.state.students, (x) =>{
      var res = {
        student: {
          id: x.person.id,
          name: x.person.first_name + " " + x.person.last_name
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
      //     // console.log(this.gradeFor(res.student.id, type[0].assignment_id))
      //     // res.types[type[0].typeId] = 100
      //   });


      return res;
    });
  },
  componentWillMount(){
    this.getGrades();
    this.getAssignments();
    this.getStudents();
  },
  componentDidMount() {
    api.attempt.events.addListener("change", this.getGrades);
  },
  componentWillUnmount(){
    api.attempt.events.removeListener("change", this.getGrades);
  },
  render(){
    return (
      <div>
        <Grid columns={this.buildCols()} data={this.buildData()} />
      </div>
    );
  }
});
module.exports = GradeOverview;
