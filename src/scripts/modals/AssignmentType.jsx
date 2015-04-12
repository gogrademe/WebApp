

/* @flow */

import React from 'react';

import api from '../api/api.ls';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';

export default React.createClass({
  onSubmit(model: Object) {
    model.weight = Number(model.weight / 100);
    model.classId = this.props.classId;

    return api.type.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="Assignment Type" onSubmitAsync={this.onSubmit}>
        <LabeledField label="Name" name="name" placeholder="Name"/>
        <LabeledField label="Weight" name="weight" validationError="must be between .5% and 100%" validations="isWeight"/>
      </ModalForm>
    );
  }
});
