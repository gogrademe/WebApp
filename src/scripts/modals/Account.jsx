
/** @flow */

import React from 'react';

import api from '../api/api.ls';

//Molecules
import ModalForm from '../molecules/ModalForm';
import LabeledField from '../molecules/LabeledField';

export default React.createClass({
  propTypes: {
    personId: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      person: {}
    };
  },
  onSubmit(model) {
    return api.user.create(model);
  },
  fetchPerson() {
    api.person.get(this.props.personId)
      .then((person)=>{
        this.setState({person: person});
      });
  },
  componentWillMount() {
    this.fetchPerson();
  },
  render() {
    let {firstName, lastName, email} = this.state.person;
    return (
      <ModalForm {... this.props} title="User Account" onSubmitAsync={this.onSubmit}>
        <div className="field">
          <label>
            Name
          </label>
          <span>
            {firstName} {lastName}
          </span>
        </div>
        <LabeledField name="email" label="Email" value={email}/>
      </ModalForm>

    );
  }
});
