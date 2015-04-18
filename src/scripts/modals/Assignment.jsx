
/** @flow */

import React from 'react';

import api from '../api/api';
import utils from '../utils';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';

import {AssignmentType} from '../molecules/AutoCompleteFor';

export default React.createClass({
  propTypes: {
    classId: React.PropTypes.string.isRequired,
    termId: React.PropTypes.string.isRequired
  },
  onSubmit(model) {
    model.classId = this.props.classId;
    model.termId = this.props.termId;
    model.dueDate = utils.forUpload(model.dueDate);
    model.maxScore = Number(model.maxScore);
    return api.assignment.create(model);
  },
  render() {
    return (
      <ModalForm {... this.props} title="Assignment" onSubmitAsync={this.onSubmit}>
        <LabeledField name="name" label="Name"/>
        <div className="field">
          <div className="ui two fields">
            <AssignmentType name="typeId" label="Type"/>
            <LabeledField name="dueDate" validation="isDate" label="Due Date"/>
          </div>
        </div>
        <LabeledField name="maxScore" validations="isNumeric" validationError="must be a number" label="Out Of"/>
      </ModalForm>

    );
  }
});
