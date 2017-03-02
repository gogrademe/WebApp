/* @flow weak */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import api from '../api/api';

import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';
import {GradeLevel} from '../molecules/AutoCompleteFor';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react'
// class CourseModal extends React.Component {
//   handleSubmit(data) {
//     return api.course.create(data);
//   }
//   render() {
//     return (
//       <ModalForm {... this.props} title="Course" onSubmit={this.props.handleSubmit}>
//         <div className="field">
//           <label>Name</label>
//           <Field name="name" component="input" type="text"/>
//         </div>
//         <div className="field">
//           <label>Grade Level</label>
//           <Field name="level_id" component={GradeLevel} selection fluid search />
//         </div>
//       </ModalForm>
//     )
//   }
// }
const handleSubmit = (data) => {
    data.level_id = Number(data.gradeLevel);
    return api.course.create(data);
  }
const CourseModal = ({ ...rest}) => (
  <ModalForm title="Course" onSubmitAsync={handleSubmit} {...rest} resource='course'>
    <Form.Input label='Name' name='name' placeholder='Name' />
    <GradeLevel label='Grade Level' name='gradeLevel' selection fluid search />
    {/* <div className="field">
      <label>Grade Level</label>
      <Field name="level_id" component={GradeLevel} selection fluid search />
    </div> */}
  </ModalForm>
);
export default CourseModal


// export default React.createClass({
//   propTypes: {
//     course_id: React.PropTypes.number
//   },
//   getInitialState() {
//     return {
//       course: {}
//     };
//   },
//   onSubmit(model) {
//     return api.course.create(model);
//   },
//   componentWillMount() {
//     if (this.props.course_id) {
//       api.course
//         .get(this.props.course_id)
//         .then(res => this.setState({course: res}));
//     }
//   },
//   render() {
//     const {course} = this.state;
//     return (
//       <ModalForm {... this.props} title="Course" onSubmitAsync={this.onSubmit}>
//         <LabeledField name="name" label="Name" value={course.name} />
//         <div className="field">
//           <label>Grade Level</label>
//           <GradeLevel name="level_id" value={course.level_id}
//             selection fluid search/>
//         </div>
//       </ModalForm>
//
//     );
//   }
// });
