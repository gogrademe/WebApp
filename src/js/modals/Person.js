
import React from 'react';

import api from '../api/api';

import AutocompleteFor from '../molecules/AutoCompleteFor';
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';
import {Input} from 'formsy-react-components';

export default React.createClass({
  onSubmit(model) {
    return api.person.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="Person" onSubmitAsync={this.onSubmit}>
        <Input name="first_name" label="First Name" required/>
        <Input name="middle_name" label="Middle Name"/>
        <Input name="last_name" label="Last Name" required/>
        <Input name="email" label="Email"/>
        <AutocompleteFor.ProfileTypes label="Types" name="types" required/>
      </ModalForm>
    );
  }
});
