import PropTypes from "prop-types";
import React from "react";
import { Grid } from "../../components/NewTable";
import api from "../../api/api";
import { loadAssignments } from "../../redux/modules/assignment";
import { loadGradebook } from "../../redux/modules/gradebook";
import { connect } from "react-redux";

class GradeInput extends React.Component {
  state = {
    value: this.props.value,
    initialValue: this.props.value
  };

  changeValue = event => {
    this.setValue(event.currentTarget.value);
  };

  getValue = () => {
    // return this.props.value / this.props.column.maxScore * 100 || '-';
    return this.state.value;
  };

  setValue = value => {
    this.setState({ value: value });
  };

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setValue(this.props.value);
    }
  }

  handleBlur = e => {
    e.preventDefault();
    // const val = e.currentTarget.value;

    // this.setState({showInput: false});
    if (this.state.value !== this.state.initialValue) {
      api.attempt.create({
        assignmentId: this.props.column.assignmentId,
        personId: this.props.row.student.personId,
        score: this.getValue()
      });
    }
  };

  render() {
    return this.props.column.editMode ? (
      <div className="grade-input" onBlur={this.handleBlur}>
        <input
          type="text"
          className="form-control"
          placeholder="score"
          value={this.getValue()}
          onChange={this.changeValue}
        />
        <span className="input-group-addon">/ {this.props.column.maxScore}</span>
      </div>
    ) : (
      <div>{this.getValue()}</div>
    );
  }
}

class GradeAverage extends React.Component {
  calcIbGrade = x => {
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
  };

  calcUsLetterGrade = x => {
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
  };

  // I need all weights for a class which must total up to 100%
  // Ex
  // 20%
  // 40%
  // 10%
  // 30%
  calcGrade = () => {
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
    return 0;
  };

  render() {
    const body =
      this.calcGrade() + " | " + this.calcIbGrade(this.calcGrade()) + " | " + this.calcUsLetterGrade(this.calcGrade());
    return <div>{body}</div>;
  }
}

function loadData(props) {
  props.loadAssignments();
  props.loadGradebook(props.match.params.resourceID, props.match.params.termId);
}

class ClassDetail extends React.Component {
  static propTypes = {
    assignments: PropTypes.object.isRequired,
    attempts: PropTypes.array.isRequired
  };

  state = {
    students: [],
    attempts: [],
    assignments: [],
    assignmentGroups: [],
    editColumn: null
  };

  // getGrades(){
  //   const params = this.props.match.params;
  //   api.attempt.find({
  //     courseId: params.resourceID,
  //     termId: params.termId
  //   })
  //   .then(xs => this.setState({attempts: xs}));
  // },
  getStudents = () => {
    const params = this.props.match.params;
    api.enrollment
      .find({
        courseId: params.resourceID,
        termId: params.termId
      })
      .then(xs => this.setState({ students: xs }));
  };

  getAssignments = () => {
    const params = this.props.match.params;
    api.assignment
      .find({
        courseId: params.resourceID,
        termId: params.termId
      })
      .then(xs => this.setState({ assignments: xs }));
  };

  getAssignmentGroups = () => {
    const params = this.props.match.params;
    api.group
      .find({
        courseId: params.resourceID,
        termId: params.termId
      })
      .then(xs => this.setState({ assignmentGroups: xs }));
  };

  buildCols = () => {
    let cols = [
      {
        key: "student.person.displayName",
        display: "Student"
      }
    ];

    for (let x of this.state.assignments) {
      cols.push({
        key: `assignments.${x.assignmentId}.grade.score`,
        editMode: true,
        renderer: GradeInput,
        assignmentId: x.assignmentId,
        maxScore: x.maxScore,
        display: x.name
      });
    }

    cols.push({
      display: "Avg - IB - US",
      tdClassName: "success",
      renderer: GradeAverage
    });

    return cols;
  };

  buildData = () => {
    let results = [];
    for (let s of this.state.students) {
      let result = {
        student: s,
        assignments: {}
      };
      for (let a of this.state.assignments) {
        let grade = this.props.attempts
          .filter(x => x.assignmentId === a.assignmentId)
          .find(x => x.personId === s.personId);
        result.assignments[a.assignmentId] = {
          grade: grade,
          assignment: a
        };
      }
      results.push(result);
    }
    return results;
  };

  UNSAFE_componentWillMount() {
    loadData(this.props);
    this.getAssignments();
    this.getStudents();
  }

  render() {
    return <Grid attached columns={this.buildCols()} data={this.buildData()} />;
  }
}

export default connect(
  state => ({
    assignments: state.entities.assignments,
    attempts: state.gradebook.grades || []
  }),
  { loadAssignments, loadGradebook }
)(ClassDetail);
