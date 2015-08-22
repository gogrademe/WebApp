import React from 'react';

import api from '../api/api';

import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';
// import {AssignmentGroup} from '../molecules/AutoCompleteFor';

export default React.createClass({
  propTypes: {
    course_id: React.PropTypes.number,
    term_id: React.PropTypes.number.isRequired,
    assignment_id: React.PropTypes.number
  },
  getInitialState() {
    return {
      assignment: {}
    };
  },
  onSubmit(model) {
    // model.course_id = Number(this.props.course_id);
    // model.term_id = Number(this.props.term_id);
    // model.due_date = utils.forUpload(model.due_date);
    // model.max_score = Number(model.max_score);

    return api.course.create(model);
  },
  componentWillMount() {
    // if (this.props.assignment_id) {
    //   api.assignment
    //     .get(this.props.assignment_id)
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
