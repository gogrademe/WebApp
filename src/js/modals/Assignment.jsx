import React from 'react';

import api from '../api/api';
import utils from '../utils';

import ModalForm from '../molecules/ModalForm';
import {AssignmentGroup} from '../molecules/AutoCompleteFor';
import {Input} from 'formsy-react-components';
// import {DateTimePicker} from 'react-widgets';

export default React.createClass({
  propTypes: {
    courseID: React.PropTypes.number.isRequired,
    termID: React.PropTypes.number.isRequired,
    assignmentID: React.PropTypes.number
  },
  getInitialState() {
    return {
      assignment: {}
    };
  },
  onSubmit(model) {
    model.courseID = Number(this.props.courseID);
    model.termID = Number(this.props.termID);
    model.groupID = Number(model.groupID);
    model.dueDate = utils.forUpload(model.dueDate);
    model.maxScore = Number(model.maxScore);

    return api.assignment.create(model);
  },
  componentWillMount() {
    if (this.props.assignmentID) {
      api.assignment
        .get(this.props.assignmentID)
        .then(res => this.setState({assignment: res}));
    }
  },
  render() {
    const assignment = this.state.assignment;
    return (
      <ModalForm {... this.props} title="Assignment" onSubmitAsync={this.onSubmit}>
        <Input name="name" value={assignment.name} label="Name" />
        <AssignmentGroup name="groupID" value={assignment.groupID} courseID={this.props.courseID} termID={this.props.termID} label="Type"/>
        <Input name="dueDate" value={assignment.dueDate} validation="isDate" label="Due Date" />
        <Input name="maxScore" value={assignment.maxScore} validations="isNumeric" validationError="must be a number" label="Out Of" />
      </ModalForm>
    );
  }
});

// <Input  value={assignment.dueDate} validation="isDate" label="Due Date" />
