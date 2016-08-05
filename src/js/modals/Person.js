
import React from 'react';

import api from '../api/api';

import AutocompleteFor from '../molecules/AutoCompleteFor';
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';

export default React.createClass({
  onSubmit(model) {
    return api.person.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="Person" onSubmitAsync={this.onSubmit}>
        <div className="field">
          <label>Name</label>
          <div className="three fields required">
            <LabeledField name="first_name" placeholder="First" required/>
            <LabeledField name="middle_name" placeholder="Middle" />
            <LabeledField name="last_name" placeholder="Last" required/>
          </div>
        </div>
        <LabeledField name="email" label="Email"/>
        <AutocompleteFor.ProfileTypes label="Types" name="types" required/>
      </ModalForm>
    );
  }
});
