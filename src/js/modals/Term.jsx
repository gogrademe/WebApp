import React from 'react';

import api from '../api/api';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';


export default React.createClass({
  onSubmit(model) {
    model.schoolYear = Number(model.schoolYear);
    return api.term.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="School Year" onSubmitAsync={this.onSubmit}>
        <LabeledField label="Name" name="name" required placeholder="Term 1" />
        <LabeledField label="School Year" name="schoolYear" validations="isNumeric" placeholder="End" />
      </ModalForm>
    );
  }
});
