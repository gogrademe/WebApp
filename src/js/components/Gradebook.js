import PropTypes from "prop-types";
import React from "react";
import { Grid } from "./NewTable";
import api from "../api/api";
import { loadAssignments } from "../redux/modules/assignment";
import { loadGradebook } from "../redux/modules/gradebook";
import { connect } from "react-redux";

const GradeDisplay = ({}) => <input />;
const GradeLine = ({}) => <div />;

class GradeInput extends React.Component {
  state = {
    value: this.props.value,
    initialValue: this.props.value
  };

  changeValue = event => {
    this.setValue(event.currentTarget.value);
  };

  getValue = () => {
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
  render() {
    const body =
      this.calcGrade() + " | " + this.calcIbGrade(this.calcGrade()) + " | " + this.calcUsLetterGrade(this.calcGrade());
    return <div>{body}</div>;
  }
}

function loadData(props) {
  props.loadAssignments();
  props.loadGradebook(props.params.resourceID, props.params.termId);
}

class ClassDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.func
  };

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

  render() {
    return (
      <div>
        <Grid columns={this.buildCols()} data={this.buildData()} />
      </div>
    );
  }
}
