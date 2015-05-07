
import React from 'react';
import {Grid} from '../../components/NewTable';
import api from '../../api/api';
import {State} from 'react-router';

let GradeAverage = React.createClass({
  calcIbGrade(x){
    switch (false) {
      case !(x > 94):
      return 7;
      case !(x > 84):
      return 6;
      case !(x > 74):
      return 5;
      case !(x > 64):
      return 4;
      case !(x > 54):
      return 3;
      case !(x > 44):
      return 2;
      case !(x >= 1):
      return 1;
      default:
      return 0;
    }
  },
  calcUsLetterGrade(x){
    switch (false) {
      case !(x > 96):
      return 'A+';
      case !(x > 92):
      return 'A';
      case !(x > 90):
      return 'A-';
      case !(x > 87):
      return 'B+';
      case !(x > 84):
      return 'B';
      case !(x > 79):
      return 'B-';
      case !(x > 76):
      return 'C+';
      case !(x > 72):
      return 'C';
      case !(x > 69):
      return 'C-';
      case !(x > 66):
      return 'D+';
      case !(x > 62):
      return 'D';
      case !(x > 59):
      return 'D-';
      default:
      return 'F';
    }
  },
  // I need all weights for a class which must total up to 100%
  // Ex
  // 20%
  // 40%
  // 10%
  // 30%
  calcGrade() {
    //   const assignments = this.props.row.assignments;
    //   let groups = this.props.row.groups;
    //   let groupGrades = {};

    //   for (let key in assignments) {
    //     console.log(key);
    //
    //   }
    //
    //   console.log(this.props.row);

    //   for (let key in groups) {
    //       const id = groups[key].id;
    //       groupGrades[id] = [];
    //   }
    //   console.log(groupGrades);
    // //   Put grades into buckets by weight.
    //   for (let x in assignments) {
    //     const a = assignments[x];
    //     if (a.grade) {
    //       const group = a.grade.assignment.group.weight;
    //
    //     //   if (!grades[group]) {
    //     //     grades[group] = [];
    //     //   }
    //
    //       grades[group].push(a.grade.gradeAverage);
    //     }
    //   }
    //
    //   // Calculate average for each bucket. Then multiply by weight.
    //   // x is weight.
    //   let weighted = [];
    //   for (let x in grades) {
    //     const total = grades[x].reduce((total, num) => total + num);
    //     // Average in weighted bucket.
    //     const average = (total / grades[x].length).toFixed(2);
    //
    //     weighted.push(average * x);
    //   }
    //
    //   if (weighted.length) {
    //     return Math.round(weighted.reduce((total,num) => total + num) * 100);
    //   }
  },
  render(){
    const body = this.calcGrade() + ' | ' + this.calcIbGrade(this.calcGrade()) + ' | ' + this.calcUsLetterGrade(this.calcGrade());
    return (
      <div>
        {body}
      </div>
    );
  }
});

let ClassDetail = React.createClass({
  mixins: [State],
  getInitialState(){
    return {
      students: [],
      grades: [],
      assignments: [],
      assignmentGroups: []
    };
  },
  getGrades(){
    api.grade.find({
      classId: this.getParams().resourceId,
      termId: this.getParams().termId
    })
    .then(xs => this.setState({grades: xs}));
  },
  getStudents(){
    api.enrollment.find({
      classId: this.getParams().resourceId,
      termId: this.getParams().termId
    })
    .then(xs => this.setState({students: xs}));
  },
  getAssignments(){
    api.assignment.find({
      classId: this.getParams().resourceId,
      termId: this.getParams().termId
    })
    .then(xs => this.setState({assignments: xs}));
  },
  getAssignmentGroups(){
    api.assignmentGroup.find({
      classId: this.getParams().resourceId,
      termId: this.getParams().termId
    })
    .then(xs => this.setState({assignmentGroups: xs}));
  },
  buildCols(){
    let cols = [{
      key: 'student.name',
      display: 'Student'
    }];

    for (let x of this.state.assignments) {
      cols.push({
        key: `assignments.${x.id}.grade.gradeAverage`,
        format: 'decimalPercent',
        display: x.name
      });
    }

    cols.push({
      display: 'Avg - IB - US',
      tdClassName: 'success',
      renderer: GradeAverage
    });

    return cols;
  },

  buildData(){
    let results = [];
    for (let s of this.state.students) {
      let result = {
        student: {
          id: s.person.id,
          name: `${s.person.firstName} ${s.person.lastName}`
        },
        assignments: {},
        groups: this.state.assignmentGroups
      };

      for (let a of this.state.assignments) {
        let grade = this.state.grades
        .filter(x => {
          return x.assignmentId === a.id;
        })
        .find(x => {
          return x.personId === s.personId;
        });

        result.assignments[a.id] = {
          grade: grade,
          assignment: a
        };
      }
      results.push(result);
    }
    return results;
  },
  componentWillMount() {
    api.grade.events.addListener('change', this.getGrades);
    this.getGrades();
    this.getAssignments();
    this.getAssignmentGroups();
    this.getStudents();
  },
  componentWillUnmount(){
    api.grade.events.removeListener('change', this.getGrades);
  },
  render(){
    return (
      <div>
        <Grid columns={this.buildCols()} data={this.buildData()} />
      </div>
    );
  }
});
module.exports = ClassDetail;
