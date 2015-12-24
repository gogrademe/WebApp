import React from 'react';

import api from '../api/api';
import utils from '../utils';

import ModalForm from '../molecules/ModalForm';
import {AssignmentGroup} from '../molecules/AutoCompleteFor';
import {Input} from 'formsy-react-components';
import {DateTimePicker} from 'react-widgets';

export default React.createClass({
  propTypes: {
    course_id: React.PropTypes.number.isRequired,
    term_id: React.PropTypes.number.isRequired,
    assignment_id: React.PropTypes.number
  },
  getInitialState() {
    return {
      assignment: {
        group:{}
      }
    };
  },
  onSubmit(model) {
    model.course_id = Number(this.props.course_id);
    model.term_id = Number(this.props.term_id);
    model.group_id = Number(model.group_id);
    model.due_date = utils.forUpload(model.due_date);
    model.max_score = Number(model.max_score);

    // return api.assignment.create(model);
    if (this.props.assignment_id) {
      model.assignment_id = this.props.assignment_id;
      return api.assignment.update(model.assignment_id, model);
    } else {
      return api.assignment.create(model);
    }
  },
  componentWillMount() {
    if (this.props.assignment_id) {
      api.assignment
        .get(this.props.assignment_id)
        .then(res => this.setState({assignment: res}));
    }
  },
  render() {
    const assignment = this.state.assignment;
    return (
      <ModalForm {... this.props} title="Assignment" onSubmitAsync={this.onSubmit}>
        <Input name="name" value={assignment.name} label="Name" />
        <AssignmentGroup name="group_id" label="Type"
          value={assignment.group_id}
          course_id={this.props.course_id}
          term_id={this.props.term_id} />
        <Input name="due_date" value={assignment.due_date} validation="isDate" label="Due Date" />
        <Input name="max_score" value={assignment.max_score} validations="isNumeric" validationError="must be a number" label="Out Of" />
      </ModalForm>
    );
  }
});
