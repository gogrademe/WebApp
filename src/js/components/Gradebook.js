
import React from 'react';
import {Grid} from './NewTable';
import api from '../api/api';
import { loadAssignments } from '../redux/modules/assignment';
import { loadGradebook } from '../redux/modules/gradebook';
import { connect } from 'react-redux';


const GradeDisplay = ({}) => (
  <input />
);
const GradeLine = ({}) => (
  <div>

  </div>
);
let GradeInput = React.createClass({
    getInitialState() {
      return {
        value: this.props.value,
        initialValue: this.props.value
      };
    },
    changeValue(event) {
      this.setValue(event.currentTarget.value);
    },
    getValue() {
      return this.state.value;
    },
    setValue(value) {
      this.setState({value: value});
    },
    componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value) {
        this.setValue(this.props.value);
      }
    },
    handleBlur(e) {
      e.preventDefault();
      if (this.state.value !== this.state.initialValue) {
        api.attempt.create({
          assignment_id: this.props.column.assignment_id,
          person_id: this.props.row.student.person_id,
          score: this.getValue()
        });
      }

    },
    render() {
      return this.props.column.editMode ? (
        <div className="grade-input" onBlur={this.handleBlur} >
          <input
            type="text"
            className="form-control"
            placeholder="score"
            value={this.getValue()}
            onChange={this.changeValue} />
          <span className="input-group-addon">/ {this.props.column.max_score}</span>
        </div>
      ) : (<div>{this.getValue()}</div>);
    }
  });

let GradeAverage = React.createClass({
  render(){
    const body = this.calcGrade() + ' | ' + this.calcIbGrade(this.calcGrade()) + ' | ' + this.calcUsLetterGrade(this.calcGrade());
    return (
      <div>
        {body}
      </div>
    );
  }
});

function loadData(props) {
  props.loadAssignments();
  props.loadGradebook(props.params.resourceID,props.params.term_id);
}

const ClassDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    assignments: React.PropTypes.object.isRequired,
    attempts: React.PropTypes.array.isRequired,
  },
  getInitialState(){
    return {
      students: [],
      attempts: [],
      assignments: [],
      assignmentGroups: [],
      editColumn: null
    };
  },
  getStudents(){
    const params = this.props.params;
    api.enrollment.find({
      course_id: params.resourceID,
      term_id: params.term_id
    })
    .then(xs => this.setState({students: xs}));
  },
  getAssignments(){
    const params = this.props.params;
    api.assignment.find({
      course_id: params.resourceID,
      term_id: params.term_id
    })
    .then(xs => this.setState({assignments: xs}));
  },
  getAssignmentGroups(){
    const params = this.props.params;
    api.group.find({
      course_id: params.resourceID,
      term_id: params.term_id
    })
    .then(xs => this.setState({assignmentGroups: xs}));
  },
  buildCols(){
    let cols = [{
      key: 'student.person.display_name',
      display: 'Student'
    }];

    for (let x of this.state.assignments) {
      cols.push({
        key: `assignments.${x.assignment_id}.grade.score`,
        editMode: true,
        renderer: GradeInput,
        assignment_id: x.assignment_id,
        max_score: x.max_score,
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
  render(){
    return (
      <div>
        <Grid columns={this.buildCols()} data={this.buildData()} />
      </div>
    );
  }
});
