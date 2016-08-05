import React from 'react';

import api from '../api/api';

import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';
import {GradeLevel} from '../molecules/AutoCompleteFor';
// import {AssignmentGroup} from '../molecules/AutoCompleteFor';

import reformed from 'react-reformed'

const MyForm = ({ bindInput }) => {
  return (
    <form>
    <input type='text' {...bindInput('name')} />
    <input type='date' {...bindInput('dob')} />
    <textarea {...bindInput('bio')} />
    <button type='submit'>Submit</button>
  </form>
)
}

const MyFormContainer = reformed()(MyForm)


export default React.createClass({
  propTypes: {
    course_id: React.PropTypes.number
  },
  getInitialState() {
    return {
      course: {}
    };
  },
  onSubmit(model) {
    return api.course.create(model);
  },
  componentWillMount() {
    if (this.props.course_id) {
      api.course
        .get(this.props.course_id)
        .then(res => this.setState({course: res}));
    }
  },
  render() {
    const {course} = this.state;
    return (
      <ModalForm {... this.props} title="Course" onSubmitAsync={this.onSubmit}>
        <LabeledField name="name" label="Name" value={course.name} />
        <div className="field">
          <label>Grade Level</label>
          <GradeLevel name="level_id" value={course.level_id}
          selection
          fluid
          search/>
        </div>
      </ModalForm>

    );
  }
});
