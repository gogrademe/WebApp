
/** @flow */

import React from 'react';

import api from '../api/api';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';

import AutocompleteFor from '../molecules/AutoCompleteFor.jsx';

export default React.createClass({
  onSubmit(model) {
    return api.person.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="Person" onSubmitAsync={this.onSubmit}>
        <div>
          <div className="form-group">
            <label>
              Name
            </label>
            <div className="row">
              <LabeledField name="firstName" placeholder="First Name" size="col-xs-4"/>
              <LabeledField name="middleName" placeholder="Middle Name" required={false} size="col-xs-4"/>
              <LabeledField name="lastName" placeholder="Last Name" size="col-xs-4"/>
            </div>
          </div>
          <LabeledField label="Email" name="email" required={false}/>
          <AutocompleteFor.ProfileTypes name="types" placeholder="First Name"/>

        </div>
      </ModalForm>
    );
  }
});
// <AutocompleteFor.ProfileTypes name="types"/>


//   render-student-section: ->
//     #if @state.data.types.index-of('Student') > -1 then
//     if 'Student' in @state.data.types then
//       div class-name: "field",
//         h4 class-name: "ui dividing header",
//           "Student Info"
//         div class-name: "field",
//           label null, "Grade Level"
//           @updatable-for AutocompleteFor.GradeLevel, "gradeLevel", null
//
//   render: ->
//     @transfer-props-to do
//       Modal.SemanticModal title: "Create Person",
//         div class-name: "content",
//           form class-name: "ui form",
//             h4 class-name: "ui dividing header",
//               "Personal Info"
//             div class-name: "field",
//               label null,
//                 "Name"
//               div class-name: "three fields",
//                 @input-for 'firstName' placeholder: 'First'
//                 @input-for 'middleName' placeholder: 'Middle'
//                 @input-for 'lastName' placeholder: 'Last'
//             @input-for 'email' label: 'Email' type: 'email'
//             div class-name: "field",
//               label null, "Type"
//               @updatable-for AutocompleteFor.ProfileTypes, "types", null
//             @render-student-section!
//             @actions on-submit: @handle-submit, on-cancel: @props.on-request-hide
//               #FormFor.Input label: "Grade Level" obj-id: "student.gradeLevel"
//
// module.exports = PersonModal
