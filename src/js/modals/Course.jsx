import React from 'react';

import api from '../api/api';

import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';
// import {AssignmentGroup} from '../molecules/AutoCompleteFor';

export default React.createClass({
  propTypes: {
    courseID: React.PropTypes.number,
    termID: React.PropTypes.number.isRequired,
    assignmentID: React.PropTypes.number
  },
  getInitialState() {
    return {
      assignment: {}
    };
  },
  onSubmit(model) {
    // model.courseID = Number(this.props.courseID);
    // model.termID = Number(this.props.termID);
    // model.dueDate = utils.forUpload(model.dueDate);
    // model.maxScore = Number(model.maxScore);

    return api.course.create(model);
  },
  componentWillMount() {
    // if (this.props.assignmentID) {
    //   api.assignment
    //     .get(this.props.assignmentID)
    //     .then(res => this.setState({assignment: res}));
    // }
  },
  render() {
    return (
      <ModalForm {... this.props} title="Course" onSubmitAsync={this.onSubmit}>
        <LabeledField name="name" label="Name"/>
        <LabeledField name="levelID" label="Grade Level"/>
      </ModalForm>

    );
  }
});
