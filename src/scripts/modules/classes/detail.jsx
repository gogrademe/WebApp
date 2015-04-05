
import React from 'react';
import Panel from '../../components/Panel.ls';
import {Grid} from '../../components/NewTable.ls';
import api from '../../api/api.ls';
import {State} from 'react-router';
import {find, filter, ceiling, isItNaN, sum, map, reject, mean} from 'prelude-ls';

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
        return "A+";
      case !(x > 92):
        return "A";
      case !(x > 90):
        return "A-";
      case !(x > 87):
        return "B+";
      case !(x > 84):
        return "B";
      case !(x > 79):
        return "B-";
      case !(x > 76):
        return "C+";
      case !(x > 72):
        return "C";
      case !(x > 69):
        return "C-";
      case !(x > 66):
        return "D+";
      case !(x > 62):
        return "D";
      case !(x > 59):
        return "D-";
      default:
        return "F";
      }
    },

    // I need all weights for a class which must total up to 100%
    // Ex
    // 20%
    // 40%
    // 10%
    // 30%
    calcGrade() {
      const assignments = this.props.row.assignments;
      let grades = {};

      // Put grades into buckets by weight.
      for (let x in assignments) {
        const a = assignments[x];
        if (a.grade) {
          const type = a.grade.assignment.type.weight;

          if (!grades[type]) grades[type] = [];

          grades[type].push(a.grade.gradeAverage);
        }
      }

      console.log(grades);

      // Calculate average for each bucket. Then multiply by weight.
      // x is weight.
      let weighted = [];
      for (let x in grades) {
        const total = grades[x].reduce((total, num) => total + num);
        console.log(total);
        // Average in weighted bucket.
        const average = (total / grades[x].length).toFixed(2);
        console.log(average);
        console.log(x);
        weighted.push(average * x);
      }

      console.log(weighted);
      if (weighted.length) {
        return Math.round(weighted.reduce((total,num) => total + num) * 100);
      }

    },

    render(){
      let body = this.calcGrade() + " | " + this.calcIbGrade(this.calcGrade()) + " | " + this.calcUsLetterGrade(this.calcGrade());
      return (
        <div>
          {body}
        </div>
      );
    }
  });

  let ClassDetail = React.createClass({
    mixins: [State],
    displayName: "ClassDetail",
    getInitialState(){
      return {
        students: [],
        grades: [],
        assignments: []
      };
    },
    getGrades(){
      api.grade.find({
        classId: this.getParams().resourceId,
        termId: this.getParams().termId
      }).then(it => {
        this.setState({
          grades: it
        });
      });
    },
    getStudents(){
      api.enrollment.find({
        classId: this.getParams().resourceId,
        termId: this.getParams().termId
      })
      .then(it => {
        this.setState({
          students: it
        });
      });
    },
    getAssignments(){
      api.assignment.find({
        classId: this.getParams().resourceId,
        termId: this.getParams().termId
      })
      .then(it => {
        this.setState({
          assignments: it
        });
      });
    },
    buildCols(){
      let cols = [{
        key: "student.name",
        display: "Student",
        className: "two wide"
      }];

      for (let x of this.state.assignments) {
        cols.push({
          key: "assignments." + x.id + ".grade.gradeAverage",
          format: "decimalPercent",
          display: x.name + ""
        });
      }

      cols.push({
        display: "Avg - IB - US",
        className: "two wide",
        tdClassName: "positive",
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
          assignments: {}
        };

        for (let a of this.state.assignments) {
          let grade = this.state.grades.filter(x => {
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
      api.grade.events.addListener("change", this.getGrades);
      this.getGrades();
      this.getAssignments();
      this.getStudents();
    },
    componentWillUnmount(){
      api.grade.events.removeListener("change", this.getGrades);
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
