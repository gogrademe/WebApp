import React, {PropTypes} from 'react';

import api from '../api/api';
import utils from '../utils';

import ModalForm from '../molecules/ModalForm';
import {AssignmentGroup} from '../molecules/AutoCompleteFor';
// import {Input} from 'formsy-react-components';
import {DateTimePicker} from 'react-widgets';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react'

// export default React.createClass({
//   propTypes: {
//     course_id: PropTypes.number.isRequired,
//     term_id: PropTypes.number.isRequired,
//     assignment_id: PropTypes.number
//   },
//   getInitialState() {
//     return {
//       assignment: {
//         group:{}
//       }
//     };
//   },
//   onSubmit(model) {
//     model.course_id = Number(this.props.course_id);
//     model.term_id = Number(this.props.term_id);
//     model.group_id = Number(model.group_id);
//     model.due_date = utils.forUpload(model.due_date);
//     model.max_score = Number(model.max_score);
//
//     // return api.assignment.create(model);
//     if (this.props.assignment_id) {
//       model.assignment_id = this.props.assignment_id;
//       return api.assignment.update(model.assignment_id, model);
//     } else {
//       return api.assignment.create(model);
//     }
//   },
//   componentWillMount() {
//     if (this.props.assignment_id) {
//       api.assignment
//         .get(this.props.assignment_id)
//         .then(res => this.setState({assignment: res}));
//     }
//   },
//   render() {
//     const assignment = this.state.assignment;
//     return (
//       <ModalForm {... this.props} title="Assignment" onSubmitAsync={this.onSubmit}>
//         <Field name="name" component="input" type="text" />
//         <div className="field">
//           <label>
//             Types
//           </label>
//           <AssignmentGroup name="group_id" label="Type"
//             value={assignment.group_id}
//             course_id={this.props.course_id}
//             term_id={this.props.term_id} />
//         </div>
//         <Field name="due_date" component="input" type="text" value={assignment.due_date} validation="isDate" label="Due Date" />
//         <Field name="max_score" component="input" type="text" value={assignment.max_score} validations="isNumeric" validationError="must be a number" label="Out Of" />
//       </ModalForm>
//     );
//   }
// });

let AssignmentModal = ({handleSubmit, ...rest}) => (
  <ModalForm title="Assignment" onSubmit={handleSubmit} {...rest}>
    <Form.Input label='Name' name='name' placeholder='Name' />
    <div className="field">
      <label>
        Types
      </label>
      {/* <Field name="group_id" component={AssignmentGroup} type="text" /> */}
      {/* <AssignmentGroup name="group_id" label="Type"
        course_id={this.props.course_id}
        term_id={this.props.term_id} /> */}
    </div>
    <Form.Group widths='2'>
      <Form.Input label='Due Date' name='due_date' placeholder='Date' />
      <Form.Input label='Max Score' name='max_score' placeholder='100' />
    </Form.Group>
  </ModalForm>
);
export default AssignmentModal
// = reduxForm({
//   form: 'assignment' // a unique name for this form
// })(AssignmentModal);
