import React from 'react';
import Header from '../../components/PageHeader';
import {State} from 'react-router';

import Form from '../../molecules/Form';
import LabeledField from '../../molecules/LabeledField';

import api from '../../api/api';

import AssignmentTypes from '../setup/AssignmentTypes';


export default React.createClass({
  mixins: [State],
  render() {
    return (
      <div>
        <Form className="ui form" title="Assignment Type" onSubmitAsync={this.onSubmit}>
          <LabeledField label="Name" name="name" placeholder="Name"/>
          <LabeledField label="Weight" name="weight" validationError="must be between .5% and 100%" validations="isWeight"/>
        </Form>
      </div>
    );
  }
});
